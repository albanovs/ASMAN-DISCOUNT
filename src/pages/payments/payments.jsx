import React, { useEffect, useState } from "react";
import "./payments.css";
import { api } from "../../Api";
import { MdOutlineHistory } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import Modal from "../../containers/UI/Modal/Modal";
import { CiSearch } from "react-icons/ci";
import Skeleton from "react-loading-skeleton";

export default function Payments() {
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDataHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(
        `/payment/history/?datefrom=${startDate}&dateto=${endDate}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setHistory(response.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataHistory();
  }, []);

  const handleSelectPeriod = (period) => {
    const today = new Date();
    switch (period) {
      case "week":
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        setStartDate(weekAgo.toISOString().split("T")[0]);
        setEndDate(today.toISOString().split("T")[0]);
        break;
      case "currentMonth":
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );
        const lastDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        setStartDate(firstDayOfMonth.toISOString().split("T")[0]);
        setEndDate(lastDayOfMonth.toISOString().split("T")[0]);
        break;
      case "lastMonth":
        const firstDayOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const lastDayOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );
        setStartDate(firstDayOfLastMonth.toISOString().split("T")[0]);
        setEndDate(lastDayOfLastMonth.toISOString().split("T")[0]);
        break;
      default:
        break;
    }
  };

  const renderStatus = (data) => {
    const statusColor =
      data.status === 0
        ? "red"
        : data.status === 1
          ? "#00FF7F"
          : "var(--orange)";
    const statusIcon =
      data.status === 0 ? (
        <MdCancel />
      ) : data.status === 1 ? (
        <IoCheckmarkDoneCircleSharp />
      ) : (
        <MdOutlineHistory />
      );
    const statusText =
      data.info === "Покупка Asman" && data.status === 2
        ? "В обработке"
        : data.info === "Покупка Asman" && data.status === 0
          ? "Отклонено"
          : data.type === 1
            ? `+${data.total}`
            : `-${data.total}`;

    return (
      <p className="detail_count_status" style={{ color: statusColor }}>
        {statusText}
        <span>{statusIcon}</span>
      </p>
    );
  };

  return (
    <div>
      <div className="section-payments">
        <div className="button_period" onClick={() => setModal(!modal)}>
          Выбрать период <MdOutlineNavigateNext />
        </div>
        {modal && (
          <Modal color="white" setIsModalOpen={setModal}>
            <h1 className="text-modal-date">Выберите дату:</h1>
            <div className="contain-date-block">
              <div>
                <span>от:</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <span>до:</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="contain-date-block2">
              <button onClick={() => handleSelectPeriod("week")}>Неделя</button>
              <button onClick={() => handleSelectPeriod("currentMonth")}>
                За текущий месяц
              </button>
              <button onClick={() => handleSelectPeriod("lastMonth")}>
                За прошлый месяц
              </button>
              <button
                style={{
                  background: "var(--orange)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  color: "white"
                }}
                onClick={() => {
                  fetchDataHistory();
                  setModal(false);
                }}
              >
                <CiSearch />
                Поиск
              </button>
            </div>
          </Modal>
        )}
        {loading ? (
          history.map((data, index) => (
            <div key={index} className="section-payments_items">
              <h1>{data.date}</h1>
              {data.list.map((data, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <h1>{data.info}</h1>
                    <p style={{ fontSize: '10px', color: '#999999' }}>{data.recipient} {data.operation_time}</p>
                  </div>
                  {renderStatus(data)}
                </div>
              )
              )}
            </div>
          ))
        ) : (
          <div className="section-payments_items">
            {[...Array(10)].map((_, index) => (
              <div key={index}>
                <h1>
                  <Skeleton width={80} height={10} />
                </h1>
                <p className="detail_count_status">
                  <Skeleton width={80} height={10} />
                  <span>
                    <Skeleton width={80} height={10} />
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
