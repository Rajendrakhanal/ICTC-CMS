import {services} from "../data"


const Services = () => {
  return (
    <>
      <section className="services">
        <h4 className="services_title">Our Features</h4>
        <div className="underline"></div>
        <div className="flex-services">
          {services.map((service) => {
            const { id, title, icon, text } = service;
            return (
              <div key={id} className='flex-item-services'>
                <h4 className="type">{title}</h4>
                <p className="icon-services">{icon}</p>
                <p className="description">{text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Services;
