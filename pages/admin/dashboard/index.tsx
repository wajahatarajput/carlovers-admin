import { AuthGuard } from '@/components';
import { Layout } from '@/layout';
import { useAuth } from '@/providers';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <AuthGuard requiredAbility={['manage', 'all']}>
            <Layout>
                <div className="container">
                    <h1>Dashboard</h1>
                    <p>Welcome, {user?.email}</p>
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                </div>
            </Layout>
        </AuthGuard>
    );
};

export default Dashboard;
