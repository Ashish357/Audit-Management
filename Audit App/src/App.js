import "./App.css";
import Login from "./component/Login";
import {Route, Routes} from "react-router-dom";
import ChecklistModule from "./component/ChecklistModule";
import BenchmarkModule from "./component/BenchmarkModule";

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="checklist" element={<ChecklistModule/>}/>
          <Route path="benchmark" element={<BenchmarkModule/>}/>
        </Routes>
      </>
  );
}

export default App;
