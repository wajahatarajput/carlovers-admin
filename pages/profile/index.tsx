import { useCallback, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth, useUserProfile } from '@/providers';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faUserTie, faCar, faWrench } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';
import { UserProfileInputs } from '@/types';
import { auth } from '@/lib';


export default function ManageProfile() {
    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm<UserProfileInputs>();
    const router = useRouter();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const { profile, updateProfile } = useUserProfile();

    useEffect(() => {
        if (profile) {
            setValue('email', profile.email);
            setValue('firstName', profile.firstName);
            setValue('lastName', profile.lastName);
            setValue('dob', profile.dob);
            setValue('addressLine1', profile.addressLine1);
            setValue('addressLine2', profile.addressLine2);
            setValue('city', profile.city);
            setValue('state', profile.state);
            setValue('country', profile.country);
            setValue('zipcode', profile.zipcode);
            setValue('phone', profile.phone);
            setValue('role', profile.role);
        }
    }, [profile, setValue]);

    const onSubmit: SubmitHandler<UserProfileInputs> = useCallback(async (data) => {
        try {
            await updateProfile(data);
            // router.push('/profile');
        } catch (error) {
            console.error(error);
        }
    }, [router, updateProfile]);

    const nextStep = useCallback(() => {
        setStep(step => step + 1);
    }, []);

    const prevStep = useCallback(() => {
        if (step > 0) {
            setStep(step => step - 1);
        }
    }, []);

    return (
        <div className="w-100 vh-100 bg-light bg-main text-light">
            <div className="row d-flex justify-content-center align-items-center w-100">
                <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                    <div className={`${styles.glassmorphismcontainer} w-100`}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1 className='text-center'>Manage Profile</h1>
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

                                        <button type="button" onClick={prevStep} className="btn btn-secondary mt-3 w-25 mx-5" disabled={true}>Previous</button>
                                        <button type="button" onClick={nextStep} className="btn btn-purple mt-3 w-25 mx-5">Next</button>
                                    </div>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <div className="mb-3 form-group">
                                        <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                                        <input type="file" className="form-control" id="profilePicture" {...register('profilePicture')} />
                                    </div>
                                    <div className='btnGroup d-block d-md-flex justify-content-between align-items-center'>
                                        <button type="button" onClick={prevStep} className="btn btn-secondary mt-3 w-25 mx-5">Previous</button>
                                        <button type="button" onClick={nextStep} className="btn btn-purple mt-3 w-25 mx-5">Next</button>
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
                                    <div className="mb-3 form-group d-sm-flex d-block gap-4 align-items-center">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" className="form-control" id="city" {...register('city')} />

                                        <label htmlFor="state" className="form-label">State</label>
                                        <input type="text" className="form-control" id="state" {...register('state')} />


                                        <label htmlFor="zipcode" className="form-label">Zipcode</label>
                                        <input type="text" className="form-control" id="zipcode" {...register('zipcode')} />
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <input type="text" className="form-control" id="country" {...register('country')} />
                                    </div>
                                    <div className="mb-3 form-group">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="phone" {...register('phone')} />
                                    </div>
                                    <div className='btnGroup d-block d-md-flex justify-content-between align-items-center'>
                                        <button type="button" onClick={prevStep} className="btn btn-secondary mt-3 w-25 mx-5">Previous</button>
                                        <button type="button" onClick={nextStep} className="btn btn-purple mt-3 w-25 mx-5">Next</button>
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
                                        <button type="button" onClick={prevStep} className="btn btn-secondary mt-3 w-25 mx-5">Previous</button>
                                        <input type="submit" className="btn btn-purple mt-3 w-25 mx-5" value="Save" />
                                    </div>
                                </>
                            )}
                        </form>
                        <hr />
                        <Link href='/admin/dashboard'>
                            <button className="btn btn-outline-light border-0 mt-3 w-100">Back to Dashboard</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
