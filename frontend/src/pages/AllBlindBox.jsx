import React, { useEffect, useState } from "react";
import axios from "axios";

function AllBlindBox() {
    const [blindBoxes, setBlindBoxes] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [expandedId, setExpandedId] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [userId, setUserId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [userMap, setUserMap] = useState({});
    const [drawResult, setDrawResult] = useState(null);
    const [showDrawConfirm, setShowDrawConfirm] = useState(false);
    const [drawBox, setDrawBox] = useState(null);

    useEffect(() => {
        fetchUserId();
        fetchBlindBoxes("");
    }, []);

    // 获取当前用户 ID
    const fetchUserId = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("用户未登录");
            return;
        }
        try {
            const res = await axios.get("/api/accounts", {
                headers: { token },
            });
            if (res.data.code === "200") {
                setUserId(res.data.data.id);
            } else {
                alert("获取用户信息失败：" + res.data.msg);
            }
        } catch (err) {
            console.error("获取用户失败", err);
        }
    };

    const fetchBlindBoxes = async (name) => {
        try {
            const res = await axios.get("/api/blindBox/find", {
                params: { blindBoxName: name },
            });
            if (res.data.code === "200") {
                setBlindBoxes(res.data.data);
                setExpandedId(null);
                fetchWinnerUsernames(res.data.data);
            } else {
                alert("获取盲盒信息失败：" + res.data.msg);
            }
        } catch (error) {
            console.error("请求盲盒失败", error);
            alert("请求失败，请检查网络或稍后再试");
        }
    };

    const fetchWinnerUsernames = async (boxes) => {
        const ids = new Set();
        boxes.forEach((box) => {
            box.winnerId.forEach((id) => ids.add(id));
        });

        const newUserMap = { ...userMap };
        await Promise.all(
            [...ids].map(async (id) => {
                if (!newUserMap[id]) {
                    try {
                        const res = await axios.get(`/api/accounts/${id}`);
                        if (res.data.code === "200") {
                            newUserMap[id] = res.data.data.username;
                        }
                    } catch (err) {
                        console.error("获取用户名失败", err);
                    }
                }
            })
        );
        setUserMap(newUserMap);
    };

    const handleSearch = () => {
        fetchBlindBoxes(searchText.trim());
    };

    const toggleComments = (id) => {
        setExpandedId((prevId) => (prevId === id ? null : id));
        setCommentText("");
    };

    const handleSubmitComment = async (blindBoxId) => {
        if (!userId) {
            alert("用户未登录");
            return;
        }
        if (commentText.trim() === "") {
            alert("评论内容不能为空");
            return;
        }
        try {
            const res = await axios.put("/api/blindBox", null, {
                params: {
                    userId,
                    blindBoxId,
                    comment: commentText.trim(),
                },
            });
            if (res.data.code === "200") {
                setSuccessMessage("评论成功");
                setTimeout(() => setSuccessMessage(""), 1500);
                setCommentText("");
                fetchBlindBoxes(searchText.trim());
            } else {
                alert("评论失败：" + res.data.msg);
            }
        } catch (err) {
            console.error("提交评论失败", err);
            alert("提交评论失败，请稍后再试");
        }
    };

    const handleDrawBox = (box) => {
        setDrawBox(box);
        setShowDrawConfirm(true);
    };

    const confirmDraw = async () => {
        if (!userId || !drawBox) return;
        try {
            const res = await axios.post(`/api/blindBox/${drawBox.id}`, null, {
                params: { userId },
            });
            if (res.data.code === "200") {
                setDrawResult(res.data.data);
                fetchBlindBoxes(searchText.trim());
            } else {
                setDrawResult(res.data.msg);
            }
        } catch (err) {
            console.error("抽盲盒失败", err);
            setDrawResult("请求失败，请稍后重试");
        } finally {
            setShowDrawConfirm(false);
        }
    };

    const closeDrawResult = () => {
        setDrawResult(null);
        setDrawBox(null);
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 px-6">
            {/* 搜索栏和标题 */}
            <div className="bg-gray-800 pt-4 pb-2 px-6 rounded-t-lg shadow-md mb-6">
                <h1 className="text-3xl font-bold text-white">盲盒商城</h1>
                {successMessage && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-400">
                        {successMessage}
                    </div>
                )}
                <div className="mb-6 flex space-x-2 ml-8">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="搜索盲盒名称..."
                        className="flex-1 px-4 py-2 border rounded ml-auto"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        搜索
                    </button>
                </div>
            </div>

            {/* 盲盒列表 */}
            <div className="grid md:grid-cols-2 gap-6 items-start">
                {blindBoxes.length === 0 ? (
                    <p className="text-white text-center col-span-2">暂无盲盒</p>
                ) : (
                    blindBoxes.map((box) => (
                        <div key={box.id} className="flex">
                            <div className="bg-white shadow p-4 rounded space-y-2 w-full">
                                <h2 className="text-xl font-semibold">{box.blindBoxName}</h2>
                                <p><strong>描述：</strong>{box.description}</p>
                                <p><strong>价格：</strong>{box.price} 元</p>
                                <p><strong>剩余数量：</strong>{box.lastQuantity}</p>
                                <p><strong>剩余中奖数量：</strong>{box.winQuantity}</p>
                                <p><strong>中奖用户：</strong>
                                    {box.winnerId.length > 0
                                        ? box.winnerId.map((id) => userMap[id] || id).join(", ")
                                        : "暂无"}
                                </p>
                                <button
                                    onClick={() => toggleComments(box.id)}
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    {expandedId === box.id ? "收起评论" : "查看/添加评论"}
                                </button>
                                <button
                                    onClick={() => handleDrawBox(box)}
                                    className="ml-4 text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                                >
                                    抽盲盒
                                </button>
                                {expandedId === box.id && (
                                    <div className="mt-2 bg-gray-50 p-3 rounded text-sm space-y-2">
                                        {box.comments.length === 0 ? (
                                            <p className="text-gray-500">暂无评论</p>
                                        ) : (
                                            box.comments.map((comment, idx) => (
                                                <div key={idx}>
                                                    <strong>{box.commentUserName[idx]}：</strong>
                                                    <span>{comment}</span>
                                                </div>
                                            ))
                                        )}
                                        <div className="mt-2">
                                            <textarea
                                                rows={2}
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                                placeholder="输入你的评论..."
                                                className="w-full border rounded px-2 py-1"
                                            />
                                            <button
                                                onClick={() => handleSubmitComment(box.id)}
                                                className="mt-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                            >
                                                提交评论
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 抽盲盒确认弹窗 */}
            {showDrawConfirm && drawBox && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded shadow-md w-80 space-y-4">
                        <h3 className="text-lg font-semibold">确认抽盲盒</h3>
                        <p>是否花费 <strong>{drawBox.price}</strong> 元抽一次盲盒？</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDrawConfirm(false)}
                                className="px-4 py-1 rounded border"
                            >
                                取消
                            </button>
                            <button
                                onClick={confirmDraw}
                                className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                确认
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 抽盲盒结果弹窗 */}
            {drawResult && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded shadow-md w-80 space-y-4">
                        <h3 className="text-lg font-semibold">抽盲盒结果</h3>
                        <p>{drawResult}</p>
                        <div className="flex justify-end">
                            <button
                                onClick={closeDrawResult}
                                className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                            >
                                确定
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllBlindBox;
