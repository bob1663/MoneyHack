import { Link, useNavigate } from "react-router-dom";
import "./BurgerMenu.css";
import { images } from "../../constants";
import { useState } from "react";
import { clearStorages } from "../../api/tokenStorage";

const BurgerMenu = () => {
  const navigate = useNavigate();
  const logOut = () => {
    clearStorages();
    navigate("/");
  };
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  const isLoss = location.pathname === "/loss";
  const isDeposits = location.pathname === "/deposits";
  const isProfit = location.pathname === "/profit";
  const isCredits = location.pathname === "/credits";
  const isReports = location.pathname === "/reports";

  return (
    <div className="burgermenu-container">
      <div className="burger-button" onClick={handleToggleMenu}>
        <span className={`top-span ${toggleMenu ? "rotate-top" : ""}`}></span>
        <span className={`middle-span ${toggleMenu ? "hide" : ""}`}></span>
        <span
          className={`bottom-span ${toggleMenu ? "rotate-bottom" : ""}`}
        ></span>
      </div>
      {toggleMenu && (
        <div
          className={`burgermenu ${isLoss ? "loss" : ""} ${
            isDeposits ? "deposits" : ""
          }  ${isCredits ? "credits" : ""} ${isReports ? "reports" : ""}`}
        >
          <div className="burgermenu-wrapper">
            <div className="burgermenu-profile">
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
              className="burgermenu-item"
              style={{ marginBottom: 48 }}
              onClick={handleToggleMenu}
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
            <Link
              to="/loss"
              className="burgermenu-item"
              style={{ marginBottom: 48 }}
              onClick={handleToggleMenu}
            >
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
              className="burgermenu-item"
              style={{ marginBottom: 48 }}
              onClick={handleToggleMenu}
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
              className="burgermenu-item"
              style={{ marginBottom: 48 }}
              onClick={handleToggleMenu}
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
              className="burgermenu-item"
              style={{ marginBottom: 48 }}
              onClick={handleToggleMenu}
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
          <div
            className="burgermenu-item"
            onClick={() => {
              handleToggleMenu();
              logOut();
            }}
          >
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
      )}
    </div>
  );
};

export default BurgerMenu;
