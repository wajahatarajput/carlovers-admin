import '@fortawesome/fontawesome-free/css/all.min.css';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { useFirebaseAuth } from '@/hooks';

export const Layout = ({ children }: any) => {
    const [open, setOpen] = useState(false);
    const { logout } = useFirebaseAuth();
    const toggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <div id="page-top">
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap" />
                <title>Carlovers</title>
            </Head>
            <div id="wrapper" className={open ? 'toggled' : ''}>
                <nav className={`navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-purple p-0 ${open ? 'toggled' : ''}`}>
                    <div className="container-fluid d-flex flex-column p-0">
                        <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                            <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-car"></i></div>
                            <div className="sidebar-brand-text mx-3"><span>Carlovers</span></div>
                        </a>
                        <hr className="sidebar-divider my-0" />
                        <ul className="navbar-nav text-light" id="accordionSidebar">
                            <li className="nav-item"><Link className="nav-link" href="/admin/dashboard"><i className="fas fa-tachometer-alt"></i><span>Dashboard</span></Link></li>
                            <li className="nav-item"><Link className="nav-link" href="subscription"><i className="far fa-user-dollar"></i><span>Subscriptions</span></Link></li>
                            <li className="nav-item"><Link className="nav-link" href="services"><i className="fas fa-user-cog"></i><span>Services</span></Link></li>
                        </ul>
                        <div className="text-center d-inline">
                            <button className="btn rounded-circle border-0" id="sidebarToggle" type="button" onClick={toggleSidebar}></button>
                        </div>
                    </div>
                </nav>
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                            <div className="container-fluid">
                                <button className="btn btn-purple rounded-circle me-3" id="sidebarToggleTop" type="button" onClick={toggleSidebar}><i className="fas fa-bars"></i></button>
                                <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                                    <div className="input-group">
                                        <input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                                        <button className="btn btn-purple py-0" type="button"><i className="fas fa-search"></i></button>
                                    </div>
                                </form>
                                <ul className="navbar-nav flex-nowrap ms-auto">
                                    <li className="nav-item dropdown d-sm-none no-arrow">
                                        <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i className="fas fa-search"></i></a>
                                        <div className="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
                                            <form className="me-auto navbar-search w-100">
                                                <div className="input-group">
                                                    <input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-purple py-0" type="button"><i className="fas fa-search"></i></button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown no-arrow mx-1">
                                        <div className="nav-item dropdown no-arrow">
                                            <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                                                <span className="badge bg-danger badge-counter">3+</span><i className="fas fa-bell fa-fw"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                                                <h6 className="dropdown-header">alerts center</h6>
                                                <a className="dropdown-item d-flex align-items-center" href="#">
                                                    <div className="me-3">
                                                        <div className="bg-primary icon-circle"><i className="fas fa-file-alt text-white"></i></div>
                                                    </div>
                                                    <div><span className="small text-gray-500">December 12, 2019</span>
                                                        <p>A new monthly report is ready to download!</p>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="#">
                                                    <div className="me-3">
                                                        <div className="bg-success icon-circle"><i className="fas fa-donate text-white"></i></div>
                                                    </div>
                                                    <div><span className="small text-gray-500">December 7, 2019</span>
                                                        <p>$290.29 has been deposited into your account!</p>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="#">
                                                    <div className="me-3">
                                                        <div className="bg-warning icon-circle"><i className="fas fa-exclamation-triangle text-white"></i></div>
                                                    </div>
                                                    <div><span className="small text-gray-500">December 2, 2019</span>
                                                        <p>Spending Alert: We've noticed unusually high spending for your account.</p>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown no-arrow mx-1">
                                        <div className="nav-item dropdown no-arrow">
                                            <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                                                <span className="badge bg-danger badge-counter">7</span><i className="fas fa-envelope fa-fw"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                                                <h6 className="dropdown-header">alerts center</h6>
                                                <a className="dropdown-item d-flex align-items-center" href="#">
                                                    <div className="dropdown-list-image me-3"><img className="rounded-circle" src="/assets/img/avatars/avatar4.jpeg" />
                                                        <div className="bg-success status-indicator"></div>
                                                    </div>
                                                    <div className="fw-bold">
                                                        <div className="text-truncate"><span>Hi there! I am wondering if you can help me with a problem I've been having.</span></div>
                                                        <p className="small text-gray-500 mb-0">Emily Fowler - 58m</p>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                            </div>
                                        </div>
                                        <div className="shadow dropdown-list dropdown-menu dropdown-menu-end" aria-labelledby="alertsDropdown"></div>
                                    </li>
                                    <div className="d-none d-sm-block topbar-divider"></div>
                                    <li className="nav-item dropdown no-arrow">
                                        <div className="nav-item dropdown no-arrow">
                                            <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                                                <span className="d-none d-lg-inline me-2 text-gray-600 small">Valerie Luna</span>
                                                <img className="border rounded-circle img-profile" src="/assets/img/avatars/avatar1.jpeg" />
                                            </a>
                                            <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                                                <a className="dropdown-item" href="#"><i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile</a>
                                                <a className="dropdown-item" href="#"><i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings</a>
                                                <a className="dropdown-item" href="#"><i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity log</a>
                                                <div className="dropdown-divider"></div>
                                                <Link className="dropdown-item" href="#" onClick={logout}><i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</Link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div className="container-fluid px-4">
                            {children}
                        </div>
                    </div>
                </div>
                <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
            </div>
        </div>
    );
};
