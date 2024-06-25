// components/Profile.js
import React from 'react';
import Image from 'next/image';
import { auth } from '@/lib';

const Profile = () => {
    return (
        <div className="profile text-center py-3">
            <Image
                src="/assets/images/avatar.png"
                alt="User Profile"
                width={100}
                height={100}
                className="rounded-circle"
            />
            <h5 className="text-light mt-2 text-wrap">{auth.currentUser ? auth.currentUser.email : 'Guest'}</h5>

        </div>
    );
};

export default Profile;
