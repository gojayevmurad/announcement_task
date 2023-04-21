import { Route, Routes } from "react-router-dom";
import "./app.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import Products from "./pages/Products/Products";
import AdminAuth from "./pages/AdminAuth/AdminAuth";
import ThemeBtn from "./components/ThemeBtn/ThemeBtn";

function App() {
  return (
    <>
      <ThemeBtn />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/admin" element={<AdminAuth />} />
        
      </Routes>
      <div className="notifications">

      </div>
    </>
  );
}

export default App;
