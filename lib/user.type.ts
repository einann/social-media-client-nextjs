export type UserType = {
    username: string,
    active: 'true' | 'false',
    authLevel: 'admin' | 'user',
    firstName: string,
    lastName: string,
    birthday: string,
    email: string,
    profilePicture: string,
    signUpDate: string,
    lastLoginDate: string,
    gender: 'Male' | 'Female',
    verified: 'true' | 'false',
}