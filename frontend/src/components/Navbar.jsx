// Navbar.js
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        // 关键：改为 fixed left-0，宽度设为固定值（如 w-64），并调整内部布局
        <nav className="fixed left-0 top-0 h-full w-64 bg-blue-700 py-8 px-6 flex flex-col items-start space-y-8 z-50 shadow-lg">
            {/* 顶部 Logo */}
            <div>
                <Link to="/AllBlindBox" className="font-bold text-2xl text-white">
                    盲盒系统
                </Link>
            </div>

            {/* 中间菜单 - 改为垂直排列 */}
            <div className="flex flex-col space-y-6 w-full">
                <Link to="/AllBlindBox" className="text-white hover:text-yellow-300 text-lg pl-2 border-l-4 border-transparent hover:border-yellow-300 transition-colors duration-200">
                    盲盒商城
                </Link>
                <Link to="/Showing" className="text-white hover:text-yellow-300 text-lg pl-2 border-l-4 border-transparent hover:border-yellow-300 transition-colors duration-200">
                    买家秀
                </Link>
                <Link to="/SelfMessage" className="text-white hover:text-yellow-300 text-lg pl-2 border-l-4 border-transparent hover:border-yellow-300 transition-colors duration-200">
                    个人中心
                </Link>
            </div>

            {/* 底部退出按钮 */}
            <div className="mt-auto w-full">
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                    退出登录
                </button>
            </div>
        </nav>
    );
}

export default Navbar;