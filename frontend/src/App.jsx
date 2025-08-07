import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Login from "./pages/Login"
import Register from "./pages/Register"
import SelfMessage from "./pages/SelfMessage"
import CreateBlindBox from "./pages/CreateBlindBox"
import GetBlindBox from "./pages/GetBlindBox"
import BlindBoxOrder from "./pages/BlindBoxOrder"
import AllBlindBox from "./pages/AllBlindBox"
import MyBlindBox from "./pages/MyBlindBox"
import BlindBoxDetails from "./pages/BlindBoxDetails"
import FindBlindBox from "./pages/FindBlindBox"
import Showing from "./pages/Showing";
import Layout from "./components/Layout";

function App() {
    return (
        <div className="min-h-screen w-full relative">
            {/* 背景图层：保留原始样式，无透明无模糊 */}
            <div
                className="fixed inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/背景图.jpg')" }}
            ></div>

            {/* 内容层 */}
            <div className="relative z-10 min-h-screen">
                <BrowserRouter>
                    <Routes>
                        {/* 不显示导航栏的页面 */}
                        <Route path="*" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* 显示导航栏的页面 */}
                        <Route element={<Layout />}>
                            <Route path="/SelfMessage" element={<SelfMessage />} />
                            <Route path="/CreateBlindBox" element={<CreateBlindBox />} />
                            <Route path="/GetBlindBox" element={<GetBlindBox />} />
                            <Route path="/BlindBoxOrder/:id" element={<BlindBoxOrder />} />
                            <Route path="/AllBlindBox" element={<AllBlindBox />} />
                            <Route path="/MyBlindBox/:id" element={<MyBlindBox />} />
                            <Route path="/BlindBoxDetails/:id" element={<BlindBoxDetails />} />
                            <Route path="/FindBlindBox" element={<FindBlindBox />} />
                            <Route path="/Showing" element={<Showing />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App
