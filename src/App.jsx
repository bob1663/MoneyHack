import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {Login, Main, Profit, Register, Loss, Deposits, Credits, Report} from "./pages/index.js";
import { BurgerMenu, Sidebar } from "./components";
import { useEffect, useState } from "react";
const Layout = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/"
      ||location.pathname==='/register'
      ||location.pathname==='/login';

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    // Відключення прослуховування подій при розмонтовці компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
     <>
      <div className="main-content">
      {!hideSidebar && (isMobile ? <BurgerMenu /> : <Sidebar />)}
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/profit" exact element={<Profit />} />
          <Route path="/loss" exact element={<Loss />} />
          <Route path="/credits" exact element={<Credits />} />
          <Route path="/deposits" exact element={<Deposits />} />
          <Route path="/reports" exact element={<Report />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
};

export default App;
