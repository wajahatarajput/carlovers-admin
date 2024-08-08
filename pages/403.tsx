// pages/403.tsx
import Link from 'next/link';

export default function Forbidden() {
    return (
        <div className="container">
            <h1>403 - Forbidden</h1>
            <p>You do not have permission to access this page.</p>
            <Link href="/" passHref>
                <button className="btn btn-purple">Go to Home</button>
            </Link>
        </div>
    );
}
