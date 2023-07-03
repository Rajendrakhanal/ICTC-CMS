import React, { useState } from "react";
import PostContext from "./postContext";

const PostState = (props) => {
  const host = "http://localhost:8000";
  const postsInitial = [];
  const servicesInitial = [];
  const contactsInitial = [];
  const reservationsInitial = [];

  const [posts, setPosts] = useState(postsInitial);
  const [services, setServices] = useState(servicesInitial);
  const [contacts, setContacts] = useState(contactsInitial);
  const [reservations, setReservations] = useState(reservationsInitial);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  //get all posts
  const getPosts = async () => {
    //API call
    setLoading(true);
    const response = await fetch(`${host}/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setLoading(false);
    console.log(json);
    setPosts(json.events);
  };
  //get reserveds/booked
  const getBookedDates = async () => {
    //API call
    setLoading(true);
    const response = await fetch(`${host}/bookedDates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setLoading(false);
    console.log(json);
    setBookings(json.bookeddates);
    return bookings;
  };

  //get all reservations
  const getReservations = async () => {
    //API call
    const response = await fetch(`${host}/reservations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json);
    setReservations(json.reservations);
  };

  //get all contacts
  const getContacts = async () => {
    //API call
    const response = await fetch(`${host}/contacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    setContacts(json.Contacts);
  };

  //get all services
  const getServices = async () => {
    //API call
    const response = await fetch(`${host}/services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json);
    setServices(json.services);
  };

  //Add a post/event
  const addPost = async (
    title,
    type,
    participants,
    instructors,
    organizer,
    description,
    imageUrl
  ) => {
    //API call
    const response = await fetch(`${host}/events/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        type,
        participants,
        instructors,
        organizer,
        description,
        imageUrl,
      }),
    });

    const post = await response.json();
    setPosts(posts.concat(post));
  };

  //Add a service
  const addService = async (
    title,
    description,

    imageUrl
  ) => {
    //API call
    const response = await fetch(`${host}/services/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,

        imageUrl,
      }),
    });

    const service = await response.json();
    setServices(services.concat(service));
    return service;
  };
  //book dates
  const bookDate = async (date) => {
    //API call
    const response = await fetch(`${host}/bookdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
      }),
    });

    const bookingss = await response.json();
    setBookings(bookings.concat(bookingss));
    return bookingss;
  };
  const addContact = async (name, email, message) => {
    //API call
    const response = await fetch(`${host}/contacts/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const contact = await response.json();
    setContacts(contacts.concat(contact));
    return contact;
  };

  //Delete a post
  const deletePost = async (id) => {
    //API call
    const response = await fetch(`${host}/events/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();
    console.log(json);

    // Logic to delete in client
    const newBookedDates = posts.filter((post) => {
      return post._id !== id;
    });
    setPosts(newBookedDates);
  };
  //unbook
  const unbookdate = async (id) => {
    //API call
    const response = await fetch(`${host}/unbookdate/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();
    console.log(json);

    // Logic to delete in client
    const newBookedDates = bookings.filter((bookings) => {
      return bookings._id !== id;
    });
    setBookings(newBookedDates);
  };

  //Delete a reservation
  const deleteReservation = async (id) => {
    //API call
    const response = await fetch(`${host}/reservations/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();
    console.log(json);

    // Logic to delete in client
    const newReservations = reservations.filter((reservation) => {
      return reservation._id !== id;
    });
    setReservations(newReservations);
  };

  //Delete a contact
  const deleteContact = async (id) => {
    //API call
    const response = await fetch(`${host}/contacts/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();
    console.log(json);

    // Logic to delete in client
    const newContacts = contacts.filter((contact) => {
      return contact._id !== id;
    });
    setContacts(newContacts);
  };

  //Delete a service
  const deleteService = async (id) => {
    //API call
    const response = await fetch(`${host}/services/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();
    console.log(json);

    // Logic to delete in client
    const newServices = services.filter((service) => {
      return service._id !== id;
    });
    setServices(newServices);
  };

  //Edit a post
  const editPost = async (
    id,
    title,
    type,
    instructors,
    participants,
    organizer,
    description
  ) => {
    //API call
    const response = await fetch(`${host}/events/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        type,
        instructors,
        participants,
        organizer,
        description,
      }),
    });
    const json = response.json();
    console.log(json);

    //Logic to edit in client
    for (let index = 0; index < posts.length; index++) {
      const element = posts[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.instructors = instructors;
        element.participants = participants;
        element.type = type;
        element.organizer = organizer;
      }
    }
  };

  return (
    <PostContext.Provider
      value={{
        loading,
        posts,
        services,
        contacts,
        reservations,
        bookings,
        setContacts,
        setPosts,
        setServices,
        addPost,
        addService,
        addContact,
        deletePost,
        deleteService,
        deleteContact,
        deleteReservation,
        editPost,
        getPosts,
        getServices,
        getContacts,
        getReservations,
        getBookedDates,
        bookDate,
        unbookdate,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
