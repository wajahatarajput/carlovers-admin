import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { useFirebaseAuth } from '@/hooks';
import { auth, db, defineAbilityFor, doc, getDoc } from '@/lib';
import { AbilityContext } from '@/context';
import { useRouter } from 'next/router';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    redirectRole: (role: string) => Promise<void>;
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
    const router = useRouter();
    const [ability, setAbility] = useState(() => defineAbilityFor({ role: 'admin' }));

    const checkUserRole = async (user: any) => {
        const docRef = doc(db, 'users', user.uid, 'profile', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const profileData = docSnap.data();
            if (profileData)
                localStorage.setItem('role', profileData?.role)
            setAbility(defineAbilityFor({ role: profileData.role }));
            redirectRole(profileData?.role);
        } else {
            setUser(null);
            setAbility(defineAbilityFor({ role: 'guest' })); // Set a default role if profile doesn't exist
        }
    };

    const redirectRole = async (role: string) => {
        const currentPath = router.pathname;
        let targetPath = '';

        switch (role) {
            case 'admin':
                targetPath = '/admin/dashboard';
                break;
            case 'workshop':
                targetPath = '/workshop/dashboard';
                break;
            case 'driver':
                targetPath = '/driver/dashboard';
                break;
            case 'owner':
                targetPath = '/owner/dashboard';
                break;
            default:
                targetPath = '/403';
        }

        if (currentPath !== targetPath) {
            router.push(targetPath);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (res) => {

            if (res) {
                const { token } = await res.getIdTokenResult();
                localStorage.setItem('firebaseToken', token.toString());
                setUser(res);
                // setAbility(defineAbilityFor({ role: 'admin' } as any));
                await checkUserRole(res);
            }
            setLoading(false);
        });

        setUser(auth.currentUser)

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, redirectRole }}>
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
