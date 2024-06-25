// pages/login.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '@/providers';
import Link from 'next/link';
import styles from './style.module.css';


interface LoginFormInputs {
    email: string;
    password: string;
}

export default function Login() {
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const { login } = useAuth();
    const router = useRouter();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            await login(data.email, data.password);
            router.push('/admin/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className={[styles.blob, styles.blob1].join(' ')}></div>
            <div className={[styles.blob, styles.blob2].join(' ')}></div>
            <div className={[styles.blob, styles.blob3].join(' ')}></div>

            <div className="w-100 vh-100">
                <div className="row d-flex justify-content-center align-items-center w-100">
                    <div className="col-md-6 d-flex text-center flex-column justify-content-center align-items-center">
                        <h1> Welcome to Carlovers </h1>
                        <img src="/assets/images/car-login.svg" className='w-75' />
                    </div>
                    <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                        <div className={`${styles.glassmorphismcontainer} w-100`}>
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                <input type="submit" className="btn btn-outline-dark w-100 mt-3" value="login" />
                                <hr />
                                <Link href='/register' className="forgot-password text-decoration-none btn btn-outline-dark border-0 border">Does not have an account? Register</Link>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}
