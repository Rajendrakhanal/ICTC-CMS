import postContext from "../context/post/postContext";
import { React, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const context = useContext(postContext);
  const { posts, getPosts } = context;
  useEffect(() => {
  getPosts();
    // eslint-disable-next-line
  }, []);
  const navigate = useNavigate();
    const Redirectdetail=(id)=>{
        navigate('/empdetails/'+id)
    }
  const ReverseArray = [];
  const length = posts.length;
  for (let index = length - 1; index >= 0; index--) {
    ReverseArray.push(posts[index]);
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
          paddingBottom:"3rem"
        }}
      >
        <h1 className="ge-header">Events</h1>
        <div className="underline"></div>
        <div className="ge-container">
          {posts.map((event) => {
            return (
              <div key={event._id} className="ge-item">
               <img onClick={()=>{Redirectdetail(event._id)}} src={event.imageUrl} alt={event.title} style={{height:"300px", width:"300px"}}/>
                <p className="ge-title" style={{marginBottom:"-1rem",fontSize:"25px"}}><b>{event.title}</b></p>
                <p className="ge-title" style={{marginBottom:"1rem",fontSize:"14px"}}><b>Type: </b>{event.type}</p>
                <p className="card-text" style={{fontSize:"12px"}}>
                  <small className="text-muted">
                    <b>By </b>{event.organizer ? event.organizer : "Unknown"}
                    &nbsp;<b>on</b> {new Date(event.date).toGMTString()}
                  </small>
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Events;
