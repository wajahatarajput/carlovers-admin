// pages/auth.tsx
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '@/providers';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faUserTie, faCar, faWrench } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';

interface AuthFormInputs {
    email: string;
    password: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    dob?: string;
    profilePicture?: File;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
    phone?: string;
    role?: string;
}

export default function Login() {
    const { register, handleSubmit } = useForm<AuthFormInputs>();
    const { login, register: signup } = useAuth();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState(1);

    const onSubmitLogin: SubmitHandler<AuthFormInputs> = useCallback(async (data) => {
        try {
            await login(data.email, data.password);
            router.push('/admin/dashboard');
        } catch (error) {
            console.error(error);
        }
    }, []);

    const onSubmitSignup: SubmitHandler<AuthFormInputs> = useCallback(async (data) => {
        try {
            // Handle profile picture upload separately if necessary
            // await signup(data.email, data.password, ...); 
            router.push('/welcome');
        } catch (error) {
            console.error(error);
        }
    }, []);

    const nextStep = useCallback(() => {
        setStep(step => step + 1);
    }, []);

    const prevStep = useCallback(() => {
        setStep(step => step - 1);
    }, []);

    return (
        <div className="w-100 vh-100 bg-light bg-main text-light">
            <div className="row d-flex justify-content-center align-items-center w-100">
                <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                    <div className={`${styles.glassmorphismcontainer} w-100`}>
                        {isLogin ? (
                            <form onSubmit={handleSubmit(onSubmitLogin)}>
                                <h1 className='text-center'>Login</h1>
                                <div className="mb-3 form-group">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" {...register('email')} />
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" {...register('password')} />
                                </div>
                                <Link href='/register' className="forgot-password text-decoration-none btn btn-outline-light border-0 border">Forgot Password?</Link>
                                <input type="submit" className="btn btn-outline-light w-100 mt-3" value="Login" />
                                <hr />
                                <button type="button" onClick={() => setIsLogin(false)} className="btn btn-outline-light border border-0 mt-3">Don't have an account? Signup</button>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmitSignup)}>
                                <h1 className='text-center'>Signup</h1>
                                {step === 1 && (
                                    <>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <input type="text" className="form-control" id="firstName" {...register('firstName')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <input type="text" className="form-control" id="lastName" {...register('lastName')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                                            <input type="date" className="form-control" id="dob" {...register('dob')} />
                                        </div>
                                        <div className='btnGroup d-block d-md-flex justify-content-between align-items-center'>
                                            <button type="button" onClick={prevStep} className="btn btn-secondary mt-3">Previous</button>
                                            <button type="button" onClick={nextStep} className="btn btn-purple mt-3">Next</button>
                                        </div>
                                    </>
                                )}
                                {step === 2 && (
                                    <>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input type="email" className="form-control" id="email" {...register('email')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" {...register('password')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                            <input type="password" className="form-control" id="confirmPassword" {...register('confirmPassword')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                                            <input type="file" className="form-control" id="profilePicture" {...register('profilePicture')} />
                                        </div>
                                        <div className='btnGroup d-block d-md-flex justify-content-between align-items-center'>
                                            <button type="button" onClick={prevStep} className="btn btn-secondary mt-3">Previous</button>
                                            <button type="button" onClick={nextStep} className="btn btn-purple mt-3">Next</button>
                                        </div>
                                    </>
                                )}
                                {step === 3 && (
                                    <>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
                                            <input type="text" className="form-control" id="addressLine1" {...register('addressLine1')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
                                            <input type="text" className="form-control" id="addressLine2" {...register('addressLine2')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input type="text" className="form-control" id="city" {...register('city')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="state" className="form-label">State</label>
                                            <input type="text" className="form-control" id="state" {...register('state')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="country" className="form-label">Country</label>
                                            <input type="text" className="form-control" id="country" {...register('country')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="zipcode" className="form-label">Zipcode</label>
                                            <input type="text" className="form-control" id="zipcode" {...register('zipcode')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="phone" className="form-label">Phone</label>
                                            <input type="text" className="form-control" id="phone" {...register('phone')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="location" className="form-label">Location</label>
                                            <button type="button" className="btn btn-primary" id="location">Use Current Location</button>
                                        </div>
                                        <div className='btnGroup d-block d-md-flex justify-content-between align-items-center'>
                                            <button type="button" onClick={prevStep} className="btn btn-secondary mt-3">Previous</button>
                                            <button type="button" onClick={nextStep} className="btn btn-purple mt-3">Next</button>
                                        </div>
                                    </>
                                )}
                                {step === 4 && (
                                    <>
                                        <div className="mb-3 form-group">
                                            <label className="form-label">Select Role</label>
                                            <div className="d-md-flex d-block justify-content-around">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" id="admin" value="admin" {...register('role')} />
                                                    <label className="form-check-label" htmlFor="admin">
                                                        <FontAwesomeIcon icon={faUserShield} size="2x" />
                                                        <div>Admin</div>
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" id="owner" value="owner" {...register('role')} />
                                                    <label className="form-check-label" htmlFor="owner">
                                                        <FontAwesomeIcon icon={faUserTie} size="2x" />
                                                        <div>Owner</div>
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" id="driver" value="driver" {...register('role')} />
                                                    <label className="form-check-label" htmlFor="driver">
                                                        <FontAwesomeIcon icon={faCar} size="2x" />
                                                        <div>Driver</div>
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" id="workshop" value="workshop" {...register('role')} />
                                                    <label className="form-check-label" htmlFor="workshop">
                                                        <FontAwesomeIcon icon={faWrench} size="2x" />
                                                        <div>Workshop</div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='btnGroup d-block d-md-flex justify-content-between align-items-center'>
                                            <button type="button" onClick={prevStep} className="btn btn-secondary mt-3">Previous</button>
                                            <input type="submit" className="btn btn-purple mt-3" value="Register" />
                                        </div>
                                    </>
                                )}
                                <hr />
                                <button type="button" onClick={() => setIsLogin(true)} className="btn btn-outline-light border border-0 mt-3">Already have an account? Login</button>
                            </form>
                        )}
                        <hr />
                        <div className="">
                            <button className="btn btn-outline-light mx-1 my-1 w-100">
                                <i className="bi bi-facebook"></i> Facebook
                            </button>
                            <button className="btn btn-outline-light mx-1 my-1 w-100">
                                <i className="bi bi-twitter"></i> Twitter
                            </button>
                            <button className="btn btn-outline-light mx-1 my-1 w-100">
                                <i className="bi bi-google"></i> Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
