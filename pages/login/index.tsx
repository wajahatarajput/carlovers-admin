// pages/auth.tsx
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '@/providers';
import Link from 'next/link';
import styles from './style.module.css';

interface AuthFormInputs {
    email: string;
    password: string;
}

export default function Login() {
    const { register, handleSubmit } = useForm<AuthFormInputs>();
    const { login, register: signup } = useAuth();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    const onSubmitLogin: SubmitHandler<AuthFormInputs> = async (data) => {
        try {
            await login(data.email, data.password);
            router.push('/admin/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmitSignup: SubmitHandler<AuthFormInputs> = async (data) => {
        try {
            await signup(data.email, data.password);
            router.push('/welcome');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-100 vh-100 bg-light">
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
                                <Link href='/register' className="forgot-password text-decoration-none btn btn-outline-dark border-0 border">Forgot Password?</Link>
                                <input type="submit" className="btn btn-outline-dark w-100 mt-3" value="Login" />
                                <hr />
                                <button type="button" onClick={() => setIsLogin(false)} className="btn btn-outline-dark border border-0 mt-3">Don't have an account? Signup</button>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmitSignup)}>
                                <h1 className='text-center'>Signup</h1>
                                <div className="mb-3 form-group">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" {...register('email')} />
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" {...register('password')} />
                                </div>
                                <input type="submit" className="btn btn-outline-dark w-100 mt-3" value="Signup" />
                                <hr />
                                <button type="button" onClick={() => setIsLogin(true)} className="btn btn-outline-dark border border-0 mt-3">Already have an account? Login</button>
                            </form>
                        )}
                        <hr />
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-dark mx-1">
                                <i className="bi bi-facebook"></i> Facebook
                            </button>
                            <button className="btn btn-outline-dark mx-1">
                                <i className="bi bi-twitter"></i> Twitter
                            </button>
                            <button className="btn btn-outline-dark mx-1">
                                <i className="bi bi-google"></i> Twitter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
