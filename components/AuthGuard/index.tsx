import { useRouter } from 'next/router';
import { useContext, useEffect, ReactNode } from 'react';
import { AbilityContext } from '@/context';
import { useAuth } from '@/providers';

interface AuthGuardProps {
    children: ReactNode;
    requiredAbility?: [string, string];
}

export const AuthGuard = ({ children, requiredAbility }: AuthGuardProps) => {
    const { user, loading } = useAuth();
    const ability = useContext(AbilityContext);
    const router = useRouter();

    console.log(requiredAbility)
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (requiredAbility && !ability.can(...requiredAbility)) {
                router.push('/403');
            }
        }
    }, [user, loading, ability, requiredAbility, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user && (!requiredAbility || ability.can(...requiredAbility))) {
        return <>{children}</>;
    }

    return null;
};
