import "./style.css";
import { useState } from "react";
import postContext from "../context/post/postContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const context = useContext(postContext);
  const { addContact } = context;
  const [cont, setCont] = useState({
    name: "",
    email: "",
    message: "",
  });
  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCont({
      ...cont,
      [name]: value,
    });
    console.log(cont);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let resJson = await addContact(cont.name, cont.email, cont.message);

    if (resJson.errors && resJson.errors.length > 0) {
      resJson.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
    if (resJson.result) {
      toast.success("Reservation Successful");
      setCont({ name: "", email: "", message: "" });
    }
  };

  return (
    <>
      {(document.title = "ICTC - Contact")}

      <section
        className="ge-section"
        style={{ marginTop: "7rem", borderRadius: "20px" }}
      >
        <div className="contact-container" style={{ marginTop: "-1rem" }}>
          <h1 className="ge-header">Contact</h1>
          <div className="underline"></div>
          <form method="POST">
            <label className="con" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              onChange={inputHandler}
              value={cont.name}
            ></input>

            <label className="con" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Your email"
              onChange={inputHandler}
              value={cont.email}
            ></input>

            <label className="con" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write something.."
              style={{ height: "100px" }}
              onChange={inputHandler}
              value={cont.message}
            ></textarea>

            <button className="submit" type="button" onClick={handleClick}>
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
