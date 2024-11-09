import React, { ReactNode } from 'react'
import NavbarComp from './navbar';
import FooterComp from './footer';

interface LandingPageLayoutProps {
    children: ReactNode;
}

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children }) => {
    return (
        <>
            <NavbarComp />
            {children}
            <FooterComp />
        </>
    )
}

export default LandingPageLayout
