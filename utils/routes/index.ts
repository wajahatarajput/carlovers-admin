// Define the type for a route
export interface Route {
    path: string;
    icon: string;
    text: string;
}


// Assuming ROUTES is imported from another file
const ADMIN_ROUTES: Route[] = [
    {
        path: '/admin/dashboard',
        icon: 'fas fa-tachometer-alt',
        text: 'Dashboard'
    },
    {
        path: 'subscription',
        icon: 'fas fa-dollar-sign',  // Corrected icon class for a dollar sign
        text: 'Subscriptions'
    },
    {
        path: 'services',
        icon: 'fas fa-user-cog',
        text: 'Services'
    }
];

// Assuming ROUTES is imported from another file
const WORKSHOP_ROUTES: Route[] = [
    {
        path: '/admin/dashboard',
        icon: 'fas fa-tachometer-alt',
        text: 'Dashboard'
    },
    {
        path: 'subscription',
        icon: 'fas fa-dollar-sign',  // Corrected icon class for a dollar sign
        text: 'Orders'
    },
    {
        path: 'services',
        icon: 'fas fa-user-cog',
        text: 'Transactions'
    }
];



export let ROUTES: Route[] = [];

const role = typeof window !== 'undefined' ? window.localStorage.getItem('role') : 'guest';


switch (role) {
    case 'admin':
        ROUTES = ADMIN_ROUTES;
        break;
    case 'workshop':
        ROUTES = WORKSHOP_ROUTES;
        break;
    default:
        ROUTES = [];
}

