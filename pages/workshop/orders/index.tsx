import { AuthGuard, Cards } from '@/components'
import { Layout } from '@/layout'
import { useOrders } from '@/providers'
import React from 'react'

const Page = () => {
    const { getActiveOrders, getCompletedOrders, getPaidOrders } = useOrders();
    return (
        <AuthGuard requiredAbility={['manage', 'workshop-dashboard']}>
            <Layout>
                <div className="container">Orders</div>
            </Layout>
        </AuthGuard>
    )
}

export default Page