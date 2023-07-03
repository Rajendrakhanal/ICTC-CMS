import React, { useContext,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import postContext from "../context/post/postContext";

const DetailEvents = () => {
  const { id } = useParams();
  const context = useContext(postContext);
  const { posts } = context;
  const post = posts.find((post) => post._id === id);
  const navigate = useNavigate();
  console.log(post)
  useEffect(() => {
    if (!post) {
        navigate("/events");
      }
      // eslint-disable-next-line
    }, []);
   const handlebutton=()=>{
        navigate('/events')
    }
  

  return (
    <>
    {post &&  <div className="container" style={{backgroundColor:"white"}}>
    <div
            style={{ display: "flex", justifyContent: "space-around"  , marginTop:"4rem",paddingLeft:"3rem", paddingTop:"3rem",paddingBottom:"3rem"}}
          >
            <div><img src={post.imageUrl} alt={post.title} style={{height:"500px", width:"530px"}}/></div>
            <div ><p className="ge-title" style={{marginBottom:"1rem",fontSize:"35px"}}><b>Title: </b>{post.title}</p>
            <hr></hr>
                <p className="ge-title" style={{marginBottom:"1rem",fontSize:"18px"}}><b>Type: </b>{post.type}</p>
                <p className="ge-title" style={{marginBottom:"1rem",fontSize:"18px"}}><b>No. Of Instructors: </b>{post.instructors}</p>
                <p className="ge-title" style={{marginBottom:"1rem",fontSize:"18px"}}><b>No. Of Participants: </b>{post.participants}</p>
                <p className="ge-title" style={{marginBottom:"1rem",fontSize:"18px"}}><b>Organizer: </b>{post.organizer}</p>
                <p className="ge-title" style={{fontSize:"18px"}}><b>Description: </b>{post.description}</p>
                <p className="card-text" style={{fontSize:"18px"}}>
                
                  <small className="text-muted" style={{fontSize:"16px"}}>
                    <b>By </b>{post.organizer ? post.organizer : "Unknown"}
                    &nbsp;<b>on</b> {new Date(post.date).toGMTString()}
                  </small>
                  </p>
                  <button style={{marginTop:"2rem"}} className="submit" onClick={handlebutton}>Back to Events</button>
                </div>
            
               
                </div>
              </div>
              }
  </>
    
  );
};

export default DetailEvents;
