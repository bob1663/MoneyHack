import { Link, useNavigate } from "react-router-dom";
import { images } from "../../constants";
import "./Sidebar.css";
import { useRef, useState, useEffect } from "react";
import { clearStorages } from "../../api/tokenStorage";

const Sidebar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    clearStorages();
    navigate("/");
  };

  const sidebarRef = useRef(null); // Посилання на елемент сайдбару

  const [isOpen, setIsOpen] = useState(false);

  const handleSidebarClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const isLoss = location.pathname === "/loss";
  const isDeposits = location.pathname === "/deposits";
  const isProfit = location.pathname === "/profit";
  const isCredits = location.pathname === "/credits";
  const isReports = location.pathname === "/reports";

  return (
    <div
      className={`sidebar ${isOpen && "open"} ${isLoss ? "loss" : ""} ${
        isDeposits ? "deposits" : ""
      }  ${isCredits ? "credits" : ""} ${isReports ? "reports" : ""}`}
      onClick={handleSidebarClick}
      ref={sidebarRef}
    >
      
      <div className="sidebar-wrapper">
        <div className="sidebar-profile">
          <img
            src={
              isProfit
                ? images.ProfileProfit
                : isLoss
                ? images.ProfileLoss
                : isDeposits
                ? images.ProfileDeposit
                : isCredits
                ? images.ProfileCredit
                : images.Profile
            }
            alt="Profile"
          />
          <p>Профіль</p>
        </div>
        <span></span>
        <Link
          to="/profit"
          className="sidebar-item"
          style={{ marginBottom: 48 }}
        >
          <img
            src={
              isProfit
                ? images.ProfitProfit
                : isLoss
                ? images.ProfitLoss
                : isDeposits
                ? images.ProfitDeposit
                : isCredits
                ? images.ProfitCredit
                : images.Profit
            }
            alt="Profit"
          />
          <p>Профіт</p>
        </Link>
        <Link to="/loss" className="sidebar-item" style={{ marginBottom: 48 }}>
          <img
            src={
              isProfit
                ? images.LossProfit
                : isLoss
                ? images.LossLoss
                : isDeposits
                ? images.LossDeposit
                : isCredits
                ? images.LossCredit
                : images.Spend
            }
            alt="Spend"
          />
          <p>Витрати</p>
        </Link>
        <Link
          to="/credits"
          className="sidebar-item"
          style={{ marginBottom: 48 }}
        >
          <img
            src={
              isProfit
                ? images.CreditsProfit
                : isLoss
                ? images.CreditsLoss
                : isDeposits
                ? images.CreditsDeposit
                : isCredits
                ? images.CreditsCredit
                : images.Credit
            }
            alt="Credit"
          />
          <p>Кредити</p>
        </Link>
        <Link
          to="/deposits"
          className="sidebar-item"
          style={{ marginBottom: 48 }}
        >
          <img
            src={
              isProfit
                ? images.DepositsProfit
                : isLoss
                ? images.DepositsLoss
                : isDeposits
                ? images.DepositsDeposit
                : isCredits
                ? images.DepositsCredit
                : images.Deposit
            }
            alt="Deposit"
          />
          <p>Депозити</p>
        </Link>
        <Link
          to="/reports"
          className="sidebar-item"
          style={{ marginBottom: 48 }}
        >
          <img
            src={
              isProfit
                ? images.ReportsProfit
                : isLoss
                ? images.ReportsLoss
                : isDeposits
                ? images.ReportsDeposit
                : isCredits
                ? images.ReportsCredit
                : images.Report
            }
            alt="Report"
          />
          <p>Звіти</p>
        </Link>
      </div>
      <div className="sidebar-item" onClick={logOut}>
        <img
          src={
            isProfit
              ? images.ExitProfit
              : isLoss
              ? images.ExitLoss
              : isDeposits
              ? images.ExitDeposit
              : isCredits
              ? images.ExitCredit
              : images.Logout
          }
          alt="Logout"
        />
        <p>Вийти</p>
      </div>
    </div>
  );
};

export default Sidebar;
