import { AuthGuard } from '@/components'
import { Layout } from '@/layout'
import React from 'react'

const Verification = () => {
    return (
        <AuthGuard requiredAbility={['manage', 'verification']}>
            <Layout>
                <h1>Verification</h1>
            </Layout>
        </AuthGuard>
    )
}

export default Verification;
