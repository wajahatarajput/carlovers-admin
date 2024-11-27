import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/providers';
import { auth, db, doc, getDoc, getDownloadURL, ref, setDoc, storage, uploadBytes } from '@/lib';
import { UserProfileInputs } from '@/types';
import { useRouter } from 'next/router';

export interface UserProfileContextProps {
    profile: UserProfileInputs | null;
    loading: boolean;
    error: string | null;
    fetchProfile: () => Promise<void>;
    updateProfile: (data: UserProfileInputs) => Promise<void>;
}

const ProfileContext = createContext<UserProfileContextProps | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const { user = auth.currentUser } = useAuth();

    const [profile, setProfile] = useState<UserProfileInputs | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchProfile = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        setError(null);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        try {

            if (docSnap.exists()) {
                setProfile(docSnap.data() as UserProfileInputs);
            } else {
                setProfile(null);
            }
        } catch (error: any) {
            toast.error(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const cleanData = (data: any) => {
        return Object.keys(data).reduce((acc: any, key) => {
            if (data[key] !== undefined) {
                acc[key] = data[key];
            }
            return acc;
        }, {});
    };

    const updateProfile = useCallback(async (data: UserProfileInputs) => {
        if (!auth.currentUser) return;
        setLoading(true);
        setError(null);
        try {
            if (data.profilePicture) {
                const profilePicRef = ref(storage, `profiles/${auth.currentUser.uid}/profilePicture`);
                await uploadBytes(profilePicRef, data.profilePicture as File);
                const profilePicUrl = await getDownloadURL(profilePicRef);
                data.profilePicture = profilePicUrl;
            }
            const filteredData = cleanData(data);
            const docRef = doc(db, 'users', auth.currentUser.uid);
            const res = await setDoc(docRef, filteredData, { merge: true });
            console.log('done')
            toast.success('Profile updated successfully');
            setProfile(data);
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user, fetchProfile]);

    return (
        <ProfileContext.Provider value={{ profile, loading, error, fetchProfile, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = (): UserProfileContextProps => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useUserProfile must be used within a UserProfileProvider');
    }
    return context;
};
