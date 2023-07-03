import React, { useContext } from "react";
import postContext from "../context/post/postContext";

export default function ServiceTable(props) {
  const context = useContext(postContext);
  const { deleteService } = context;

  const { service } = props;
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
                  fontSize: "24px",
                  marginBottom: "-2.5rem",
                  marginLeft: "-0rem",
                }}
                className="card-title"
              >
                <b>Service Title: </b>
                {service.title}
              </p>
            </div>

            <div>
              <i
                style={{ cursor: "pointer" }}
                className="fa fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteService(service._id);
                }}
              ></i>
            </div>
          </div>
          <div
            className="align-items-center"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ marginTop: "-4rem" }}>
              <p
                style={{
                  fontSize: "18px",
                  marginTop: "1rem",
                  marginLeft: "-0rem",
                }}
                className="card-text"
              >
                <b>Description: </b>
                {service.description}
              </p>
            </div>
            <div>
              <img
                src={service.imageUrl}
                alt="im"
                style={{ height: "250px", width: "320px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
