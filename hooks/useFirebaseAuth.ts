import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react'
import { auth } from '@/lib';

export const useFirebaseAuth = () => {
    const router = useRouter();

    const login = useCallback(async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password).then(() => {

        });
    }, []);

    const register = useCallback(async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    }, []);

    const logout = useCallback(async () => {
        await auth.signOut();
        router.push('/login');
    }, []);

    return {
        login,
        register,
        logout
    }
}
