// SelfMessage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SelfMessage() {
    const [userInfo, setUserInfo] = useState(null);
    const [activeList, setActiveList] = useState("");
    const [blindBoxMap, setBlindBoxMap] = useState({});
    const [creatorUsernameMap, setCreatorUsernameMap] = useState({});
    const [expandedDetails, setExpandedDetails] = useState({});
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showCreateBoxForm, setShowCreateBoxForm] = useState(false);
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [newBox, setNewBox] = useState({
        blindBoxName: "",
        description: "",
        price: "",
        lastQuantity: "",
        winQuantity: "",
        maxWinQuantity: "",
    });
    const navigate = useNavigate();

    // 获取用户信息、盲盒详情和创建者用户名
    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUserInfo(null);
                return;
            }

            const res = await axios.get("/api/accounts", { headers: { token } });
            if (res.data && res.data.code === "200") {
                const data = res.data.data;
                setUserInfo(data);

                // 收集所有盲盒 id
                const allIds = Array.from(new Set([
                    ...(data.createdBlindBoxId || []),
                    ...(data.ownBlindBoxId || []),
                    ...(data.blindBoxIdOrder || []),
                ]));

                // 并行请求所有盲盒详情
                const boxResponses = await Promise.all(
                    allIds.map((id) =>
                        axios
                            .get("/api/blindBox/detail", { params: { blindBoxId: id } })
                            .then(r => ({ id, box: r.data && r.data.code === "200" ? r.data.data : null }))
                            .catch(() => ({ id, box: null }))
                    )
                );
                const boxMap = {};
                boxResponses.forEach(({ id, box }) => {
                    boxMap[id] = box;
                });

                // 获取所有创建者 id 并并行请求用户名
                const creatorIds = Array.from(new Set(
                    Object.values(boxMap)
                        .filter(b => b && b.createUserId !== undefined && b.createUserId !== null)
                        .map(b => b.createUserId)
                ));
                const creatorMap = {};
                await Promise.all(
                    creatorIds.map((cid) =>
                        axios
                            .get(`/api/accounts/${cid}`)
                            .then(r => {
                                if (r.data && r.data.code === "200") {
                                    creatorMap[cid] = r.data.data.username;
                                } else {
                                    creatorMap[cid] = "未知用户";
                                }
                            })
                            .catch(() => {
                                creatorMap[cid] = "未知用户";
                            })
                    )
                );

                setBlindBoxMap(boxMap);
                setCreatorUsernameMap(creatorMap);
            } else {
                setUserInfo(null);
            }
        } catch (error) {
            console.error("获取用户信息或盲盒详情失败：", error);
            setUserInfo(null);
        }
    };

    // 在组件挂载时获取用户信息
    useEffect(() => {
        fetchUserInfo();
    }, []);

    const toggleDetail = (key) => {
        setExpandedDetails(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderBlindBoxList = (ids = []) => {
        if (!ids || ids.length === 0) return <li>暂无数据</li>;
        return ids.map((id, index) => {
            const box = blindBoxMap[id];
            const uniqueKey = `${id}-${index}`;
            return (
                <li key={uniqueKey} className="mb-4 border-b pb-2">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">{box ? box.blindBoxName : `加载中 (${id})`}</span>
                        <button
                            onClick={() => toggleDetail(uniqueKey)}
                            className="text-blue-600 hover:underline"
                        >
                            {expandedDetails[uniqueKey] ? "收起详情" : "查看盲盒详情"}
                        </button>
                    </div>
                    {expandedDetails[uniqueKey] && box && (
                        <div className="mt-2 text-sm bg-gray-100 p-3 rounded">
                            <p><strong>盲盒名称：</strong>{box.blindBoxName}</p>
                            <p><strong>创建者：</strong>{creatorUsernameMap[box.createUserId] || "加载中..."}</p>
                            <p><strong>描述：</strong>{box.description}</p>
                            <p><strong>价格：</strong>{box.price} 元</p>
                            <p><strong>剩余数量：</strong>{box.lastQuantity}</p>
                            <p><strong>剩余中奖数量：</strong>{box.winQuantity}</p>
                        </div>
                    )}
                </li>
            );
        });
    };

    const renderOrderList = () => {
        const ids = userInfo?.blindBoxIdOrder ?? [];
        const results = userInfo?.blindBoxOrderResult ?? [];
        if (!ids || ids.length === 0) return <li>暂无订单</li>;
        return ids.map((id, index) => {
            const box = blindBoxMap[id];
            const result = results[index] || "未知结果";
            return (
                <li key={`${id}-${index}`} className="mb-4 border-b pb-2">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">{box ? box.blindBoxName : `加载中 (${id})`}</span>
                        <span className="text-gray-700">抽奖结果：{result}</span>
                    </div>
                </li>
            );
        });
    };

    const handlePasswordUpdate = async () => {
        const { newPassword, confirmPassword } = passwords;
        if (!newPassword || !confirmPassword) return alert("密码不能为空");
        if (/\s/.test(newPassword) || /\s/.test(confirmPassword)) return alert("密码不能有空格");
        if (newPassword !== confirmPassword) return alert("两次密码不一致");
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                "/api/accounts",
                { username: userInfo?.username, password: newPassword },
                { headers: { token } }
            );
            if (res.data && res.data.code === "200") {
                alert("密码修改成功，请重新登录");
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                alert("修改失败：" + (res.data?.msg || "未知错误"));
            }
        } catch (error) {
            console.error("修改密码出错", error);
            alert("请求错误");
        }
    };

    const handleCreateBlindBox = async () => {
        // 验证表单
        const fieldNames = {
            blindBoxName: "盲盒名称",
            description: "盲盒描述",
            price: "价格",
            lastQuantity: "总数量",
            winQuantity: "中奖数量",
            maxWinQuantity: "最多中奖次数",
        };
        const required = ["blindBoxName", "description", "price", "lastQuantity", "winQuantity", "maxWinQuantity"];
        for (let f of required) {
            const v = newBox[f];
            if (!v || (typeof v === "string" && v.trim() === "")) {
                alert(`${fieldNames[f]}不能为空`);
                return;
            }
            if (/\s/.test(String(v))) {
                alert(`${fieldNames[f]}不能包含空格`);
                return;
            }
        }

        // 数字字段校验
        const intFields = ["price", "lastQuantity", "winQuantity", "maxWinQuantity"];
        for (let f of intFields) {
            const n = Number(newBox[f]);
            if (!Number.isInteger(n) || n <= 0) {
                alert(`${fieldNames[f]}必须为正整数`);
                return;
            }
        }
        if (Number(newBox.winQuantity) > Number(newBox.lastQuantity)) {
            alert("中奖数量不能超过盲盒总数量");
            return;
        }
        if (Number(newBox.maxWinQuantity) > Number(newBox.lastQuantity)) {
            alert("最多中奖次数不能超过盲盒总数量");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!userInfo || !userInfo.id) {
                alert("用户信息缺失或未登录，请先登录");
                navigate("/login");
                return;
            }

            const res = await axios.post(
                "/api/blindBox",
                newBox,
                { params: { userId: userInfo.id }, headers: { token } }
            );

            if (res.data && res.data.code === "200") {
                alert("创建成功！");
                // 关闭表单
                setShowCreateBoxForm(false);
                // 重置表单
                setNewBox({
                    blindBoxName: "",
                    description: "",
                    price: "",
                    lastQuantity: "",
                    winQuantity: "",
                    maxWinQuantity: "",
                });
                // 👇 关键修改：重新获取用户信息，保持数据同步
                await fetchUserInfo();
            } else {
                alert("创建失败：" + (res.data?.msg || "未知错误"));
            }
        } catch (error) {
            console.error("创建盲盒失败：", error);
            alert("请求失败，请稍后重试");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 px-6">
            <h1 className="text-3xl font-bold mb-6 text-white">个人中心</h1>
            <div className="space-y-4">
                <div className="bg-white shadow p-4 rounded">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-semibold">
                            用户名：{userInfo?.username ?? ""}
                        </p>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                {showPasswordForm ? "取消修改密码" : "修改密码"}
                            </button>
                            <button
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                onClick={() => setShowCreateBoxForm(true)}
                            >
                                创建盲盒
                            </button>
                        </div>
                    </div>
                    {showPasswordForm && (
                        <div className="mt-4 space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">新密码：</label>
                                <input
                                    type="password"
                                    value={passwords.newPassword}
                                    onChange={(e) =>
                                        setPasswords({ ...passwords, newPassword: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">确认新密码：</label>
                                <input
                                    type="password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) =>
                                        setPasswords({ ...passwords, confirmPassword: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <button
                                onClick={handlePasswordUpdate}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                确认修改
                            </button>
                        </div>
                    )}
                </div>

                {showCreateBoxForm && (
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-lg font-semibold mb-2">创建盲盒</h2>
                        <div className="space-y-2">
                            {[
                                ["blindBoxName", "盲盒名称"],
                                ["description", "盲盒描述"],
                                ["price", "盲盒价格"],
                                ["lastQuantity", "盲盒总数量"],
                                ["winQuantity", "盲盒中奖数量"],
                                ["maxWinQuantity", "最多抽多少次可以中奖（保底）"]
                            ].map(([field, label]) => (
                                <div key={field}>
                                    <label className="block text-sm mb-1">{label}：</label>
                                    <input
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        value={newBox[field]}
                                        onChange={(e) => setNewBox({ ...newBox, [field]: e.target.value })}
                                        placeholder={`请输入 ${label}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={handleCreateBlindBox}
                            >
                                提交
                            </button>
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setShowCreateBoxForm(false)}
                            >
                                取消
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex space-x-4">
                    <button
                        className={`px-4 py-2 rounded ${activeList === "created" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        onClick={() => setActiveList(activeList === "created" ? "" : "created")}
                    >
                        我创建的盲盒
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeList === "owned" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        onClick={() => setActiveList(activeList === "owned" ? "" : "owned")}
                    >
                        我抽到的盲盒
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeList === "orders" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        onClick={() => setActiveList(activeList === "orders" ? "" : "orders")}
                    >
                        我的盲盒订单
                    </button>
                </div>

                {activeList === "created" && (
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-lg font-semibold mb-2">我创建的盲盒：</h2>
                        <ul className="list-disc list-inside">{renderBlindBoxList(userInfo?.createdBlindBoxId ?? [])}</ul>
                    </div>
                )}
                {activeList === "owned" && (
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-lg font-semibold mb-2">我抽到的盲盒：</h2>
                        <ul className="list-disc list-inside">{renderBlindBoxList(userInfo?.ownBlindBoxId ?? [])}</ul>
                    </div>
                )}
                {activeList === "orders" && (
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-lg font-semibold mb-2">我的盲盒订单：</h2>
                        <ul className="list-disc list-inside">{renderOrderList()}</ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelfMessage;