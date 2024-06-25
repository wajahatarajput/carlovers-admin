import Link from 'next/link';
import React from 'react';
import Profile from './profile';
import { useAuth } from '@/providers';
import styles from '../../../styles/Layout.module.css';

interface SidebarProps {
    show: boolean
}

export const Sidebar = ({ show }: SidebarProps) => {
    const { logout } = useAuth();
    return (
        <div className={`${show ? styles.sidebarOpen : styles.sidebar} bg-purple`}>
            <Profile />
            <ul className="nav flex-column mt-3">
                <li className="nav-item my-2">
                    <Link className="nav-link d-flex align-items-center text-decoration-none text-light" href="#home">
                        <i className="bi bi-house-door-fill me-2" /> Home
                    </Link>
                </li>
                <li className="nav-item my-2">
                    <Link className="nav-link d-flex align-items-center text-decoration-none text-light" href="#features">
                        <i className="bi bi-list-columns-reverse me-2"></i>Services
                    </Link>
                </li>
                <li className="nav-item my-2">
                    <Link className="nav-link d-flex align-items-center text-decoration-none text-light" href="#subscriptions">
                        <i className="bi bi-stripe me-2" /> Subscriptions
                    </Link>
                </li>
                <li className="nav-item mt-auto">
                    <button className="nav-link d-flex align-items-center text-decoration-none text-light" onClick={logout}>
                        <i className="bi bi-box-arrow-left me-2"></i>Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};
