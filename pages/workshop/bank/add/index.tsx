import { AccountInfoModal, AuthGuard, BankAccountForm } from '@/components';
import { Layout } from '@/layout';
import React, { useState } from 'react'

const Page = () => {
    const [stripeAccount, setStripeAccount] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [accountLinkUrl, setAccountLinkUrl] = useState('');
  
    const toggleModal = () => {
      setIsOpen(!isOpen);
    }
  return (
    <AuthGuard requiredAbility={['manage', 'verification']}>
                <Layout>
    <div className={"bodyDiv h-auto p-5"}>
        <div className="App pt-0 border rounded-0 shadow-lg">
          <div className="d-block justify-content-xl-center align-items-xl-center form-div">
            <div>
              <BankAccountForm setIsOpen={setIsOpen} setStripeAccount={setStripeAccount} setAccountLinkUrl={setAccountLinkUrl} />
            </div>
            <AccountInfoModal isOpen={isOpen} toggleModal={toggleModal} stripeAccount={stripeAccount} accountLinkUrl={accountLinkUrl} />
          </div>
        </div>
      </div>
      </Layout>
      </AuthGuard>
  )
}

export default Page;
