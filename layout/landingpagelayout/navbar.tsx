import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '../../lib/firebase';

export const NavbarComp: React.FC = () => {
    const router = useRouter();

    const handleNavigate = (url: string) => {
        router.push(url);
    };

    return (
        <div className='bg-purple'>
            <div className="custom-nav w-100 py-3 text-center">
                <Link href="/" passHref>
                    <span className="ml-5 display-1 nav-link text-light">
                        CarLovers LLC
                    </span>
                </Link>
            </div>
            <hr className="custom-nav my-0" />
            <nav className="navbar navbar-expand-lg navbar-dark custom-nav d-flex justify-content-center align-items-center flex-row">
                <div className="navbar-nav text-center text-white">
                    <Link href="/" passHref>
                        <span className="nav-link">Home</span>
                    </Link>
                    <Link href="/about" passHref>
                        <span className="nav-link">About</span>
                    </Link>
                    <Link href="/services" passHref>
                        <span className="nav-link">Services</span>
                    </Link>
                    <Link href="/shop" passHref>
                        <span className="nav-link">Shop</span>
                    </Link>
                    <Link href="/pricing" passHref>
                        <span className="nav-link">Pricing</span>
                    </Link>
                    <Link href="/contact" passHref>
                        <span className="nav-link">Contact</span>
                    </Link>

                    <button
                        className="btn btn-outline-purple mr-3 nav-link p-3 scrollto"
                        onClick={() => handleNavigate("/login")}
                        style={{ cursor: "pointer" }}
                    >
                        <i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
                        {auth.currentUser?.email || "Login"}
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default NavbarComp;
