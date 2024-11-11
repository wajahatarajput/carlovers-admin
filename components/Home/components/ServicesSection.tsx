import React from 'react';

interface Service {
  icon: string;
  title: string;
  delay: number;
}

export const ServicesSection: React.FC = () => {
  // Define the services array
  const services: Service[] = [
    { icon: "ri-store-line", title: "Fluid Check", delay: 50 },
    { icon: "ri-bar-chart-box-line", title: "Oil Change", delay: 100 },
    { icon: "ri-calendar-todo-line", title: "Air filter replacement", delay: 150 },
    { icon: "ri-paint-brush-line", title: "Tire Pressure Check", delay: 200 },
    { icon: "ri-database-2-line", title: "Tire Rotation and Balancing", delay: 250 },
    { icon: "ri-gradienter-line", title: "Radiator Inspection", delay: 300 },
    { icon: "ri-file-list-3-line", title: "Air Conditioning Inspection", delay: 350 },
    { icon: "ri-price-tag-2-line", title: "Brake Fluid", delay: 400 }
  ];

  const steps: string[] = [
    "Create a Car Lovers account using the app or the website.",
    "Open the app or go to the website and select 'Create New Account' as a car owner.",
    "Input your profile information and click continue.",
    "Check your email for a verification link from Car Lovers and verify your email address.",
    "Log in with your username and password.",
    "Enter your bank information for default payment of future services.",
    "Add the vehicles you want to maintain.",
    "Select the optional Maintenance Package for any or all of your cars if desired.",
    "Optionally, select a driver if you do not want to take your vehicle to the shop yourself.",
    "Choose the interval for shop visits: 3 or 6 months.",
    "Set up an appointment at the mechanic shop of your choice.",
    "Take your car to the mechanic for the first visit for a full inspection and any necessary work.",
    "The shop will notify you of any further work needed and get your approval before proceeding.",
    "Billing is handled through the app or website. Car Lovers will handle payment for covered services if you have the Maintenance Package.",
    "At every 3 or 6-month interval, bring your car to the shop to ensure it remains in great shape.",
    "A full history of your car's visits to the shop will be available on the apps or website."
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Services</h2>
          <p>Check The Services</p>
        </div>

        <div className="row" data-aos="fade-left">
          {services.map((service, index) => (
            <div key={index} className={`col-lg-3 col-md-4 ${index >= 1 ? 'mt-4' : ''}`}>
              <div className="icon-box" data-aos="zoom-in" data-aos-delay={service.delay}>
                <i className={service.icon} style={{ color: "#a64bf4" }}></i>
                <h3>{service.title}</h3>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <div className="section-title" data-aos="fade-up">
          <h2>Our Services</h2>
          <p>Follow these steps to receive the services offered by Car Lovers LLC.</p>
        </div>
        <div className="row">
          {steps.map((text, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 icon-box">
                <div className="card-body">
                  <h5 className="card-title">Step {index + 1}</h5>
                  <hr />
                  <p className="card-text">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
