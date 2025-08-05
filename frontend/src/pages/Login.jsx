import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            username,
            password
        };
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                alert('登录成功！');
                console.log('返回数据:', data);
                // 保存 token，跳转页面等
            } else {
                alert(`登录失败：${data.message}`);
            }
        } catch (err) {
            console.error('请求失败', err);
            alert('网络错误');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">登录账号</h2>
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

                <p className="mt-4 text-sm text-center">
                    还没有账号？
                    <button
                        type="button"
                        onClick={() => navigate('/register')}
                        className="text-blue-500 hover:underline ml-1"
                    >
                        去注册一个
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Login