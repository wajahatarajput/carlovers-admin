import React from 'react';
import Image from 'next/image'; // Importing Next.js Image component

export const ProcessSection: React.FC = () => {
    return (
        <section id="details" className="details">
            <div className="container">
                <div className="row content">
                    <div className="col-md-4" data-aos="fade-right">
                        <Image
                            src="/assets/img/images/details-1.png"
                            className="img-fluid"
                            alt="Car Inspection Process"
                            width={500} // Adjust width based on your design
                            height={300} // Adjust height based on your design
                        />
                    </div>
                    <div className="col-md-8 pt-4" data-aos="fade-up">
                        <h3>Our Process.</h3>
                        <ul>
                            <li>
                                <i className="bi bi-check"></i> You and a Carlovers-trusted
                                member will schedule a good time and date in which to have
                                your car inspected.
                            </li>
                            <li>
                                <i className="bi bi-check"></i> Before that time on that day
                                for the car to be inspected, you and the member will meet.
                                The owner of the car, you, will hand over the keys of the
                                vehicle to the member, so that the car is taken to an
                                agreed-upon, local auto shop to get that inspection done.
                            </li>
                            <li>
                                <i className="bi bi-check"></i> Once the inspection is
                                finished, your vehicle may need some kind of service or
                                maintenance. At that point, the shop will explain the
                                services needed, and the member will make a note of these
                                services in the app or on the web.
                            </li>
                            <li>
                                <i className="bi bi-check"></i> The member or shop agent
                                will notify you, the owner, of what needs to be done.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row content">
                    <div className="col-md-4 order-1 order-md-2" data-aos="fade-left">
                        <Image
                            src="/assets/img/images/details-2.png"
                            className="img-fluid"
                            alt="Car Maintenance Process"
                            width={500} // Adjust width based on your design
                            height={300} // Adjust height based on your design
                        />
                    </div>
                    <div
                        className="col-md-8 pt-5 order-2 order-md-1"
                        data-aos="fade-up"
                    >
                        <ul>
                            <li>
                                <i className="bi bi-check"></i> If you agree to the
                                services, the shop will work on your car that day or have to
                                reschedule for a later time and date.
                            </li>
                            <li>
                                <i className="bi bi-check"></i> If the shop finishes the
                                work that day, you will be billed before or after the work
                                starts.
                            </li>
                            <li>
                                <i className="bi bi-check"></i> If the shop reschedules,
                                then you and the Carlovers member will repeat the steps to
                                get the job done. Different times and date.
                            </li>
                            <li>
                                <i className="bi bi-check"></i> In addition to the total the
                                shop bills to you, the Carlovers service will charge 14% of
                                the total upon each service along with Subscription charges
                                you choose, and the member will receive a charge of 7% of
                                the shop total bill. For example, if your car needs new
                                shocks and struts, a basic oil change, and tire rotation and
                                wheel rebalancing, the cost will be broken down like this.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};