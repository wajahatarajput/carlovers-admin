import React from 'react';
import { AuthGuard } from '@/components';
import { Layout } from '@/layout';
import { useRouter } from 'next/router';
import { useWorkshop } from '@/hooks';

const Verification: React.FC = () => {
    const {
        loading,
        zipcode,
        disabled,
        showSpinner,
        workshops,
        setZipcode,
        createWorkshop,
    } = useWorkshop();
    const router = useRouter();

    if (loading)
        return (
            <div className="bodyDiv">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h3> Please Wait while we load your data!</h3>
            </div>
        );

    if (workshops?.length <= 0)
        return (
            <AuthGuard requiredAbility={['manage', 'verification']}>
                <Layout>
                    <div className="vh-100 d-flex justify-content-center align-items-center">
                        <div className="rounded-0 shadow-lg p-5">
                            <button
                                onClick={() => {
                                    router.back();
                                }}
                                className="btn btn-outline-secondary border border-0 mb-3 rounded"
                            >
                                <i className="fa fa-arrow-left"> Back</i>
                            </button>
                            <div className="d-flex justify-content-xl-center align-items-xl-center form-div">
                                <form onSubmit={createWorkshop}>
                                    <h3> Join Carlovers as Workshop </h3>
                                    <div className="mb-3">
                                        <label htmlFor="pimage" className="form-label">
                                            Upload your Workshop License / Work Permit
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="pimage"
                                            id="pimage"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pimage2" className="form-label">
                                            Upload your Workshop's Owner Identity Document for verification
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="pimage2"
                                            id="pimage2s"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            hidden
                                            maxLength={5}
                                            value={zipcode}
                                            onInput={(e) => {
                                                e.currentTarget.value = e.currentTarget.value
                                                    .replace(/[^0-9.]/g, '')
                                                    .replace(/(\..*)\./g, '$1');
                                            }}
                                            pattern="[0-9]+"
                                            onChange={(e) => {
                                                setZipcode(e.currentTarget.value);
                                            }}
                                            name="number"
                                            placeholder="Enter your Zip-code"
                                            required
                                        />
                                    </div>
                                    <div className="text-center">
                                        {showSpinner ? (
                                            <span className="spinner-border" role="status"></span>
                                        ) : (
                                            ''
                                        )}
                                        <button
                                            disabled={disabled}
                                            type="submit"
                                            className="btn btn-purple rounded w-100"
                                        >
                                            <i className="fa fa-save text-gray-300">Save</i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Layout>
            </AuthGuard>
        );
    else
        return (
            <AuthGuard requiredAbility={['manage', 'verification']}>
                <Layout>
                    <div
                        className="d-flex justify-content-center align-items-center gap-3"
                        style={{ height: '80vh' }}
                    >
                        <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">
                            Successfully Sent
                        </h1>
                        <div className="inline-block align-middle">
                            <h2 className="font-weight-normal lead" id="desc">
                                We need to get your license to approve your request.
                                <br /> Verification might take some time.
                                <br />
                                Please wait for the Admin to accept your request.
                            </h2>
                        </div>
                    </div>
                </Layout>
            </AuthGuard>
        );
};

export default Verification;