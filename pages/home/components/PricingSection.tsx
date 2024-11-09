import React, { useState } from 'react';
import Link from 'next/link';

const PricingSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <section id="pricing" className="pricing">
                <div className="container my-5">
                    <div className="section-title" data-aos="fade-up">
                        <h2>Pricing</h2>
                        <p>Flexible pricing options to ensure your car gets the best care.</p>
                    </div>
                    <div className="row gap-5 text-center justify-content-center">
                        <div className="col-md-4 mb-4 card p-5">
                            <h5>Service Intervals</h5>
                            <p>
                                You can choose to bring your car to the shop every 3 or 6 months. If you opt to use a Car Lovers driver, they will be compensated $50 at every 3-month interval or $100 at every 6-month interval.
                            </p>
                        </div>
                        {/* Additional pricing cards go here */}
                    </div>
                    <p className="text-center text-muted">
                        Note: Shops will not begin work on your car without your approval.
                    </p>
                </div>

                <div className="container">
                    <div className="section-title" data-aos="fade-up">
                        <h2>Subscriptions</h2>
                        <p>Check our Subscription Plans</p>
                    </div>
                    {/* Subscription plans go here */}
                </div>
            </section>

            <section id="pricing" className="pricing">
                <div className="container">
                    <div className="section-title" data-aos="fade-up">
                        <h2>Contract</h2>
                        <p>Check our Maintenance Contract</p>
                    </div>
                    <div className="row justify-content-center" data-aos="fade-left">
                        <div className="col-lg-3 col-md-6">
                            <div className="box" data-aos="zoom-in" data-aos-delay="100">
                                <h3>
                                    Business{" "}
                                    <button
                                        className="fa fa-question-circle text-gray-300 mb-3 text-align-right btn btn-outline-secondary border-0 mr-auto rounded-pill"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="bottom"
                                        onClick={toggle}
                                    ></button>
                                </h3>
                                <h4>
                                    <span style={{ color: "black" }}>
                                        <b>3 Months / $265</b>
                                    </span>
                                </h4>
                                {/* Contract details */}
                            </div>
                        </div>

                        {/* Modal for contract details */}
                        {isOpen && (
                            <div className="modal show" tabIndex={-1} style={{ display: 'block' }} onClick={toggle}>
                                <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Maintenance Contract Information</h5>
                                            <button type="button" className="btn-close" onClick={toggle}></button>
                                        </div>
                                        <div className="modal-body">
                                            <section id="pricing" className="pricing">
                                                <div className="container">
                                                    <div className="row justify-content-center" data-aos="fade-left">
                                                        <ul>
                                                            <li>No Service Amount as per charges of 14% of total service amount.</li>
                                                            <small>
                                                                <ol className="box rounded p-3 mb-2">
                                                                    Note: Only the services listed below are covered
                                                                    in Maintenance Contract. <hr />
                                                                    <li>Brake pads and rotors</li>
                                                                    <li>Oil changes</li>
                                                                    {/* Additional covered services */}
                                                                </ol>
                                                            </small>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default PricingSection;
