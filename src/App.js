import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Example from "./routes/Example";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Example />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
