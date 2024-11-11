import React, { useState, useRef } from 'react';
// import emailjs from "@emailjs/browser";

export const ContactSection: React.FC = () => {
    const form = useRef<HTMLFormElement | null>(null);
    const [senderName, setSenderName] = useState<string>('');
    const [senderEmail, setSenderEmail] = useState<string>('');
    const [senderMessage, setSenderMessage] = useState<string>('');

    // const sendEmail = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (form.current) {
    //         emailjs
    //             .sendForm(
    //                 "service_m7rhwr5",
    //                 "template_bosqsqx",
    //                 form.current,
    //                 "d5PKIxEZz9rgtHiPK"
    //             )
    //             .then(
    //                 (result) => {
    //                     console.log(result.text);
    //                     toast.success("Email Sent Successfully");
    //                 },
    //                 (error) => {
    //                     console.log(error.text);
    //                     toast.error("Error sending Email");
    //                 }
    //             );
    //     }
    // };

    return (
        <section id="contact" className="contact mt-5">
            <div className="container">
                <div className="section-title" data-aos="fade-up">
                    <h2>Contact</h2>
                    <p>Contact Us</p>
                </div>

                <div className="row">
                    <div className="col-lg-4" data-aos="fade-right" data-aos-delay="100">
                        <div className="info">
                            <div className="address">
                                <i className="bi bi-geo-alt"></i>
                                <h4>Location:</h4>
                                <p>Albuquerque, NM.</p>
                            </div>

                            <div className="email">
                                <i className="bi bi-envelope"></i>
                                <h4>Email:</h4>
                                <p>support@carlovers.com</p>
                            </div>

                            <div className="phone">
                                <i className="bi bi-phone"></i>
                                <h4>Call:</h4>
                                <p>+1 (203) 269-8599</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 mt-5 mt-lg-0" data-aos="fade-left" data-aos-delay="200">
                        <form
                            ref={form}
                            onSubmit={(e) => {
                                e.preventDefault();
                                // sendEmail(e); // Uncomment when emailjs is integrated
                            }}
                            className="php-email-form"
                        >
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <input
                                        type="text"
                                        name="user_name"
                                        className="form-control"
                                        id="user_name"
                                        placeholder="Your Name"
                                        value={senderName}
                                        onChange={(e) => setSenderName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="user_email"
                                        id="user_email"
                                        placeholder="Your Email"
                                        value={senderEmail}
                                        onChange={(e) => setSenderEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <textarea
                                    className="form-control"
                                    name="message"
                                    rows={5}
                                    placeholder="Message"
                                    value={senderMessage}
                                    onChange={(e) => setSenderMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="my-3">
                                <div className="loading">Loading</div>
                                <div className="error-message"></div>
                                <div className="sent-message">
                                    Your message has been sent. Thank you!
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
