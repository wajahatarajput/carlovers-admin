import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react'
import { auth } from '@/lib';
import { toast } from 'react-toastify';
import { useAuth, useUserProfile } from '@/providers';

export const useFirebaseAuth = () => {
    const router = useRouter();

    const login = useCallback(async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password).then((res) => {
            router.reload();
        });
    }, []);

    const register = useCallback(async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password).then(() => {
            toast.success("Signup SuccessFull");
            router.push('/profile');
        });
    }, []);

    const logout = useCallback(async () => {
        await auth.signOut();
        localStorage.clear();
        router.push('/login');
    }, []);

    return {
        login,
        register,
        logout
    }
}
