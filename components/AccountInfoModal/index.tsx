import React from 'react'

interface StripeModalProps {
    isOpen: boolean;
    toggleModal: () => void;
    stripeAccount: string;
    accountLinkUrl: string;
  }
  

export const AccountInfoModal: React.FC<StripeModalProps> = ({ isOpen, toggleModal, stripeAccount, accountLinkUrl }) => {
  return (
    <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} id="stripeModal" tabIndex={-1} aria-labelledby="stripeModalLabel" aria-hidden={!isOpen}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="stripeModalLabel">Stripe Account Information</h5>
          <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <h1>Please Save this account number for Future Reference</h1>
          <h2>{stripeAccount}</h2>
          <hr />
          <h5 className="bg-warning p-2">
            You can now go back to the Dashboard and start receiving the orders as soon as any car owner in your area requests your assistance
          </h5>
          <a href={accountLinkUrl}>Please complete your account onboarding process here</a>
        </div>
      </div>
    </div>
  </div>
  )
}
