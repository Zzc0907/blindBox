import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        try {
            const response = await fetch('http://localhost:8080/api/accounts/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (result.code === "200") {
                setSuccessMsg("登录成功，正在跳转...");
                // 存储 token（可选）
                localStorage.setItem("token", result.data);

                // 1.5 秒后跳转
                setTimeout(() => {
                    navigate("/Allblindbox");
                }, 1500);
            } else {
                setErrorMsg(result.msg || "登录失败");
            }
        } catch (error) {
            setErrorMsg("网络错误，请稍后再试");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">登录账号</h2>

                {errorMsg && (
                    <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-300 rounded text-center">
                        {errorMsg}
                    </div>
                )}

                {successMsg && (
                    <div className="mb-4 p-2 text-green-700 bg-green-100 border border-green-300 rounded text-center">
                        {successMsg}
                    </div>
                )}

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
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        登录
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    没有账号？
                    <button
                        onClick={() => navigate("/register")}
                        className="ml-1 text-blue-500 hover:underline"
                    >
                        去注册
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
