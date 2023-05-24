import { useEffect, useState } from "react";
import images from "../../constants/images";
import "../Main/Main.css";
import { deleteLoss, editLoss, getLoss, newLoss } from "../../api/api.js";
import { Loader, MyDoughnut } from "../../components";
import { isAuth } from "../../api/AuthContext";
import { useResizer2 } from "../../constants/isMobile";
const Loss = () => {
  const [hover, setHover] = useState([]);
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
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  const [data, setData] = useState([]);
  const [dataDoughnut, setDataDoughnut] = useState([]);

  const [date, setDate] = useState();
  const [note, setNote] = useState();
  const [money, setMoney] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState();
  const getData = async () => {
    setIsLoading(true);
    const profit = await getLoss();
    const hoverArray = profit.map(() => false);
    setHover(hoverArray);
    setData(profit);
    const result = [];
    profit.forEach((r) => {
      const existingCategory = result.find(
        (item) => item.category === r.category
      );
      if (existingCategory) {
        existingCategory.value = parseInt(existingCategory.value);
        existingCategory.value += parseInt(r.value);
      } else {
        result.push({ category: r.category, value: parseInt(r.value) });
      }
    });
    setDataDoughnut(result);
    setIsLoading(false);
  };
  useEffect(() => {
    getData().then();
  }, []);
  const handleNumber = (event) => {
    const value = event.target.value.replace(/[^\d]/g, "");
    if (value.length <= 12) {
      setMoney(value);
    }
  };

  const handleNote = (event) => {
    if (event.target.value.length <= 50) {
      setNote(event.target.value);
    }
  };

  const handleHistoryLink = () => {
    setHistoryLink(!historyLink);
  };

  const [historyLink, setHistoryLink] = useState(true);
  const [isAdd, setIsAdd] = useState(false);
  const handleAdd = (index) => {
    if (index !== undefined) {
      setIsEdit(true);
      setSelectedOption(data[index].category);
      setMoney(parseInt(data[index].value));
      setNote(data[index].note);
      setDate(data[index].time.slice(0, 10));
    } else {
      setIsEdit(false);
      setSelectedOption("Інше");
      setMoney();
      setNote();
      setDate();
    }
    setIsAdd(!isAdd);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [selectedOption, setSelectedOption] = useState("Інше");
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const [sortOption, setSortOption] = useState("Сума");
  const [sortDirection, setSortDirection] = useState("desc");
  const handleSortClick = (option) => {
    if (option === sortOption) {
      // Якщо натиснуто на той самий елемент, змінюємо напрямок сортування
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Якщо натиснуто на інший елемент, встановлюємо нову опцію сортування та напрямок "desc"
      setSortOption(option);
      setSortDirection("desc");
    }
  };

  useEffect(() => {
    let filteredData = data;
    switch (sortOption) {
      case "Сума":
        filteredData.sort((a, b) =>
          sortDirection === "asc" ? a.value - b.value : b.value - a.value
        );
        break;
      case "Категорія":
        filteredData.sort((a, b) => {
          const categoryA = a.category;
          const categoryB = b.category;
          return sortDirection === "asc"
            ? categoryA.localeCompare(categoryB)
            : categoryB.localeCompare(categoryA);
        });
        break;
      case "Нотатка":
        filteredData.sort((a, b) => {
          const noteA = a.note;
          const noteB = b.note;
          return sortDirection === "asc"
            ? noteA.localeCompare(noteB)
            : noteB.localeCompare(noteA);
        });
        break;
      case "Дата":
        filteredData.sort((a, b) => {
          const dateA = new Date(a.time);
          const dateB = new Date(b.time);
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        });
        break;
    }
    setData([...filteredData]);
  }, [sortOption, sortDirection]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    const result = [];
    data.forEach((r) => {
      console.log(endDate);
      console.log(startDate);
      const dateR = new Date(r.time).toISOString().split("T")[0];
      console.log(dateR);
      if (
        (dateR >= startDate && !endDate) ||
        (dateR <= endDate && !startDate) ||
        (dateR <= endDate && dateR >= startDate)
      ) {
        console.log(dateR >= startDate);
        const existingCategory = result.find(
          (item) => item.category === r.category
        );
        if (existingCategory) {
          existingCategory.value = parseInt(existingCategory.value);
          existingCategory.value += parseInt(r.value);
        } else {
          result.push({ category: r.category, value: parseInt(r.value) });
        }
      }
    });
    setDataDoughnut(result);
  }, [startDate, endDate]);
  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const selectedEndDate = new Date(endDate);

    if (selectedDate <= selectedEndDate) {
      setStartDate(e.target.value);
    }
  };

  const handleEndDateChange = (e) => {
    const selectedDate = new Date(startDate);
    const selectedEndDate = new Date(e.target.value);

    if (selectedEndDate >= selectedDate) {
      setEndDate(e.target.value);
    }
  };

  const categories = [
    { cat: "Продукти" },
    { cat: "Кафе та ресторани" },
    { cat: "Інше" },
    { cat: "Розваги та спорт" },
    { cat: "Поповнення мобільного" },
    { cat: "Медицина" },
    { cat: "Подорожі" },
    { cat: "Таксі" },
    { cat: "Комунальні послуги" },
    { cat: "Одяг та взуття" },
    { cat: "Кіно" },
    { cat: "Тварини" },
    { cat: "Книги" },
  ];

  const isMobile = useResizer2();
  return (
    <div className={`profit loss`}>
      <div className="profit-wrapper">
        <h2>Витрати</h2>
        <div
          className="profit-container"
          style={{
            height: !historyLink ? "100%" : isMobile ? "100%" : "705px",
          }}
        >
          <div className="profit-container_buttons">
            <div
              className={`profit-container_buttons-item ${
                historyLink ? "active" : ""
              }`}
              onClick={handleHistoryLink}
            >
              <p>Історія</p>
            </div>
            <div
              className={`profit-container_buttons-item ${
                !historyLink ? "active" : ""
              }`}
              onClick={handleHistoryLink}
            >
              <p>Графік</p>
            </div>
          </div>
          {!historyLink ? (
            <div className="spend-block2">
              <div className="spend-block-text">
                <div className="date-wrapper">
                  <h3 style={{ margin: 0 }}>Start date:</h3>
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </div>
                <div className="date-wrapper">
                  <h3 style={{ margin: 0 }}>End date:</h3>
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </div>
                <h3 className="h3-vitrata">Кількість витрат у категорії</h3>
                <div className="spend-block-text-wrapper">
                  {dataDoughnut.map((spend, index) => (
                    <div
                      className={`spend-block-text_data loss`}
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
                {dataDoughnut && (
                  <MyDoughnut
                    hover={hover}
                    data={dataDoughnut}
                    background={"rgba(209, 35, 35, 1)"}
                  />
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="profit-container-labels">
                <p onClick={() => handleSortClick("Сума")}>
                  Сума <img src={images.Arrows} alt="Arrows" />
                </p>
                <p onClick={() => handleSortClick("Категорія")}>
                  Категорія <img src={images.Arrows} alt="Arrows" />
                </p>
                <p onClick={() => handleSortClick("Нотатка")}>
                  Нотатка <img src={images.Arrows} alt="Arrows" />
                </p>
                <p onClick={() => handleSortClick("Дата")}>
                  Дата <img src={images.Arrows} alt="Arrows" />
                </p>
                <button
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  <p>Додати</p>
                  <img src={images.AddLoss} alt="Add" />
                </button>
              </div>
              <div className="profit-container-blocks">
                {isLoading ? (
                  <div className="loading-screen">
                    <Loader />
                  </div>
                ) : (
                  <>
                    {/* --------------- COMPONENT -------------------- */}
                    {isAdd && (
                      <div className="block">
                        <>
                          <input
                            type="text"
                            placeholder="ГРН"
                            value={money}
                            onChange={(e) => {
                              handleNumber(e);
                            }}
                          />
                          <div className="category">
                            <button onClick={toggleDropdown}>
                              {selectedOption}{" "}
                              <img src={images.ArrowDown} alt="ArrowDown" />
                            </button>
                            <div
                              className={`category-dropdown ${
                                isDropdownOpen ? "open" : ""
                              }`}
                            >
                              {categories.map((cat) => (
                                <h6
                                  onClick={() => handleOptionClick(cat.cat)}
                                  key={cat.cat}
                                >
                                  {cat.cat}
                                </h6>
                              ))}
                            </div>
                          </div>
                          <input
                            type="text"
                            value={note}
                            onChange={(e) => {
                              handleNote(e);
                            }}
                          />
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => {
                              setDate(e.target.value);
                            }}
                          />
                          <img
                            onClick={() => {
                              if (!selectedOption && !money && !note && !date) {
                                alert("ЗАПОВНІТЬ УСІ ПОЛЯ");
                              } else {
                                if (isEdit) {
                                  editLoss(
                                    note,
                                    money,
                                    selectedOption,
                                    date,
                                    id
                                  );
                                  setIsEdit(false);
                                  setSelectedOption("Інше");
                                  setMoney();
                                  setNote();
                                  setDate();
                                } else {
                                  newLoss(note, money, selectedOption, date);
                                  setIsEdit(false);
                                  setSelectedOption("Інше");
                                  setMoney();
                                  setNote();
                                  setDate();
                                }
                                handleAdd();
                                setTimeout(getData, 1000);
                              }
                            }}
                            className="addIcon"
                            src={isEdit ? images.CheckLoss : images.AddLoss}
                            alt="Add"
                          />
                        </>
                      </div>
                    )}
                    {data.map((d, index) => {
                      return (
                        <div key={index} className="block">
                          <p>{parseInt(d.value)} ГРН</p>
                          <p>{d.category}</p>
                          <p>{d.note}</p>
                          <p>
                            {new Date(d.time).toLocaleDateString("uk-UA", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <div className="buttons">
                            {d.category !== "Погашення кредиту" && (
                              <img
                                title="Редагувати"
                                src={images.EditLoss}
                                alt="Edit"
                                onClick={() => {
                                  handleAdd(index);
                                  setId(d.id);
                                }}
                              />
                            )}
                            <img
                              title="Видалити"
                              src={images.DeleteLoss}
                              onClick={() => {
                                deleteLoss(d.id).then();
                                setTimeout(getData, 500);
                              }}
                              alt="Delete"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loss;
