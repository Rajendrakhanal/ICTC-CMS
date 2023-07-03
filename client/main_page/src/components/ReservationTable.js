import React, { useContext } from "react";
import postContext from "../context/post/postContext";

const ReservationTable = (props) => {
  const context = useContext(postContext);
  const { deleteReservation } = context;

  const { reservation } = props;
  const styles = { fontSize: "18px", marginTop: "1rem", marginLeft: "-0rem" };
  return (
    <div className="container">
      <div className="card my-3">
        <div className="card-body">
          <div
            className="align-items-center"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <p
                style={{
                  fontSize: "20px",
                  marginTop: "1rem",
                  marginBottom: "-1px",
                  marginLeft: "-0rem",
                }}
                className="card-title"
              >
                <b>Name: </b>
                {reservation.name}
              </p>
            </div>
            <div>
              <i
                style={{ cursor: "pointer" }}
                className="fa fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteReservation(reservation._id);
                }}
              ></i>
            </div>
          </div>
          <p style={styles} className="card-title">
            <b>Email: </b>
            {reservation.email}
          </p>

          <p style={styles} className="card-text">
            <b>Message: </b>
            {reservation.message}
          </p>
          <p style={styles} className="card-text">
            <small
              style={{
                fontSize: "12px",
                marginTop: "-1rem",
                marginLeft: "-0rem",
              }}
              className="text"
            >
              <b>Date Reserved: (DD/MM/YY) </b>
              {reservation.date}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationTable;
