import React, { useContext, useEffect } from "react";
import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
// import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import postContext from "../context/post/postContext";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Stack } from "@mui/material";

export default function Reservation() {
  let bookedDatesFinal;
  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");
  const context = useContext(postContext);
  const { reservations, getReservations, getBookedDates, bookings } = context;
  const Navigate = useNavigate();

  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });
  const [bookedDates, setBookedDates] = useState([]);
  useEffect(() => {
    getReservations();
    getBookedDates();
    setBookedDates(bookings);
    // eslint-disable-next-line
  }, []);

  console.log(bookedDates);
  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setReservation({
      ...reservation,
      [name]: value,
    });

    if (name === "date" && value) {
      setReservation({
        ...reservation,
        date: value,
      });
    }
  };

  const isBooked = (date) => {
    console.log("inside is booked");
    const formattedDate = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    // const dateString = date.toISOString().split("T")[0];

    const dateslist = bookedDates.map((bookings) => {
      return bookings.date;
    });
    return dateslist.includes(formattedDate);
  };
  console.log(bookedDatesFinal);
  console.log(reservation);
  const reservePost = async (e) => {
    console.log("reserving");
    e.preventDefault();
    let { name, email, date, message } = reservation;
    let res = await fetch("http://localhost:8000/reservations/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        date,
      }),
    });
    let resJson = await res.json();

    if (resJson.errors && resJson.errors.length > 0) {
      resJson.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
    if (resJson.result) {
      toast.success("Reservation Successful");
      Navigate("/login");
    }
  };
  const reservedDates = reservations.map((record) =>
    moment(record.date).format("YYYY-MM-DD")
  );

  const allDates = [];
  const startDate = moment(); // start with today's date
  const endDate = moment().add(1, "year"); // end after 1 year from today

  // loop to generate an array of all dates for one year
  while (startDate.isBefore(endDate)) {
    allDates.push(startDate.format("YYYY-MM-DD"));
    startDate.add(1, "day");
  }

  // filter out the reserved dates to get the non-reserved dates
  const nonReservedDates = allDates.filter(
    (date) => !reservedDates.includes(date)
  );

  const isReserved = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return nonReservedDates.includes(formattedDate);
  };

  const placeholderText = () => {
    return reservation.date
      ? moment(reservation.date).format("YYYY-MM-DD")
      : "Select a date";
  };
  return (
    <>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      {(document.title = "ICTC - Reservation")}
      <div className="pages-bg" style={{ marginTop: "-6rem" }}>
        <div className="bf-container">
          <div className="bf-body">
            <div className="bf-head" style={{ marginBottom: "-2rem" }}>
              <h1 className="h1">Reservation Form</h1>
            </div>
            <form className="bf-body-box" method="POST">
              <div className="bf-row">
                <div className="bf-col-6">
                  <p className="p-reservation">Your Name</p>
                  <input
                    className="input"
                    type="textarea"
                    name="name"
                    id="name"
                    value={reservation.name}
                    onChange={inputHandler}
                    placeholder="Your Name"
                  />
                </div>
                <div className="bf-col-6">
                  <p className="p-reservation">Email Address</p>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    id="email"
                    value={reservation.email}
                    onChange={inputHandler}
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <div className="bf-row">
                <div className="bf-col-12">
                  <p className="p-reservation">Select Date</p>
                  {/* <DateTimePicker
                    value={reservation.date}
                    onChange={(date) =>
                      inputHandler({ target: { name: "date", value: date } })
                    }
                    isClockOpen=false
                    minDate={moment().toDate()}
                    placeholder="Choose Date"
                  /> */}
                  <DemoContainer components={["DateTimePicker"]}>
                    <DatePicker
                      label="Choose date"
                      disablePast
                      value={reservation.date}
                      defaultValue={tomorrow}
                      shouldDisableDate={isBooked}
                      onChange={(date) =>
                        inputHandler({ target: { name: "date", value: date } })
                      }
                    />
                  </DemoContainer>
                </div>
              </div>

              <div className="bf-row">
                <div className="bf-col-12">
                  <p className="p-reservation">Messages</p>
                  <textarea
                    className="textarea"
                    name="message"
                    id="message"
                    value={reservation.message}
                    onChange={inputHandler}
                    cols="10"
                    rows="2"
                  ></textarea>
                </div>
              </div>

              <div className="bf-row">
                <div className="bf-col-3">
                  <button
                    className="submit"
                    type="button"
                    onClick={reservePost}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </LocalizationProvider> */}
    </>
  );
}
