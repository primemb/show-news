import { Routes, Route } from "react-router-dom";
import Favorite from "./pages/Favorite/Favorite";
import HomePage from "./pages/HomePage/HomePage";
import SingleNews from "./pages/SingleNews/SingleNews";
const Router = () => {
  return (
    <Routes>
      <Route path="/fav" element={<Favorite />} />
      <Route path="/:newsId" element={<SingleNews />}></Route>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default Router;
