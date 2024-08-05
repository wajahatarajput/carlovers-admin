import { AuthGuard, Cards } from '@/components'
import { Layout } from '@/layout'
import { useOrders } from '@/providers'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    const { getActiveOrders, getCompletedOrders, getPaidOrders } = useOrders();
    return (
        <AuthGuard requiredAbility={['manage', 'workshop-dashboard']}>
            <Layout>
                <div id="wrapper" style={{ padding: "0px" }}>
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content" style={{ padding: "0px" }}>
                            <div className="container-fluid">
                                <div className="d-sm-flex justify-content-start align-items-center mb-4 mt-3">
                                    <h3 className="text-center text-dark mb-0"> Dashboard</h3>
                                </div>
                                <div
                                    className="d-xl-flex justify-content-xl-center align-items-xl-center"
                                    style={{ margin: "0px" }}
                                >
                                    <Link href="/activerequests" passHref>

                                        <Cards
                                            count={getActiveOrders()?.length || 0}
                                            type="Accepted Requests"
                                            icon="fa fa-spinner fa-2x text-gray-300"
                                        />
                                    </Link>
                                    <Link href="/completedrequests" passHref>

                                        <Cards
                                            count={getCompletedOrders()?.length || 0}
                                            type="Completed Requests"
                                            icon="fa fa-check fa-2x text-gray-300"
                                        />
                                    </Link>
                                    <Link href="/paidrequests" passHref>

                                        <Cards
                                            count={getPaidOrders()?.length || 0}
                                            type="Paid Requests"
                                            icon="fa fa-credit-card fa-2x text-gray-300"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </AuthGuard>
    )
}

export default Page