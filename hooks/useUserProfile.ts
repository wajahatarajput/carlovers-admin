import { useState, useEffect, useCallback } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { auth, db, storage } from '@/lib';
import { server } from '@/helpers';
import { useProfile } from '@/providers';

interface Profile {
    uid: string;
    email: string;
    fname?: string;
    lname?: string;
    line1?: string;
    line2?: string;
    country?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    phonenumber?: string;
    hostimage?: string;
    customerid?: string;
}

const useUserProfile = (profile: Profile) => {
    const navigate = useRouter();
    const [loading, setLoading] = useState(true);

    const [newFName, setNewFName] = useState("");
    const [newLName, setNewLName] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDob, setNewDob] = useState("");

    const [newAddress2, setNewAddress2] = useState("");
    const [country, setCountry] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newState, setNewState] = useState("");
    const [newZip, setNewZip] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);

    const [existingUser, setExistingUser] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const { fetchProfile } = useProfile();

    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const file = (e.target as any)[1].files[0];
        toast.info("Uploading data, please wait!");
        file ? uploadFiles(file) : addUserData(profileImage);
    };

    const addUserData = async (url: string) => {
        const dataObj: any = {
            uid: auth?.currentUser?.uid,
            city: newCity,
            country: country,
            line1: newAddress,
            line2: newAddress2,
            fname: newFName,
            lname: newLName,
            dob: newDob,
            state: newState,
            latitude: lat,
            longitude: long,
            zipcode: newZip,
            phonenumber: newNumber,
            hostimage: url,
            setupintentid: '',
            client_secret: '',
            customerid: ''
        };

        if (!existingUser) {
            const email = auth.currentUser?.email;
            const response = await server.post("/createcustomer", {
                email,
                name: newFName,
                city: newCity,
                state: newState,
                zipcode: newZip,
                line1: newAddress,
                line2: newAddress2,
                country,
                phone: newNumber
            });

            if (response.data.id) {
                dataObj.customerid = response.data.id;
                const setupIntentResponse = await server.post("/createsetupintent", { customerid: response.data.id });

                if (setupIntentResponse.data.client_secret) {
                    dataObj.setupintentid = setupIntentResponse.data.id;
                    dataObj.client_secret = setupIntentResponse.data.client_secret;
                } else {
                    toast.error("Error creating Customer Setup Card Intent!");
                    return;
                }
            } else {
                toast.error("Error creating Customer Account!");
                return;
            }

            try {
                await updateDoc(doc(db, "users", auth?.currentUser?.uid as string), dataObj);

                toast("Successfully Inserted!");
            } catch {
                toast("Error Inserting Data, Try Again!");
                setDisabled(false);
                return;
            }
        } else {
            try {
                await updateDoc(doc(db, 'users', auth?.currentUser?.uid as string), dataObj);
                toast("Successfully Updated!");
            } catch {
                toast("Error Updating Data, Try Again!");
                setDisabled(false);
                return;
            }
        }

        fetchProfile().then(() => {
            setShowSpinner(false);
            // navigate("/home");
        });
    };

    const uploadFiles = async (file: File) => {
        if (file) {
            const ext = file.name.split(".").pop();
            const storageRef = ref(storage, `/Profiles/${auth?.currentUser?.uid}-Profile.${ext}`);
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            toast.success("Image Upload Successful");
            toast.info("Uploading Data");
            addUserData(url);
        } else {
            addUserData(profileImage);
        }
    };

    const checkProfile = useCallback(() => {
        if (profile?.customerid === undefined) {
            toast.error("Please create your profile before adding vehicles.");
            setTimeout(() => {
                navigate.push("/profile");
            }, 5000);
        }
    }, [profile, navigate]);

    useEffect(() => {
        checkProfile();
        navigator.geolocation.getCurrentPosition((pos) => {
            setLat(pos.coords.latitude);
            setLong(pos.coords.longitude);
        });

        const getUsers = async () => {
            try {
                const user = profile;
                if (user?.fname) {
                    setNewFName(user.fname);
                    setNewLName(user.lname || '');
                    setNewAddress(user.line1 || '');
                    setNewAddress2(user.line2 || '');
                    setCountry(user.country || '');
                    setNewCity(user.city || '');
                    setNewState(user.state || '');
                    setNewZip(user.zipcode || '');
                    setNewNumber(user.phonenumber || '');
                    setProfileImage(user.hostimage || '');
                    setExistingUser(true);
                }
            } catch (err) {
                console.error(err);
            }
        };

        setLoading(false);
        getUsers();
    }, [profile, checkProfile]);

    return {
        loading,
        newFName,
        newLName,
        newAddress,
        newDob,
        newAddress2,
        country,
        newCity,
        newState,
        newZip,
        newNumber,
        profileImage,
        disabled,
        showSpinner,
        createUser,
        setNewFName,
        setNewLName,
        setNewAddress,
        setNewDob,
        setNewAddress2,
        setCountry,
        setNewCity,
        setNewState,
        setNewZip,
        setNewNumber,
        setProfileImage,
        setDisabled,
    };
};

export default useUserProfile;
