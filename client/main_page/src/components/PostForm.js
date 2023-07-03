import React, { useContext, useState } from "react";
import postContext from "../context/post/postContext";
import ImageUploader from "./ImageUrl";

export default function PostForm(props) {
  const [imageUrl1, setImageUrl1] = useState("");
  const context = useContext(postContext);
  const { addPost } = context;
  const[clicked,setClicked]=useState(false);

  const [post, setPost] = useState({
    title: "",
    type: "",
    participants: "",
    instructors: "",
    organizer: "",
    description: "",
    imageUrl: "",
  });
  const dataFromChild = (data) => {
    setImageUrl1(data);
  };

  const handleClick = (e) => {
    setClicked(true);
    e.preventDefault();
    addPost(
      post.title,
      post.type,
      post.participants,
      post.instructors,
      post.organizer,
      post.description,
      imageUrl1
    );
    setPost({
      title: "",
      type: "",
      participants: "",
      instructors: "",
      organizer: "",
      description: "",
    });
    props.showAlert("New Post Has been Added", "success");

  };

  const handleChange = (e) => {
    setClicked(false);
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  return (
    <div className="bg-white container rounded">
      <div className="mt-3 container">
        <br></br>
        <div className="text-center">
          <span
            style={{
              backgroundColor: "#00028d",
              borderRadius: "5px",
              fontSize: "2rem",
              color: "white",
              paddingRight: "1rem",
              paddingLeft: "1rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
            className="mb-2"
          >
            Fill Event Detail
          </span>
        </div>
        <hr></hr>
        <form>
          <div className="row g-3 mb-2">
            <div className="col">
              <label htmlFor="title" className="form-label mx-2">
                Event Title
              </label>
              <input
                type="text"
                onChange={handleChange}
                minLength={3}
                required
                className="form-control"
                value={post.title}
                id="title"
                name="title"
              />
            </div>
            <div className="col">
              <label htmlFor="type" className="form-label mx-2">
                Event Type
              </label>
              <input
                type="text"
                onChange={handleChange}
                minLength={3}
                required
                className="form-control"
                value={post.type}
                id="type"
                name="type"
              />
            </div>
          </div>

          <div className="row g-3 mb-2">
            <div className="col">
              <label htmlFor="instructors" className="form-label mx-2">
                Number Of Instructor
              </label>
              <input
                type="number"
                onChange={handleChange}
                className="form-control"
                id="instructors"
                value={post.instructors}
                name="instructors"
              />
            </div>
            <div className="col">
              <label htmlFor="participants" className="form-label mx-2">
                No. of Participants
              </label>
              <input
                type="number"
                onChange={handleChange}
                className="form-control"
                id="participants"
                value={post.participants}
                name="participants"
              />
            </div>
          </div>
          <div className="row g-3 mb-2">
            <div className="col" style={{marginTop:"1.7rem"}}>
            <p style={{marginTop:"2px"}}> Upload an image </p>
            <ImageUploader dataFromChild={dataFromChild} clicked={clicked}/>
            </div>
            
          <div className="col" style={{marginTop:"1.5rem"}}>
            <label htmlFor="organizer" className="form-label mx-2"  >
              Organizer
            </label>
            <input style={{marginTop:"-1px"}}
              type="text"
              onChange={handleChange}
              minLength={3}
              required
              className="form-control"
              id="organizer"
              value={post.organizer}
              name="organizer"
            />
          </div>
          </div>

          <div className=" mb-2">
            <label htmlFor="description" className="form-label mx-2">
              Description
            </label>
            <textarea
              className="form-control"
              onChange={handleChange}
              minLength={5}
              required
              id="description"
              value={post.description}
              name="description"
              rows="3"
            ></textarea>
          </div>
          

          <button
            style={{
              backgroundColor: "#00028d",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            disabled={post.title.length < 3 || post.description.length < 5}
            className="btn btn-primary mt-2"
            onClick={handleClick}
            type="submit"
          >
            Submit
          </button>
          <hr></hr>
        </form>
      </div>
    </div>
  );
}
