import postContext from "../context/post/postContext";
import { React, useEffect, useContext } from "react";

const ServicesFront = () => {
  const context = useContext(postContext);
  const { services, getServices } = context;
  useEffect(() => {
    getServices();
    // eslint-disable-next-line
  }, []);
  const ReverseArray = [];
  const length = services.length;
  for (let index = length - 1; index >= 0; index--) {
    ReverseArray.push(services[index]);
  }

  return (
    <>
      {(document.title = "ICTC - Events")}
      <section
        className="ge-section"
        style={{
          marginTop: "5rem",
          marginBottom: "2rem",
          borderRadius: "10px",
          paddingBottom: "3rem",
        }}
      >
        <h1 className="ge-header">Services</h1>
        <div className="underline"></div>
        <div className="ge-container">
          {services.map((event) => {
            return (
              <div key={event._id} className="ge-item">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  style={{ height: "300px", width: "300px" }}
                />
                <p
                  className="ge-title"
                  style={{ marginBottom: "-1rem", fontSize: "25px" }}
                >
                  <b>{event.title}</b>
                </p>
                <p
                  className="ge-title"
                  style={{ marginBottom: "1rem", fontSize: "14px" }}
                >
                  <b>Description: </b>
                  {event.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ServicesFront;
