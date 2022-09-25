import { Routes, Route } from "react-router-dom";
// pages
import Home from "./pages/Home";
import SingleDog from "./pages/SingleDog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:name" element={<SingleDog />} />
      </Routes>
    </>
  );
}
export default App;
