import React, { useContext, useEffect } from "react";
import { useState } from "react";
import postContext from "../context/post/postContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./customcalendar.css";

// import "react-toastify/dist/ReactToastify.css";
// toast.configure();

export default function ManageCalendar() {
  const context = useContext(postContext);
  const { bookings, unbookdate, bookDate, getBookedDates } = context;
  const [bookedDates, setBookedDates] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    setBookedDates(bookings);
    getBookedDates();
  }, [bookings, getBookedDates]);

  //bookings fetched
  console.log("bookings.bookedDates", bookedDates); //bookings fetched

  const isBookedDate = (date) => {
    const foundDate = bookedDates.find((booking) => booking.date === date);
    if (foundDate) {
      //already formatted date is sent here
      return true; //already booked
    } else {
      return false; //not booked
    }
  };
  const isBookedDateTile = (date) => {
    let dates = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const foundDate = bookedDates.find((booking) => booking.date === dates);
    if (foundDate) {
      //already formatted date is sent here
      return true; //already booked
    } else {
      return false; //not booked
    }
  };
  function getDateIdByValue(date) {
    for (let booking of bookedDates) {
      // let formattedBookings = booking.date.substring(0, 10);
      // const parts = formattedBookings.split("-"); // Split the date into an array of parts
      // formattedBookings = parts.reverse().join("/");
      console.log("inside getdate id ", booking, date, booking._id);

      if (date === booking.date) {
        return booking._id;
      }
    }
    return null; // Return null if the date is not found
  }

  const clickDate = async (date) => {
    console.log("Clicked actual date ", date);
    console.log(
      "clicked",
      date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
    const formatted = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (!isBookedDate(formatted)) {
      console.log("clicked date is not  booked");
      // Date already clicked, remove it from the clickedDates array

      await bookDate(formatted);
    } else {
      // console.log(bookedDates.toDateString());
      // console.log(date.toDateString());
      console.log("clicked date is  booked");
      // Date not clicked, add it to the clickedDates array
      let id = getDateIdByValue(formatted);
      await unbookdate(id);
      // setBookedDates([...bookedDates, date]);
    }
  };

  const tileClassName = ({ date }) => {
    if (isBookedDateTile(date)) {
      return "booked";
    }
    return null;
  };
  return (
    <>
      <div className="bf-row">
        <div className="bf-col-12 manage-container">
          <div className="calendar-container">
            <Calendar
              onClickDay={clickDate}
              tileClassName={tileClassName}
              // formatDay={(locale, date) => dayjs(date).format("YYYY-MM-DD")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
