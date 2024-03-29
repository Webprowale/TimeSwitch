import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function App() {
  const [link, setLink] = useState("");
  const [disable, setDisable] = useState(false);
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");
 const getDate = new Date().getFullYear();
  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes, seconds };
  };

  const startTimer = (endTime) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(endTime);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      clearInterval(Ref.current);
      window.open(link, "_blank");
    }
  };

  const clearTimer = (endTime) => {
    setTimer("00:05:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(endTime);
    }, 1000);
    Ref.current = id;
  };

  const getEndTime = () => {
    let deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + 5);
    return deadline;
  };
  const handlePlay = ()=>{
    clearTimer(getEndTime());
  }

  const handleChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimer(getEndTime());
    setDisable(true)
    
  };

  return (
    <>
    <div className="container-fluid d-flex flex-column pt-5 align-items-center px-2 py-3" style={{height: '90vh'}}>
      <h1 className="text-info fs-1 fw-bold mb-5">
        Time<span className="text-black">Switch</span>
      </h1>
      <p className="fw-semibold">Auto open tab in five minutes</p>
      <h3 className="text-info fs-4 fw-semibold">{timer}</h3>
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center rounded shadow mb-3"
        style={{ maxWidth: "20rem" }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Enter Link..."
          value={link}
          onChange={handleChange}
        />
        <input type="submit" className="btn btn-info fw-semibold" />
      </form>
      {disable ? (
        <button
          className="btn btn-info rounded-circle p-2"
          style={{
            width: "4rem",
            height: "4rem",
          }}
          onClick={handlePlay}
        >
            <i className="fa-solid fa-play fs-1"></i>
        </button>
      ) : (
        ""
      )}
      </div>
    <div className="footer mb-0 ms-5">
     <p className="fs-5 fw-semibold">&copy;{getDate} <Link className="text-info fw-semibold" style={{ textDecoration: 'none'}} to='https://webprowale.netlify.app/' target="_blank">Webprowale</Link></p>
    </div>
    </>
    
  );
}

export default App;
