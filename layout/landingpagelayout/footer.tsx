import Link from 'next/link'; // Import Link from Next.js
import React from 'react';

const FooterComp: React.FC = () => {
    return (
        <>
            <footer id="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-info">
                                    <h3>CarLovers</h3>
                                    <p className="pb-3" style={{ color: "white" }}>
                                        <em>
                                            Only CarLovers.com gives you complete peace of mind.
                                        </em>
                                    </p>
                                    <p style={{ color: "white" }}>
                                        Albuquerque, NM.
                                        <strong>Phone:</strong> +1 (203) 269-8599
                                        <br />
                                        <strong>Email:</strong> richard@carlovers.com
                                        <br />
                                    </p>
                                    <div className="social-links mt-3">
                                        <a className="twitter" href="#" aria-label="Twitter">
                                            <i className="bx bxl-twitter"></i>
                                        </a>
                                        <a className="facebook" href="#" aria-label="Facebook">
                                            <i className="bx bxl-facebook"></i>
                                        </a>
                                        <a className="instagram" href="#" aria-label="Instagram">
                                            <i className="bx bxl-instagram"></i>
                                        </a>
                                        <a className="google-plus" href="#" aria-label="Google Plus">
                                            <i className="bx bxl-skype"></i>
                                        </a>
                                        <a className="linkedin" href="#" aria-label="LinkedIn">
                                            <i className="bx bxl-linkedin"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6 footer-links m-auto">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li>
                                        <i className="bx bx-chevron-right"></i>
                                        <Link href="#hero">Home</Link>
                                    </li>
                                    <li>
                                        <i className="bx bx-chevron-right"></i>
                                        <Link href="#about">About us</Link>
                                    </li>
                                    <li>
                                        <i className="bx bx-chevron-right"></i>
                                        <Link href="#features">Services</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="copyright">
                        &copy; Copyright{" "}
                        <strong>
                            <span>CarLovers (2022)</span>
                        </strong>
                        . All Rights Reserved
                    </div>
                </div>
            </footer>

            {/* Back to Top button */}
            <a
                href="#home"
                className="back-to-top d-flex align-items-center justify-content-center"
                aria-label="Back to top"
            >
                <i className="bi bi-arrow-up-short"></i>
            </a>
        </>
    );
}

export default FooterComp;
