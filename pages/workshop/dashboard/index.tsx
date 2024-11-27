import { AuthGuard, Cards } from '@/components';
import { Layout } from '@/layout';
import { useOrders } from '@/providers';
import Link from 'next/link';
import React from 'react';

const Page = () => {
    const { getActiveOrders, getCompletedOrders, getPaidOrders } = useOrders();

    return (
        <AuthGuard requiredAbility={['manage', 'workshop-dashboard']}>
            <Layout>
                <div id="wrapper" style={{ padding: "0px" }}>
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content" style={{ padding: "0px" }}>
                            <div className="container-fluid">
                                {/* Dashboard Header */}
                                <div className="d-sm-flex justify-content-start align-items-center mb-4 mt-3">
                                    <h3
                                        className="text-center text-dark mb-0"
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: "1.6rem",
                                            textAlign: "left"
                                        }}
                                    >
                                        Dashboard
                                    </h3>
                                </div>

                                {/* Card Section */}
                                <div
                                    className="d-xl-flex justify-content-xl-center align-items-xl-center flex-wrap"
                                    style={{ gap: "1.5rem", margin: "0px" }}
                                >
                                    <Link href="/workshop/orders/active" passHref>
                                        <div
                                            style={{
                                                cursor: "pointer",
                                                transition: "0.3s",
                                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                                borderRadius: "8px",
                                            }}
                                            className="card-container"
                                        >
                                            <Cards
                                                count={getActiveOrders()?.length || 0}
                                                type="Accepted Requests"
                                                icon="fa fa-spinner fa-2x text-gray-300"
                                            />
                                        </div>
                                    </Link>
                                    <Link href="/workshop/orders/complete" passHref>
                                        <div
                                            style={{
                                                cursor: "pointer",
                                                transition: "0.3s",
                                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                                borderRadius: "8px",
                                            }}
                                            className="card-container"
                                        >
                                            <Cards
                                                count={getCompletedOrders()?.length || 0}
                                                type="Completed Requests"
                                                icon="fa fa-check fa-2x text-gray-300"
                                            />
                                        </div>
                                    </Link>
                                    <Link href="/workshop/orders/paid" passHref>
                                        <div
                                            style={{
                                                cursor: "pointer",
                                                transition: "0.3s",
                                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                                borderRadius: "8px",
                                            }}
                                            className="card-container"
                                        >
                                            <Cards
                                                count={getPaidOrders()?.length || 0}
                                                type="Paid Requests"
                                                icon="fa fa-credit-card fa-2x text-gray-300"
                                            />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </AuthGuard>
    );
};

export default Page;
