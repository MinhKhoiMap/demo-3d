import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Showcase from "./pages/Showcase";
import "./util";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/showcase" element={<Showcase />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
