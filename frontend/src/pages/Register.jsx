import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");//确认密码
    const [avatar, setAvatar] = useState(null);

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setAvatar(imageURL);
        } else {
            setAvatar(null); // 没选就置空
        }
    };

    const handleRemoveImage = () => {
        setAvatar(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("用户名和密码为必填项");
            return;
        }

        if (password !== confirmPassword) {
            alert("两次填入的密码不一样");
            return;
        }

        const userData = {
            username,
            password,
            avatar: avatar || null,
        };

        console.log("注册用户信息：", userData);
        alert(`注册成功\n用户名：${username}\n头像：${avatar ? avatar : "未上传"}`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">注册账号</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">用户名</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">密码</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">确认密码</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">头像上传（可选）</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full"
                        />
                        {avatar && (
                            <div className="mt-2 flex flex-col items-center">
                                <img
                                    src={avatar}
                                    alt="头像预览"
                                    className="w-24 h-24 object-cover rounded-full border"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="mt-2 text-sm text-red-500 hover:underline"
                                >
                                    移除头像
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        注册
                    </button>
                </form>
                <div className="mt-4 text-center text-sm">
                    已有账号？
                    <button
                        onClick={() => navigate("/login")}
                        className="ml-1 text-blue-500 hover:underline"
                    >
                        去登录
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;