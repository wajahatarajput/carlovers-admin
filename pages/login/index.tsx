import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { REGISTER_SCHEMA } from '@/schemas';
import Image from 'next/image';
import car from './image/car.png';


interface AuthFormInputs {
    email: string;
    password: string;
    confirmPassword?: string;
}

export default function Auth() {
    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormInputs>({
        resolver: yupResolver(REGISTER_SCHEMA),
    });
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    const onSubmit: SubmitHandler<AuthFormInputs> = useCallback(async (data) => {
        try {
            // Handle login/signup API calls here
            toast.success(isLogin ? 'Login successful' : 'Signup successful');
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    }, [isLogin]);

    return (
        <div className="d-flex justify-content-start vh-100 bg-light bg-gradient"
            style={{
                background: 'linear-gradient(to right, #e8eaf6, #c5cae9)',
                fontFamily: 'Arial, sans-serif',
            }}>
            <div className="flex-grow-1 w-100 ms-2 mt-2 mb-2 p-4 bg-white"
            style={{
                maxWidth: '600px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <h1 className="text-start fs-4 fw-bold mb-4 ms-5 mt-2 ">CarLovers LLC</h1>
                <div className="d-flex justify-content-center mb-3  gap-3">
                <button
                  className={`px-3 py-2 border-0 bg-transparent text-muted fs-5 ${isLogin ? "fw-bold border-bottom" : ""}`}
                     style={{
                     transition: "color 0.3s",
                     cursor: "pointer",
                     ...(isLogin && {
                       color: "#020202e1",
                       borderBottomWidth: "2px",
                        borderBottomColor: "#020202e1",
                        borderBottomStyle: "solid",
                            }),
                             }}
                       onClick={() => setIsLogin(true)}
                             >
                            Login
                </button>

                <button
                  className={`px-3 py-2 border-0 bg-transparent text-muted fs-5 ${!isLogin ? "fw-bold border-bottom " : ""}`}
                 style={{
                 transition: "color 0.3s",
                 cursor: "pointer",
                 ...(!isLogin && {
                 color: "#020202e1",
                 borderBottomWidth: "2px",
                 borderBottomColor: "#020202e1",
                 borderBottomStyle: "solid",
    }),
  }}
                  onClick={() => setIsLogin(false)}
                >
                     Sign up
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3" style={{ marginLeft: '7rem' }}>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email')}
                            className="w-75 p-2 border border-secondary rounded-2 ms-1"
                               style={{ outline: "none" }}
                        />
                        {errors.email && <p className="text-danger fs-6">{errors.email.message}</p>}
                    </div>
                    <div className="mb-3" style={{ marginLeft: '7rem' }}>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password')}
                            className="w-75 p-2 border border-secondary rounded-2 ms-1"
                               style={{ outline: "none" }}
                        />
                        {errors.password && <p className="text-danger fs-6">{errors.password.message}</p>}
                    </div>
                    {!isLogin && (
                        <div className="mb-3" style={{ marginLeft: '7rem' }}>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                {...register('confirmPassword')}
                                className="w-75 p-2 border border-secondary rounded-2 ms-1"
                               style={{ outline: "none" }}
                            />
                            {errors.confirmPassword && (
                                <p className="text-danger fs-6">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center mt-3 ms-5">
                        {isLogin && (
                            <a href="#" className="text-muted fs-6" style={{ color: '#0b0b0c85', marginLeft: '4rem' }}>
                                Forgot Password?
                            </a>
                        )}
                        <button type="submit" className="btn" style={{ backgroundColor: '#912dca', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.3s', marginLeft: '4rem', marginRight: '7rem'}}>
                            {isLogin ? 'Login' : 'Sign up'}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p>Or connect with</p>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                    <button className="border-0 rounded-circle d-flex align-items-center justify-content-center" 
    style={{
        width: '40px', 
        height: '40px', 
        fontSize: '18px', 
        backgroundColor: '#c5cae9', 
        color: '#912dca', 
        cursor: 'pointer'
    }}>
                <i className="fab fa-facebook"></i>
                    </button>
                    <button className="border-0 rounded-circle d-flex align-items-center justify-content-center" 
    style={{
        width: '40px', 
        height: '40px', 
        fontSize: '18px', 
        backgroundColor: '#c5cae9', 
        color: '#912dca', 
        cursor: 'pointer'
    }}>
                <i className="fab fa-linkedin"></i>
                     </button>
                    <button className="border-0 rounded-circle d-flex align-items-center justify-content-center" 
    style={{
        width: '40px', 
        height: '40px', 
        fontSize: '18px', 
        backgroundColor: '#c5cae9', 
        color: '#912dca', 
        cursor: 'pointer'
    }}>
                 <i className="fab fa-google"></i>
                     </button>
                        
                        </div>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-end bg-white mt-2 mb-2 w-100">
                <Image src={car} alt="Car Image" className="h-100" style={{ width: '60%' }}/>
            </div>
        </div>
    );
}
