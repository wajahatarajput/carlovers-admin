import { AuthGuard } from '@/components'
import { Layout } from '@/layout'
import React from 'react'

const Page = () => {
    return (
        <AuthGuard requiredAbility={['manage', 'owner-dashboard']}>
            <Layout>
                <div>
                    Owner Dashboaard
                </div>
            </Layout>
        </AuthGuard>
    )
}

export default Page
