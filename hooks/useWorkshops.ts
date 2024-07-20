import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuth, useUserProfile } from '@/providers';
import { db, storage, auth } from '@/lib';

export const useWorkshop = () => {
    const { profile } = useUserProfile();
    const { user }: any = useAuth();
    const [loading, setLoading] = useState(true);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [zipcode, setZipcode] = useState(profile?.zipcode || '');
    const [disabled, setDisabled] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [workshops, setWorkshops] = useState<any>([]);
    const router = useRouter();

    const getLocation = useCallback(async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            toast.error('Geolocation is not enabled in your browser. Please use a browser which supports it.');
        }
    }, []);

    const getWorkshops = useCallback(async (id: string) => {
        try {
            const q = query(collection(db, 'workshopsrequest'), where('uid', '==', id));
            const docs = await getDocs(q);
            if (docs.docs.length !== 0) {
                const driverData: any = docs.docs.map((doc) => doc.data());
                setWorkshops(driverData);
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    const uploadFiles = useCallback(async (file: File) => {
        if (!file) return;
        const ext = file.name.split('.').pop();
        const storageRef = ref(storage, `/Workshops/${user.uid}.${ext}`);
        return await uploadBytes(storageRef, file).then(async (snapshot) => {
            return await getDownloadURL(snapshot.ref);
        });
    }, [user]);

    const addWorkshopData = useCallback(
        async (url: string, url2: string) => {
            await setDoc(doc(db, 'workshopsrequest', user.uid), {
                uid: user.uid,
                username: user?.email,
                zipcode: profile?.zipcode || zipcode,
                status: 'Pending',
                workpermit: url,
                identificationdocument: url2,
                latitude: lat,
                longitude: long,
            }).catch(() => {
                toast.error('Error Inserting Data, Try Again!');
                setDisabled(false);
            });
            toast.success('Successfully Inserted! Please wait for the Admin to approve your Request!');
            setShowSpinner(false);
            setDisabled(false);
        },
        [lat, long, user, zipcode]
    );

    const createWorkshop = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setDisabled(true);
            setShowSpinner(true);
            const form = e.currentTarget;
            const file = (form[0] as HTMLInputElement).files?.[0];
            const file2 = (form[1] as HTMLInputElement).files?.[0];
            const url = await uploadFiles(file as File);
            const url2 = await uploadFiles(file2 as File);
            getLocation();
            addWorkshopData(url as string, url2 as string);
            toast.info('Uploading Please Wait! Do not touch anything we will redirect you after your request is processed');
            getWorkshops(user?.uid || auth?.currentUser?.uid);
        },
        [addWorkshopData, uploadFiles, getWorkshops, getLocation]
    );

    useEffect(() => {
        let time: NodeJS.Timeout | null = null;
        getWorkshops(user?.uid || auth?.currentUser?.uid);
        // time = setTimeout(() => {
        //   if (customerBankAccounts && customerBankAccounts.length <= 0) {
        //     getStripeDetails(
        //       '',
        //       cookies.get('currentUser').email || auth.currentUser.email
        //     ).then(() => {
        //       setLoading(false);
        //       if (customerBankAccounts && customerBankAccounts.length <= 0) {
        //         toast.error('Please add a Bank Account in order to become a driver or host.');
        //         router.push('/addbankaccount', { state: { driver: true } });
        //       }
        //     });
        //   }
        // }, 5000);

        if (workshops?.length <= 0) {
            getWorkshops(user?.uid || auth?.currentUser?.uid);
            setLoading(false);
        }
        try {
            getLocation().then(() => {
                if (workshops && workshops[0]?.status === 'Accepted')
                    router.push('/dashboard');
            });
        } catch (ex) {
            console.log(ex);
        }

        return () => {
            if (time) {
                clearTimeout(time);
            }
        };
    }, [router, getLocation, getWorkshops, workshops]);

    return {
        profile,
        loading,
        lat,
        long,
        zipcode,
        disabled,
        showSpinner,
        workshops,
        setZipcode,
        setDisabled,
        setShowSpinner,
        createWorkshop,
    };
};
