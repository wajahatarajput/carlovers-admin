import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { useFirebaseAuth } from '@/hooks';
import { auth, defineAbilityFor } from '@/lib';
import { AbilityContext } from '@/context';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const { login, register, logout } = useFirebaseAuth();
    const [loading, setLoading] = useState(true);
    const [ability, setAbility] = useState(() => defineAbilityFor({ role: 'admin' }));

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const token = await user.getIdTokenResult();
                const userData = { ...user, role: token.claims.role } as User;
                setUser(userData);
                setAbility(defineAbilityFor({ role: 'admin' } as any));
                console.log(token);
            } else {
                setUser(null);
                setAbility(defineAbilityFor({ role: 'admin' }));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            <AbilityContext.Provider value={ability}>
                {children}
            </AbilityContext.Provider>
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
