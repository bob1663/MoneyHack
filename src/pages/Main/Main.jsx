import { Link } from "react-router-dom";
import "./Main.css";
import { images } from "../../constants";
import { MyDoughnut } from "../../components";
import { useEffect, useState } from "react";
import { isAuth } from "../../api/AuthContext";

const Main = () => {
  useEffect(() => {
    if (isAuth()) {
      window.location.href = "/profit";
    }
  }, [isAuth()]);
  const [hover, setHover] = useState([]);
  const [hover2, setHover2] = useState([]);
  const handleHover = (index, bool) => {
    setHover((prevHover) => {
      return prevHover.map((value, howIndex) => {
        if (howIndex === index) {
          return bool;
        } else {
          return false;
        }
      });
    });
  };
  const handleHover2 = (index, bool) => {
    console.log(bool);
    setHover2((prevHover) => {
      return prevHover.map((value, howIndex) => {
        if (howIndex === index) {
          return bool;
        } else {
          return false;
        }
      });
    });
    console.log(hover2);
  };

  const spendData = [
    {
      category: "Продукти",
      value: 40,
    },
    {
      category: "Кафе та ресторани",
      value: 10,
    },
    {
      category: "Інше",
      value: 10,
    },
    {
      category: "Розваги та спорт",
      value: 7.1,
    },
    {
      category: "Поповнення мобільного",
      value: 5.1,
    },
    {
      category: "Медицина",
      value: 5.1,
    },
    {
      category: "Подорожі",
      value: 5.1,
    },
    {
      category: "Таксі",
      value: 5.1,
    },
    {
      category: "Комунальні послуги",
      value: 3.1,
    },
    {
      category: "Одяг та взуття",
      value: 2.5,
    },
    {
      category: "Кіно",
      value: 2.1,
    },
    {
      category: "Тварини",
      value: 1.4,
    },
    {
      category: "Книги",
      value: 0.9,
    },
  ];

  const profitData = [
    {
      category: "Заробітна плата",
      value: 31.6,
    },
    {
      category: "Бізнес-прибуток",
      value: 29.4,
    },
    {
      category: "Інвестиційний дохід",
      value: 9.3,
    },
    {
      category: "Капітальний дохід",
      value: 8.7,
    },
    {
      category: "Премії",
      value: 7,
    },
    {
      category: "Продаж товарів",
      value: 7,
    },
    {
      category: "Авторські винагороди",
      value: 7,
    },
  ];
  useEffect(() => {
    const hoverArray = spendData.map(() => false);
    setHover(hoverArray);
  }, []);
  useEffect(() => {
    const hoverArray = profitData.map(() => false);
    setHover2(hoverArray);
  }, []);

  return (
    <>
      <div className="main-nav">
        <Link to="/login" className="main-nav-item">Увійти</Link>
        <Link to="/register" className="main-nav-item">Зареєструватися</Link>
      </div>
      <div className="main">
        <div className="main-header">
          <div className="logo-wrapper">
            <h1>MONEY</h1>
            <h1>HACK</h1>
          </div>

          <h2>Володійте своїми фінансами</h2>
        </div>
        <div className="main-section">
          <div className="border">
            <div className="content">
              <h3>Керуйте своїми фінансами з легкістю</h3>
              <p>
                Завдяки сайту MoneyHack користувачі зможуть легко і зручно
                керувати своїми фінансами. Сайт пропонує можливість
                відстежування доходів та витрат, додавання, видалення та
                редагування фінансових операцій, а також генерацію звіту про
                фінансовий стан користувача з можливістю фільтрації за різними
                параметрами. Завдяки MoneyHack користувачі зможуть контролювати
                свої фінанси з легкістю та забезпечити стабільність своєї
                фінансової ситуації.
              </p>
              <Link to="/login" className="try-now">
                Спробувати зараз!
              </Link>
            </div>
          </div>
          <div className="service-text-wrapper">
            <div className="service-text">
              <h2>Що може наш сервіс?</h2>
            </div>
          </div>
          <div className="spend-block">
            <div className="spend-block-text">
              <h2>Кількість витрат у категорії</h2>
              <div className="spend-block-text-wrapper">
                {spendData.map((spend, index) => (
                  <div
                    className="spend-block-text_data"
                    onMouseOver={() => {
                      handleHover(index, true);
                    }}
                    onMouseLeave={() => {
                      handleHover(index, false);
                    }}
                    key={spend.category}
                  >
                    <p>{spend.category}</p>
                    <p>{spend.value} ГРН</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="spend-block-piechart">
              <MyDoughnut
                hover={hover}
                data={spendData}
                background={"rgba(0, 125, 46, 1)"}
              />
            </div>
          </div>
          <div className="profit-block">
            <div className="profit-block-text">
              <h2>Кількість профіту за рік</h2>
              <div className="profit-block-text-wrapper">
                {profitData.map((profit, index) => (
                  <div
                    className="profit-block-text_data"
                    onMouseLeave={() => {
                      handleHover2(index, false);
                    }}
                    onMouseOver={() => {
                      handleHover2(index, true);
                    }}
                    key={profit.category}
                  >
                    <p>{profit.category}</p>
                    <p>{profit.value} ГРН</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="profit-block-piechart">
              <MyDoughnut
                hover={hover2}
                data={profitData}
                background={"rgba(55, 120, 0, 1)"}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <img src={images.GitHub} alt="GitHub" />
          <p>© Saton Team</p>
        </div>
      </div>
    </>
  );
};

export default Main;
