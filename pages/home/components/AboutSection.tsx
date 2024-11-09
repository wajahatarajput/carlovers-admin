import React from 'react';
import Link from 'next/link';


const AboutSection: React.FC = () => {
    return (
        <section id="about" className="about">
            <div className="container my-5">
                <div className="section-title" data-aos="fade-up">
                    <h2>About Carlovers</h2>
                    {/* <p>Check The Services</p> */}
                </div>
                <p className="lead text-center">
                    Car Lovers LLC offers a convenient and reliable service for maintaining your vehicle. With options for 3 or 6-month intervals, you can ensure your car stays in top condition without the hassle.
                </p>
                <div className="row gap-5 text-center justify-content-center">
                    <div className="col-md-4 mb-4 card p-5">
                        <h5>Convenient Service</h5>
                        <p>
                            Our service allows you to either bring your car to the shop yourself or designate a family member, relative, or a Car Lovers driver. If you choose a Car Lovers driver, they will receive $50 for every 3-month interval or $100 for every 6-month interval.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4 card p-5">
                        <h5>Transparent Pricing</h5>
                        <p>
                            After the shop completes the work, an invoice will be generated which includes a 15% Car Lovers fee and, if applicable, a 10% driver's fee. The Car Lovers fee helps maintain our platform and cover internal company expenses.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4 card p-5">
                        <h5>Maintenance Package</h5>
                        <p>
                            With the Maintenance Package, you pay a monthly fee, and the shop bills Car Lovers directly for covered services up to the average cost of each service. Any excess amount, including the 15% Car Lovers fee and 10% driver's fee, will be billed to you.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4 card p-5">
                        <h5>Easy Enrollment</h5>
                        <p>
                            Interested in the Maintenance Package? Go to the section that lists your cars, click on a car, and add the Maintenance Package to see the current monthly fee.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="section-title" data-aos="fade-up">
                    <h2>About Us</h2>
                    {/* <p>Check The Services</p> */}
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div
                        className="col-xl-5 col-lg-5 video-box d-flex justify-content-center align-item-start"
                        data-aos="fade-right"
                    >
                        <img
                            src="/assets/img/images/about.png"
                            className="rounded mx-auto d-block mb-4"
                            style={{ height: "300px" } as React.CSSProperties}
                            data-vbtype="image"
                            alt="CarLovers"
                        />
                    </div>

                    <div
                        className="col-xl-7 col-lg-7 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5"
                        data-aos="fade-left"
                    >
                        <h3>New to Carlovers.com? </h3>
                        <p>
                            Simple as it seems, no other website offers the services that
                            we have. We come to you to maintain your vehicle, offer
                            rebates for some services, and help you stay on top of future
                            maintenance your car needs. Busy life, no problem. That is
                            what we do! Don't forget to sign up for a 3 or 6-month
                            subscription to get full benefits and to keep your vehicles in
                            good shape.
                        </p>

                        <div
                            className="icon-box"
                            data-aos="zoom-in"
                            data-aos-delay="100"
                        >
                            <div className="icon">
                                <i className="bx bx-fingerprint"></i>
                            </div>
                            <h4 className="title">
                            <Link href="#">What We Do For You</Link>

                            </h4>
                            <p className="description">
                                Just create your membership on the android or iOS app or on
                                the website, add your vehicle, and ask for your vehicle to
                                be serviced. From there, a Carlovers member will handle the
                                scheduling to take your car into an auto shop near you for
                                inspections, maintenance, or other services. You authorize
                                any work done. That's all you have to do. Then, your car
                                will stay in tip-top shape.
                            </p>
                        </div>

                        <div
                            className="icon-box"
                            data-aos="zoom-in"
                            data-aos-delay="200"
                        >
                            <div className="icon">
                                <i className="bx bx-gift"></i>
                            </div>
                            <h4 className="title">
                                <Link href="#">
                                    Car Lovers, LLC is an LLC company formed in January, 2022
                                    and currently headquartered in Albuquerque, NM.
                                </Link>
                            </h4>
                            <p className="description">
                                Car Lovers sole purpose is to bring you an easy way to keep
                                your cars in good shape. As soon as you create an account on
                                Carlovers.com, or on the app, you will have a chance to add
                                all of your vehicles to be serviced. Once added, you can
                                enable the service for a particular vehicle. Once enabled, a
                                member of Carlovers.com will call, text, or email you
                                regarding what will happen next.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
