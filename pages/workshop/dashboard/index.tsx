import { AuthGuard } from '@/components'
import { Layout } from '@/layout'
import React from 'react'

const Page = () => {
    return (
        <AuthGuard requiredAbility={['manage', 'workshop-dashboard']}>
            <Layout>
                <div>
                    Worksho
                </div>
            </Layout>
        </AuthGuard>
    )
}

export default Page