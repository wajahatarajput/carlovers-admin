// pages/auth.tsx
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '@/providers';
import Link from 'next/link';
import styles from './style.module.css';

interface AuthFormInputs {
    email: string;
    password: string;
    username?: string;
    phoneNumber?: string;
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
            await signup(data.email, data.password);
            router.push('/welcome');
        } catch (error) {
            console.error(error);
        }
    }, []);

    const nextStep = useCallback(() => {
        setStep(step => step + 1);
    }, []);

    const prevStep = useCallback(() => {
        setStep(step => step + 1);
    }, []);

    return (
        <div className="w-100 vh-100 bg-light bg-main text-light">
            <div className="row d-flex justify-content-center align-items-center w-100">
                <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
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
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input type="email" className="form-control" id="email" {...register('email')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" {...register('password')} />
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
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <input type="text" className="form-control" id="username" {...register('username')} />
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                            <input type="text" className="form-control" id="phoneNumber" {...register('phoneNumber')} />
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
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-light mx-1">
                                <i className="bi bi-facebook"></i> Facebook
                            </button>
                            <button className="btn btn-outline-light mx-1">
                                <i className="bi bi-twitter"></i> Twitter
                            </button>
                            <button className="btn btn-outline-light mx-1">
                                <i className="bi bi-google"></i> Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
