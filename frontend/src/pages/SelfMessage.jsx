import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SelfMessage() {
    const [userInfo, setUserInfo] = useState(null);
    const [activeList, setActiveList] = useState("");
    const [loading, setLoading] = useState(true);
    const [blindBoxMap, setBlindBoxMap] = useState({});
    const [expandedDetails, setExpandedDetails] = useState({});
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/api/accounts", {
                    headers: { token },
                });

                if (response.data.code === "200") {
                    const data = response.data.data;
                    setUserInfo(data);
                    const allIds = [
                        ...data.createdBlindBoxId,
                        ...data.ownBlindBoxId,
                        ...data.participateBlindBoxId,
                    ];
                    const uniqueIds = Array.from(new Set(allIds));
                    const boxDetails = {};
                    for (let id of uniqueIds) {
                        try {
                            const res = await axios.get("/api/blindBox/detail", {
                                params: { blindBoxId: id },
                            });
                            if (res.data.code === "200") {
                                boxDetails[id] = res.data.data;
                            } else {
                                boxDetails[id] = null;
                            }
                        } catch {
                            boxDetails[id] = null;
                        }
                    }
                    setBlindBoxMap(boxDetails);
                } else {
                    console.error("获取用户信息失败", response.data.msg);
                }
            } catch (error) {
                console.error("请求错误", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const toggleDetail = (id) => {
        setExpandedDetails((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const renderBlindBoxList = (ids) => {
        if (ids.length === 0) return <li>暂无数据</li>;
        return ids.map((id) => {
            const box = blindBoxMap[id];
            return (
                <li key={id} className="mb-4 border-b pb-2">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">{box ? box.blindBoxName : `加载中 (${id})`}</span>
                        <button
                            onClick={() => toggleDetail(id)}
                            className="text-blue-600 hover:underline"
                        >
                            {expandedDetails[id] ? "收起详情" : "查看盲盒详情"}
                        </button>
                    </div>
                    {expandedDetails[id] && box && (
                        <div className="mt-2 text-sm bg-gray-100 p-3 rounded">
                            <p><strong>名称：</strong>{box.blindBoxName}</p>
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

    const handlePasswordUpdate = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("新密码和确认密码不一致");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                "/api/accounts",
                {
                    username: userInfo.username,
                    password: passwords.newPassword,
                },
                {
                    headers: { token },
                }
            );

            if (res.data.code === "200") {
                alert("密码修改成功，请重新登录");
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                alert("修改失败：" + res.data.msg);
            }
        } catch (error) {
            console.error("修改密码出错", error);
            alert("请求错误");
        }
    };

    if (loading) {
        return <div className="text-center text-gray-500 mt-10">加载中...</div>;
    }

    if (!userInfo) {
        return <div className="text-center text-red-500 mt-10">获取用户信息失败</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 px-6">
            <h1 className="text-3xl font-bold mb-6 text-white">个人中心</h1>

            <div className="space-y-4">
                <div className="bg-white shadow p-4 rounded">
                    <p className="text-xl">
                        <span className="font-semibold">用户名：</span>
                        {userInfo.username}
                    </p>
                    <div className="mt-2">
                        <button
                            className="text-sm text-blue-600 hover:underline"
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                        >
                            {showPasswordForm ? "取消修改密码" : "修改密码"}
                        </button>
                    </div>
                    {/* 修改密码表单 */}
                    {showPasswordForm && (
                        <div className="mt-4 space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">新密码：</label>
                                <input
                                    type="password"
                                    value={passwords.newPassword}
                                    onChange={(e) =>
                                        setPasswords({
                                            ...passwords,
                                            newPassword: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    确认新密码：
                                </label>
                                <input
                                    type="password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) =>
                                        setPasswords({
                                            ...passwords,
                                            confirmPassword: e.target.value,
                                        })
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

                {/* 按钮区 */}
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
                        className={`px-4 py-2 rounded ${activeList === "participated" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        onClick={() => setActiveList(activeList === "participated" ? "" : "participated")}
                    >
                        我参与过的盲盒
                    </button>
                </div>

                {/* 列表显示 */}
                {activeList === "created" && (
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-lg font-semibold mb-2">我创建的盲盒：</h2>
                        <ul className="list-disc list-inside">
                            {renderBlindBoxList(userInfo.createdBlindBoxId)}
                        </ul>
                    </div>
                )}
                {activeList === "owned" && (
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-lg font-semibold mb-2">我抽到的盲盒：</h2>
                        <ul className="list-disc list-inside">
                            {renderBlindBoxList(userInfo.ownBlindBoxId)}
                        </ul>
                    </div>
                )}
                {activeList === "participated" && (
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-lg font-semibold mb-2">我参与过的盲盒：</h2>
                        <ul className="list-disc list-inside">
                            {renderBlindBoxList(userInfo.participateBlindBoxId)}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelfMessage;
