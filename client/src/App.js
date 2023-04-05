import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={'*'} element={<Home/>}/>
                <Route path={'/admin/*'} element={<AdminPanel/>}/>
            </Routes>
        </div>
    );
}

export default App;