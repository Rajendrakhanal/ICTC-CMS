import React from "react";
import people from "../data";


const Team = () => {
  return (
    <article className="team_main">
      <h4 className="TeamTitle">Our Team</h4>
      <div className="underline"></div>
      <div className="flex-team">
        {people.map((person) => {
          const { id, image, name, job } = person;
          return (
            <>
              <div key={id} className="flex-item-team">
                <img src={image} alt={name} className="person-img" />
                <h2 className="author">{name}</h2>
                <p className="job">{job}</p>
              </div>
            </>
          );
        })}
      </div>
    </article>
  );
};

export default Team;
