import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import SignupSuccess from "./routes/SignupSuccess";
import FindPassword from "./routes/FindPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signup-done" element={<SignupSuccess />}></Route>
        <Route path="/find-password" element={<FindPassword />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
