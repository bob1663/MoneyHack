import { useEffect, useState } from "react";
import images from "../../constants/images";
import "../Main/Main.css";
import {
  deleteDeposit,
  editDeposit,
  getDeposit,
  newDeposit,
  closeDeposit,
} from "../../api/api.js";
import { Loader } from "../../components";
import { isAuth } from "../../api/AuthContext";
import { useResizer2 } from "../../constants/isMobile";
const Deposits = () => {
  useEffect(() => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
  }, [isAuth()]);

  const [data, setData] = useState([]);
  const [note, setNote] = useState();
  const [money, setMoney] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState();
  const [category, setCategory] =useState();
  const getData = async () => {
    setIsLoading(true);
    const profit = await getDeposit();
    setData(profit);
    console.log(profit);
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
  const handlePercent = (event) => {
    const inputPercent = event.target.value;
    const regexPattern = /^\d{0,2}(?:\.\d{0,3})?$/;
    if (regexPattern.test(inputPercent) || inputPercent === "") {
      setPercent(inputPercent);
    }
  };
  const handleNote = (event) => {
    if (event.target.value.length <= 50) {
      setNote(event.target.value);
    }
  };
  const handleCategory = (event) => {
    if (event.target.value.length <= 50) {
      setCategory(event.target.value);
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
      setCategory(data[index].from_where);
      setMoney(parseInt(data[index].value));
      setNote(data[index].note);
      setStartDate(data[index].start_time.slice(0, 10));
      setEndDate(data[index].end_time.slice(0, 10));
      setPercent(data[index].percentage);
    } else {
      setIsEdit(false);
      setCategory();
      setMoney();
      setNote();
      setStartDate();
      setEndDate();
      setPercent();
    }
    setIsAdd(!isAdd);
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
          const categoryA = a.from_where;
          const categoryB = b.from_where;
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
        case "Дата взяття":
          filteredData.sort((a, b) => {
            const dateA = new Date(a.start_time);
            const dateB = new Date(b.start_time);
            return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
          });
          break;
        case "Дата гасіння":
          filteredData.sort((a, b) => {
            const dateA = new Date(a.end_time);
            const dateB = new Date(b.end_time);
            return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
          });
          break;
        case "Відсоток":
          filteredData.sort((a, b) =>
          sortDirection === "asc" ? a.percentage - b.percentage : b.percentage - a.percentage
        );
          break;
        case "Профіт":
          filteredData.sort((a, b) =>
          sortDirection === "asc" ? a.profit - b.profit : b.profit - a.profit
        );
          break;
    }
    setData([...filteredData]);
  }, [sortOption, sortDirection]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const isMobile = useResizer2();
  return (
    <div className={`profit deposit`}>
      <div className="profit-wrapper">
        <h2>Депозити</h2>
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
              <p>Закрито</p>
            </div>
          </div>
          {!historyLink ? (
            <>
              <div className="profit-container-labels deposit2">
                <p onClick={() => handleSortClick("Сума")}>
                  Сума <img src={images.Arrows} alt="Arrowss" />
                </p>
                <p onClick={() => handleSortClick("Категорія")}>
                  Депозитовано <img src={images.Arrows} alt="Arrowss" />
                </p>
                <p onClick={() => handleSortClick("Нотатка")}>
                  Нотатка <img src={images.Arrows} alt="Arrowss" />
                </p>
                <p onClick={() => handleSortClick("Дата взяття")}>
                  Дата взяття <img src={images.Arrows} alt="Arrowss" />
                </p>
                <p onClick={() => handleSortClick("Дата гасіння")}>
                  Дата гасіння <img src={images.Arrows} alt="Arrowss" />
                </p>
                <p onClick={() => handleSortClick("Відсоток")}>
                  Відсоток <img src={images.Arrows} alt="Arrowss" />
                </p>
                <p onClick={() => handleSortClick("Профіт")}>
                  Профіт <img src={images.Arrows} alt="Arrowss" />
                </p>
              </div>
              <div className="profit-container-blocks">
                {data.map((d, index) => {
                  if (d.is_closed) {
                    return (
                      <div key={index} className="block deposit2">
                        <p>{parseInt(d.value)} ГРН</p>
                        <p>{d.from_where}</p>
                        <p>{d.note}</p>
                        <p>
                          {new Date(d.start_time).toLocaleDateString("uk-UA", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p>
                          {new Date(d.end_time).toLocaleDateString("uk-UA", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p>{d.percentage}%</p>
                        <p>{d.profit} ГРН</p>
                        <div className="buttons">
                          <img
                              title="Відкрити депозит"
                              src={images.CheckDeposit}
                              onClick={() => {
                                setIsLoading(true);
                                closeDeposit(d.id).then();
                                setTimeout(getData, 1000);
                                setIsLoading(false);
                              }}
                              alt="Delete"
                          />
                          <img
                              title="Видалити"
                              src={images.DeleteDeposit}
                              onClick={() => {
                                deleteDeposit(d.id).then();
                                setTimeout(getData, 500);
                              }}
                              alt="Delete"
                          />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </>
          ) : (
            <>
              <div className="profit-container-labels deposit">
                <p onClick={() => handleSortClick("Сума")}>
                  Сума <img src={images.Arrows} alt="Arrowss" />
                </p>
                <p onClick={() => handleSortClick("Категорія")}>
                  Депозитовано <img src={images.Arrows} alt="Arrowss" />
                </p>
                <p onClick={() => handleSortClick("Нотатка")}>
                  Нотатка <img src={images.Arrows} alt="Arrowss" />
                </p>
                <p onClick={() => handleSortClick("Дата взяття")}>
                  Дата взяття <img src={images.Arrows} alt="Arrowss" />
                </p>
                <p onClick={() => handleSortClick("Дата гасіння")}>
                  Дата гасіння <img src={images.Arrows} alt="Arrowss" />
                </p>
                <p onClick={() => handleSortClick("Відсоток")}>
                  Відсоток <img src={images.Arrows} alt="Arrowss" />
                </p>
                <button
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  <p>Додати</p>
                  <img src={images.AddDeposit} alt="Add" />
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
                      <div className="block deposit">
                        <>
                          <input
                            type="text"
                            placeholder="ГРН"
                            value={money}
                            onChange={(e) => {
                              handleNumber(e);
                            }}
                          />
                          <input
                              type="text"
                              value={category}
                              placeholder="Куди"
                              onChange={(e) => {
                                handleCategory(e);
                              }}
                          />
                          <input
                            type="text"
                            value={note}
                            onChange={(e) => {
                              handleNote(e);
                            }}
                          />
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                              handleStartDateChange(e);
                            }}
                          />
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => {
                              handleEndDateChange(e);
                            }}
                          />
                          <input
                            type="text"
                            value={percent}
                            onChange={(e) => {
                              handlePercent(e);
                            }}
                          />
                          <img
                            onClick={() => {
                              if(!category&&!money&&!note&&!startDate&&!endDate&&!percent){
                                alert("ЗАПОВНІТЬ УСІ ПОЛЯ");
                              }
                              else {
                              if (isEdit) {
                                editDeposit(
                                  note,
                                  money,
                                  category,
                                  startDate,
                                  endDate,
                                  percent,
                                  id
                                );
                              } else {
                                newDeposit(
                                  note,
                                  money,
                                  category,
                                  startDate,
                                  endDate,
                                  percent,
                                  id
                                );
                              }
                              setIsEdit(false);
                              setCategory();
                              setMoney();
                              setNote();
                              setStartDate();
                              setEndDate();
                              setPercent();
                              handleAdd();
                              setTimeout(getData, 1000);
                            }}
                          }
                            className="addIcon"
                            src={
                              isEdit ? images.CheckDeposit : images.AddDeposit
                            }
                            alt="Add"
                          />
                        </>
                      </div>
                    )}
                    {data.map((d, index) => {
                      if (!d.is_closed) {
                        return (
                          <div key={index} className="block deposit">
                            <p>{parseInt(d.value)} ГРН</p>
                            <p>{d.from_where}</p>
                            <p>{d.note}</p>
                            <p>
                              {new Date(d.start_time).toLocaleDateString(
                                "uk-UA",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <p>
                              {new Date(d.end_time).toLocaleDateString(
                                "uk-UA",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <p>{d.percentage}%</p>
                            <div className="buttons">
                              <img
                                  title="Закрити депозит"
                                src={images.CheckDeposit}
                                onClick={() => {
                                  setIsLoading(true);
                                  closeDeposit(d.id).then();
                                  setTimeout(getData, 1000);
                                  setIsLoading(false);
                                }}
                                alt="Delete"
                              />
                              <img
                                  title="Редагувати"
                                  src={images.EditDeposit}
                                alt="Edit"
                                onClick={() => {
                                  handleAdd(index);
                                  setId(d.id);
                                }}
                              />
                              <img
                                  title="Видалити"
                                  src={images.DeleteDeposit}
                                onClick={() => {
                                  deleteDeposit(d.id).then();
                                  setTimeout(getData, 500);
                                }}
                                alt="Delete"
                              />
                            </div>
                          </div>
                        );
                      }
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

export default Deposits;
