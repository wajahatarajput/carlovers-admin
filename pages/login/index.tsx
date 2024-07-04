// pages/auth.tsx
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '@/providers';
import Link from 'next/link';
import styles from './style.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { REGISTER_SCHEMA } from '@/schemas';
import { toast } from 'react-toastify';

interface AuthFormInputs {
    username: string;
    password: string;
    confirmPassword?: string;
}

export default function Auth() {
    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormInputs>({
        resolver: yupResolver(REGISTER_SCHEMA)
    });
    const { login, register: signup, loading } = useAuth();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);


    const onSubmitLogin: SubmitHandler<AuthFormInputs> = useCallback(async (data) => {
        try {
            await login(data.username, data.password);
        } catch (error) {
            toast.error("Login failed. Please check your credentials and try again.");
        }
    }, [login, router]);

    const onSubmitSignup: SubmitHandler<AuthFormInputs> = useCallback(async (data) => {
        try {
            await signup(data.username, data.password);
        } catch (error) {
            toast.error("Signup failed. Please check your input and try again.");
        }
    }, [signup, router]);

    return (
        <div className="w-100 vh-100 bg-light bg-main text-light">
            <div className="row d-flex justify-content-center align-items-center w-100">
                <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                    <div className={`${styles.glassmorphismcontainer} w-100`}>
                        {isLogin ? (
                            <form onSubmit={handleSubmit(onSubmitLogin)}>
                                <h1 className='text-center'>Login</h1>
                                <div className="mb-3 form-group">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" {...register('username')} />
                                    {errors.username && <p className="text-danger">{errors.username.message}</p>}
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" {...register('password')} />
                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                </div>
                                <Link href='/register' className="forgot-password text-decoration-none btn btn-outline-light border-0 border">Forgot Password?</Link>
                                <input type="submit" className="btn btn-outline-light w-100 mt-3" value="Login" disabled={loading} />
                                <hr />
                                <button type="button" onClick={() => setIsLogin(false)} className="btn btn-outline-light border border-0 mt-3">Don't have an account? Signup</button>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmitSignup)}>
                                <h1 className='text-center'>Signup</h1>
                                <div className="mb-3 form-group">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" {...register('username')} />
                                    {errors.username && <p className="text-danger">{errors.username.message}</p>}
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" {...register('password')} />
                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" {...register('confirmPassword')} />
                                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                                </div>
                                <input type="submit" className="btn btn-outline-light w-100 mt-3" value="Signup" disabled={loading} />
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
