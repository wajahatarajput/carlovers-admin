import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { useFirebaseAuth } from '@/hooks';
import { auth, db, defineAbilityFor, doc, getDoc } from '@/lib';
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
    const [user, setUser] = useState<User | null>(auth.currentUser || null);
    const { login, register, logout } = useFirebaseAuth();
    const [loading, setLoading] = useState(true);
    const [ability, setAbility] = useState(() => defineAbilityFor({ role: 'admin' }));

    const checkUserRole = async (user: any) => {
        const docRef = doc(db, 'users', user.uid, 'profile', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const profileData = docSnap.data();
            if (profileData)
                localStorage.setItem('role', profileData?.role)
            setAbility(defineAbilityFor({ role: profileData.role }));
        } else {
            setAbility(defineAbilityFor({ role: 'guest' })); // Set a default role if profile doesn't exist
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (res) => {
            if (res) {
                const token = await res.getIdTokenResult();
                setUser(res);
                setAbility(defineAbilityFor({ role: 'admin' } as any));
                await checkUserRole(res);
            } else {
                setUser(null);
                setAbility(defineAbilityFor({ role: 'guest' }));
            }
            setLoading(false);
        });

        setUser(auth.currentUser)

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
