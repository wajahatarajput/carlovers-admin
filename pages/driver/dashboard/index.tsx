import { AuthGuard } from '@/components'
import { Layout } from '@/layout'
import React from 'react'

const Page = () => {
    return (
        <AuthGuard requiredAbility={['manage', 'driver-dashboard']}>
            <Layout>
                <div>
                    Driver Dashboard
                </div>
            </Layout>
        </AuthGuard>
    )
}

export default Page
