import React, { useState } from 'react';

export const FAQSection: React.FC = () => {
    const [activeFAQ, setActiveFAQ] = useState<string | null>(null);

    const handleToggle = (faqId: string) => {
        setActiveFAQ(prevState => (prevState === faqId ? null : faqId));
    };

    return (
        <section id="faq" className="faq section-bg">
            <div className="container">
                <div className="section-title" data-aos="fade-up">
                    <h2>F.A.Q</h2>
                    <p>Frequently Asked Questions</p>
                </div>

                <div className="faq-list">
                    <ul>
                        <li data-aos="fade-up">
                            <i className="bx bx-help-circle icon-help"></i>{" "}
                            <a
                                href="#faq-list-1"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleToggle('faq-list-1');
                                }}
                                className={activeFAQ === 'faq-list-1' ? '' : 'collapsed'}
                            >
                                How do I subscribe for service?{" "}
                                <i className="bx bx-chevron-down icon-show"></i>
                                <i className="bx bx-chevron-up icon-close"></i>
                            </a>
                            <div
                                id="faq-list-1"
                                className={`collapse ${activeFAQ === 'faq-list-1' ? 'show' : ''}`}
                            >
                                <p>
                                    When you add a car in your account, you get the option to
                                    select the subscription based on your preference. Each car
                                    has a separate subscription, so you can subscribe for each
                                    car and its services differently based on your need.
                                </p>
                            </div>
                        </li>

                        <li data-aos="fade-up" data-aos-delay="100">
                            <i className="bx bx-help-circle icon-help"></i>{" "}
                            <a
                                href="#faq-list-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleToggle('faq-list-2');
                                }}
                                className={activeFAQ === 'faq-list-2' ? '' : 'collapsed'}
                            >
                                How do I become a CarLovers Member?{" "}
                                <i className="bx bx-chevron-down icon-show"></i>
                                <i className="bx bx-chevron-up icon-close"></i>
                            </a>
                            <div
                                id="faq-list-2"
                                className={`collapse ${activeFAQ === 'faq-list-2' ? 'show' : ''}`}
                            >
                                <p>
                                    To become a CarLovers Member, you need to sign up. If you
                                    want to become a driver, you must provide the correct
                                    driving license, which will be reviewed by our team. After
                                    reviewing, you will receive a confirmation email.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
