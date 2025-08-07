import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="w-full bg-blue-700 py-4 px-36 flex items-center justify-between">
            {/* 左边 Logo */}
            <div>
                <Link to="/AllBlindBox" className="font-bold text-2xl text-white">
                    盲盒系统
                </Link>
            </div>

            {/* 中间菜单 */}
            <div className="flex space-x-10">
                <Link to="/AllBlindBox" className="text-white hover:text-yellow-300 text-lg">
                    盲盒商城
                </Link>
                <Link to="/Showing" className="text-white hover:text-yellow-300 text-lg">
                    买家秀
                </Link>
                <Link to="/SelfMessage" className="text-white hover:text-yellow-300 text-lg">
                    个人中心
                </Link>
            </div>

            {/* 右边退出按钮 */}
            <div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded "
                >
                    退出登录
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
