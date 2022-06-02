import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import CustomSpinner from "./components/CustomSpinner/CustomSpinner";
import HomePage from "./pages/HomePage/HomePage";
const SingleNews = lazy(() => import("./pages/SingleNews/SingleNews"));
const Favorite = lazy(() => import("./pages/Favorite/Favorite"));

const Router = () => {
  return (
    <Suspense fallback={<CustomSpinner />}>
      <Routes>
        <Route path="/fav" element={<Favorite />} />
        <Route path="/:newsId" element={<SingleNews />}></Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
