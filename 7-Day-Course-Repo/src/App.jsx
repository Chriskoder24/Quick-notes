import LandingPage from "./routes/LandingPage";
import{Routes, Route, Navigate} from 'react-router-dom';
import Signup from "./routes/Signup";
import Login from "./routes/Login";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element ={<LandingPage/>}/>
        <Route path="/login" element ={<Login/>}/>
        <Route path="/sigup" element ={<Signup/>}/>
      </Routes>
    </>
  );
}

export default App;
