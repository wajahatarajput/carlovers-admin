export interface UserProfileInputs {
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    dob?: string;
    profilePicture?: File | string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
    phone?: string;
    role?: string;
}