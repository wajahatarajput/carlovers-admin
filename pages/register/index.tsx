// pages/register.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '@/providers';

import styles from './style.module.css';
import Link from 'next/link';

interface RegisterFormInputs {
    email: string;
    password: string;
    password2: string;
}

export default function Register() {
    const { register, handleSubmit } = useForm<RegisterFormInputs>();
    const { register: signUp } = useAuth();
    const router = useRouter();

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        try {
            await signUp(data.email, data.password);
            router.push('/dashboard');
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
                <div className="row d-flex flex-row-reverse justify-content-center align-items-center w-100">
                    <div className="col-md-6 d-flex text-center flex-column justify-content-center align-items-center">
                        <h1> Welcome to Carlovers </h1>
                        <img src="/assets/images/car-login.svg" className='w-75' />
                    </div>
                    <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                        <div className={`${styles.glassmorphismcontainer} w-100`}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1 className='text-center'>Register</h1>
                                <div className="mb-3 form-group">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" {...register('email')} />
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" {...register('password')} />
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="password" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="password2" {...register('password2')} />
                                </div>
                                <input type="submit" className="btn btn-outline-dark w-100 mt-3" value="Register" />
                                <hr />
                                <Link href='/login' className="forgot-password text-decoration-none btn btn-outline-dark border-0 border">Already have an account? Login</Link>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}
