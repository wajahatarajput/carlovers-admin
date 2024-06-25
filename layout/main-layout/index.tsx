// src/components/Layout.tsx
import { useState } from 'react';
import styles from '../../styles/Layout.module.css';
import { Sidebar } from './components';
import localStyles from './style.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={styles.layout}>
            <div className={[localStyles.blob, localStyles.blob1].join(' ')}></div>
            <div className={[localStyles.blob, localStyles.blob2].join(' ')}></div>
            <div className={[localStyles.blob, localStyles.blob3].join(' ')}></div>

            <Sidebar show={sidebarOpen} />
            <div className={sidebarOpen ? styles.mainOpen : styles.main}>
                <div className='d-flex justify-content-end'>
                    <button onClick={toggleSidebar} className={`p-2 border border-0 ${styles.hamberg}`}>
                        {
                            sidebarOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>
                        }
                    </button>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};
