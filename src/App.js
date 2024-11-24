import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import ProjectList from "./pages/ProjectList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProjectList />} />
      </Routes>
    </div>
  );
}

export default App;
