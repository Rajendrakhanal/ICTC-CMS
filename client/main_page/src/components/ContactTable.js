import React, { useContext } from "react";
import postContext from "../context/post/postContext";

export default function ContactTable(props) {
  const context = useContext(postContext);
  const { deleteContact } = context;

  const { contact } = props;
  const styles = { fontSize: "18px", marginTop: "1rem", marginLeft: "-0rem" };
  return (
    <div className="container" style={{ marginBottom: "1rem" }}>
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
                  marginBottom: "-1px",
                  marginLeft: "-0rem",
                }}
                className="card-title"
              >
                <b>Name: </b>
                {contact.name}
              </p>
            </div>

            <div>
              <i
                style={{ cursor: "pointer" }}
                className="fa fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteContact(contact._id);
                }}
              ></i>
            </div>
          </div>
          <p style={styles} className="card-title">
            <b>Email: </b>
            {contact.email}
          </p>

          <p style={styles} className="card-text">
            <b>Message: </b>
            {contact.message}
          </p>
          <p style={styles} className="card-text">
            <small
              style={{
                fontSize: "12px",
                marginTop: "1rem",
                marginLeft: "-0rem",
              }}
              className="text-muted"
            >
              <b>Published On: </b>
              {new Date(contact.date).toGMTString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}
