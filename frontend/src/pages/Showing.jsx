// Showing.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Showing() {
    const [shows, setShows] = useState([]);
    const [userMap, setUserMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentUsername, setCurrentUsername] = useState(""); // 存储当前用户名
    const [commentText, setCommentText] = useState("");
    const [commentShowId, setCommentShowId] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [postDetail, setPostDetail] = useState("");

    // 获取当前登录用户 ID 和用户名
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;
                const res = await axios.get("/api/accounts", {
                    headers: { token },
                });
                if (res.data.code === "200") {
                    const userData = res.data.data;
                    setCurrentUserId(userData.id);
                    setCurrentUsername(userData.username); // 保存用户名
                }
            } catch (err) {
                console.error("获取当前用户失败:", err);
            }
        };
        fetchCurrentUser();
    }, []);

    // 获取所有买家秀
    useEffect(() => {
        const fetchShows = async () => {
            try {
                const res = await axios.get("/api/show");
                if (res.data.code === "200") {
                    const data = res.data.data;
                    setShows(data);
                    const userIds = [...new Set(data.map(show => show.userId))];
                    const userRequests = userIds.map(id =>
                        axios.get(`/api/accounts/${id}`)
                            .then(r => ({ id, username: r.data.data.username }))
                            .catch(() => ({ id, username: "未知用户" }))
                    );
                    const users = await Promise.all(userRequests);
                    const userMapData = {};
                    users.forEach(u => {
                        userMapData[u.id] = u.username;
                    });
                    setUserMap(userMapData);
                }
            } catch (err) {
                console.error("获取买家秀失败:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchShows();
    }, []);

    // 发表评论
    const handleComment = async () => {
        if (!commentText.trim()) {
            alert("评论内容不能为空");
            return;
        }
        try {
            const res = await axios.post(`/api/show/comment`, null, {
                params: {
                    showId: commentShowId,
                    userId: currentUserId,
                    comment: commentText.trim()
                }
            });
            if (res.data.code === "200") {
                alert("评论成功");
                setCommentText("");
                setShowCommentModal(false);
                // 刷新买家秀数据
                const refresh = await axios.get("/api/show");
                if (refresh.data.code === "200") {
                    setShows(refresh.data.data);
                }
            } else {
                alert(res.data.msg || "评论失败");
            }
        } catch (err) {
            console.error("评论失败:", err);
        }
    };

    // 删除买家秀
    const handleDeleteShow = async (showId) => {
        if (!window.confirm("确定要删除这个买家秀吗？")) return;

        try {
            const res = await axios.delete("/api/show", {
                params: { showId }
            });

            if (res.data.code === "200") {
                alert("删除成功");
                // 从本地状态中移除已删除的帖子
                setShows(prev => prev.filter(show => show.id !== showId));
            } else {
                alert(res.data.msg || "删除失败");
            }
        } catch (err) {
            console.error("删除买家秀失败:", err);
            alert("删除失败，请稍后重试");
        }
    };

    // 发布新帖子
    const handleCreatePost = async () => {
        if (!postDetail.trim()) {
            alert("帖子内容不能为空");
            return;
        }

        if (!currentUserId) {
            alert("用户未登录，无法发帖");
            return;
        }

        try {
            const res = await axios.post("/api/show", {
                userId: currentUserId,
                detail: postDetail.trim()
            });

            if (res.data.code === "200") {
                alert("发帖成功");
                setPostDetail("");
                setShowPostModal(false);
                // ✅ 关键修改：刷新数据并更新 userMap
                const refresh = await axios.get("/api/show");
                if (refresh.data.code === "200") {
                    const newShows = refresh.data.data;
                    setShows(newShows);

                    // 重新获取所有用户信息并更新 userMap
                    const userIds = [...new Set(newShows.map(show => show.userId))];
                    const userRequests = userIds.map(id =>
                        axios.get(`/api/accounts/${id}`)
                            .then(r => ({ id, username: r.data.data.username }))
                            .catch(() => ({ id, username: "未知用户" }))
                    );
                    const users = await Promise.all(userRequests);
                    const newUserMap = {};
                    users.forEach(u => {
                        newUserMap[u.id] = u.username;
                    });
                    setUserMap(newUserMap);
                }
            } else {
                alert(res.data.msg || "发帖失败");
            }
        } catch (err) {
            console.error("发帖失败:", err);
            alert("发帖失败，请稍后重试");
        }
    };

    if (loading) {
        return <div className="p-4 text-center">加载中...</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-white">买家秀</h1>

            {/* 发帖按钮 */}
            {currentUserId && (
                <div className="mb-6">
                    <button
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        onClick={() => setShowPostModal(true)}
                    >
                        + 发帖子
                    </button>
                </div>
            )}

            {shows.length === 0 ? (
                <div className="text-gray-500 text-center py-8">暂无买家秀</div>
            ) : (
                // 修改：使用 flex 列布局，每行一个
                <div className="flex flex-col space-y-6">
                    {shows.map(show => {
                        // 获取该帖子创建者的用户名
                        const posterUsername = userMap[show.userId] || `用户ID ${show.userId}`;
                        // 判断当前用户是否是该帖子的创建者
                        const isOwner = currentUsername && currentUsername === posterUsername;

                        return (
                            <div
                                key={show.id}
                                className="border rounded-lg p-6 bg-white shadow-lg flex flex-col justify-between"
                            >
                                {/* 创建者 */}
                                <div className="text-sm text-gray-600 mb-2">
                                    创建者：{posterUsername}
                                </div>

                                {/* 详情 */}
                                <div className="text-lg font-medium mb-4 break-words min-h-[80px]">
                                    {show.detail}
                                </div>

                                {/* 评论 */}
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold mb-2">评论：</h3>
                                    {show.comment.length > 0 ? (
                                        <ul className="space-y-1 mb-2">
                                            {show.comment.map((cmt, idx) => (
                                                <li key={idx} className="text-sm">
                                                    <span className="font-medium text-blue-600">
                                                        {show.commentUserName[idx] || "匿名"}：
                                                    </span>{" "}
                                                    {cmt}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-gray-400 text-sm mb-2">暂无评论</div>
                                    )}
                                </div>

                                {/* 操作按钮 */}
                                <div className="flex flex-col space-y-2 mt-4">
                                    {/* 评论按钮 */}
                                    {currentUserId && (
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                            onClick={() => {
                                                setCommentShowId(show.id);
                                                setShowCommentModal(true);
                                            }}
                                        >
                                            评论
                                        </button>
                                    )}

                                    {/* 删除按钮 - 仅当当前用户是创建者时显示 */}
                                    {isOwner && (
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                            onClick={() => handleDeleteShow(show.id)}
                                        >
                                            删除帖子
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 评论弹窗 */}
            {showCommentModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">发表评论</h2>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full border rounded p-2 mb-4 resize-none"
                            rows="4"
                            placeholder="请输入评论内容"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setShowCommentModal(false)}
                            >
                                取消
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleComment}
                            >
                                发表
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 发帖弹窗 */}
            {showPostModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">发布新帖子</h2>
                        <textarea
                            value={postDetail}
                            onChange={(e) => setPostDetail(e.target.value)}
                            className="w-full border rounded p-2 mb-4 resize-none"
                            rows="5"
                            placeholder="来分享你的抽盲盒体验吧~"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setShowPostModal(false)}
                            >
                                取消
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={handleCreatePost}
                            >
                                发布
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}