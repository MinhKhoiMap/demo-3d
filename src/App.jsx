import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Showcase from "./pages/Showcase";
import "./util";
import ProjectDetail from "./pages/ProjectDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/showcase" element={<Showcase />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
