import LandingPage from "./routes/LandingPage";
import{Routes, Route, Navigate} from 'react-router-dom';
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Navebar from "./components/Navebar";


function App() {
  return (
    <>
    <div className="min-h-screen bg-slate-50">
    <Navebar/>
      <Routes>
        <Route path="/" element ={<LandingPage/>}/>
        <Route path="/login" element ={<Login/>}/>
        <Route path="/signup" element ={<Signup/>}/>
      </Routes>
      </div>
    </>
  );
}

export default App;
