import React, { useState } from 'react';
import styles from './loginPage.module.css';

const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className={`d-flex justify-content-center align-items-center ${styles.loginPage}`}>
            <div className={`row shadow-lg ${styles.loginContainer}`}>
                <div className={`px-5 py-2 ${styles.formContainer}`}>
                    <div className={styles.glassContainer}>
                        <h1 className={styles.brandTitle}>CarLovers LLC</h1>
                        <div className={`w-100 d-flex ${styles.tabs}`}>
                            <h2
                                className={`${styles.tab} ${isLogin ? styles.activeTab : ''}`}
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </h2>
                            <h2
                                className={`${styles.tab} ${!isLogin ? styles.activeTab : ''}`}
                                onClick={() => setIsLogin(false)}
                            >
                                Sign up
                            </h2>
                        </div>
                        {isLogin ? (
                            <form className={styles.authForm}>
                                <input type="email" className="form-control mb-3" placeholder="Email" />
                                <input type="password" className="form-control mb-3" placeholder="Password" />
                                <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
                                <button type="submit" className={`btn w-100 ${styles.btnPrimary}`}>Login</button>
                            </form>
                        ) : (
                            <form className={styles.authForm}>
                                <div className="d-flex">
                                    <input type="text" className="form-control mb-3 me-2" placeholder="First Name" />
                                    <input type="text" className="form-control mb-3" placeholder="Last Name" />
                                </div>
                                <input type="email" className="form-control mb-3" placeholder="Email" />
                                <input type="password" className="form-control mb-3" placeholder="Password" />
                                <input type="password" className="form-control mb-3" placeholder="Confirm Password" />
                                <button type="submit" className={`btn w-100 ${styles.btnPrimary}`}>Sign up</button>
                            </form>
                        )}
                        <div className={styles.divider}>Or Connect with</div>
                        <div className={`d-flex justify-content-center ${styles.socialIcons}`}>
                            <span className={`fa fa-facebook mx-2 ${styles.icon}`} />
                            <span className={`fa fa-skype mx-2 ${styles.icon}`} />
                            <span className={`fa fa-google mx-2 ${styles.icon}`} />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default LoginPage;
