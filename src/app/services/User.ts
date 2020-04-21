export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  phoneNumber: string;
}

export interface AppUser extends User {
  firstName: string;
  familyName: string;
  address: string;
}
