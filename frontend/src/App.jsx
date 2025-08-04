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
function App() {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="*" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/SelfMessage/:id" element={<SelfMessage />} />
                <Route path="/CreateBlindBox" element={<CreateBlindBox />} />
                <Route path="/GetBlindBox" element={<GetBlindBox />} />
                <Route path="/BlindBoxOrder/:id" element={<BlindBoxOrder />} />
                <Route path="/AllBlindBox" element={<AllBlindBox />} />
                <Route path="/MyBlindBox/:id" element={<MyBlindBox />} />
                <Route path="/BlindBoxDetails/:id" element={<BlindBoxDetails />} />
                <Route path="/FindBlindBox" element={<FindBlindBox />} />
            </Routes>
        </BrowserRouter>
    )
}


export default App
