import React from 'react';
import Image from 'next/image'; // Importing Next.js Image component

export const TestimonySection: React.FC = () => {
    return (
        <section id="testimonials" className="testimonials">
            <div className="container">
                <div
                    className="testimonials-slider swiper"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="testimonial-item">
                                <Image
                                    src="/assets/img/images/testimonials-/testimonials-1.jpg"
                                    className="testimonial-img"
                                    alt="Testimonial by Richard Lyon"
                                    width={500} // Set an appropriate width
                                    height={500} // Set an appropriate height
                                />
                                <h3>Richard Lyon</h3>
                                <h4>CEO &amp; Founder</h4>
                                <p>
                                    {/* You can uncomment and add your quote here */}
                                    {/* <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                    Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
                                    <i className="bx bxs-quote-alt-right quote-icon-right"></i> */}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        </section>
    );
};

