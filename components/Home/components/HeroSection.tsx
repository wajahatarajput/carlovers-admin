import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import hero from "../assets/images/hero.png";

export const HeroSection: React.FC = () => {
    return (
        <section id="hero">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">
                        <div data-aos="zoom-out">
                            <h1>
                                Only <span>CarLovers.com</span> gives you complete peace of
                                mind.
                            </h1>
                            <h2>Our services include:</h2>
                            <ul className="text-light">
                                <li>
                                    <i className="bi bi-check"></i> A Carlovers driver can take your car into shops to get maintenance done.
                                </li>
                                <li>
                                    <i className="bi bi-check"></i> You can take your car in also. It’s your choice.
                                </li>
                                <li>
                                    <i className="bi bi-check"></i> Let Carlovers take care of what your car needs. You can rest knowing that Carlovers will help maintain your car.
                                </li>
                                <li>
                                    <i className="bi bi-check"></i> Carlovers keeps all the history of work & maintenance done.
                                </li>
                                <li>
                                    <i className="bi bi-check"></i> You can choose between 3 months or 6 months increment that your car will go to a shop.
                                </li>
                                <li>
                                    <i className="bi bi-check"></i> Optionally going for a popular “Maintenance Package” means the most common maintenance and repairs will be paid automatically from Carlovers. You just pay a monthly fee to enable this service.
                                </li>
                                <li>
                                    <i className="bi bi-check"></i> You can see a list of covered work, maintenance, and other information of this package here. And you can also get a free steering wheel lock if you sign up for this option.
                                </li>
                            </ul>
                            <div className="text-center text-lg-start">
                                <Link href="/authenticate">
                                    <button className="btn-get-started scrollto shadow-lg">
                                        Sign Up
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div
                        className="col-lg-4 order-1 order-lg-2 hero-img"
                        data-aos="zoom-out"
                        data-aos-delay="300"
                    >
                        <Image
                            src={hero}
                            className="img-fluid animated"
                            alt="Hero Image"
                            layout="responsive"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

