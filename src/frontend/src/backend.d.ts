import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Application {
    id: string;
    status: string;
    applicantName: string;
    applicantPhone: string;
    data: string;
    createdAt: Time;
    adminRemark: string;
    applicantEmail: string;
    applicationType: string;
}
export type Time = bigint;
export interface KycRecord {
    remark: string;
    status: string;
    bankDetails: string;
    userId: string;
    updatedAt: Time;
    photo: string;
    addressProof: string;
    panDoc: string;
    aadhaarDoc: string;
}
export interface Review {
    id: string;
    isApproved: boolean;
    createdAt: Time;
    reviewerName: string;
    comment: string;
    rating: bigint;
}
export interface User {
    id: string;
    dob: string;
    pan: string;
    status: string;
    name: string;
    designation: string;
    createdAt: Time;
    role: string;
    aadhaar: string;
    email: string;
    district: string;
    state: string;
    isVerified: boolean;
    fatherName: string;
    address: string;
    nomineeRelation: string;
    gender: string;
    nomineeName: string;
    passwordHash: string;
    mobile: string;
    pincode: string;
}
export interface backendInterface {
    approveReview(id: string): Promise<boolean>;
    createUser(user: User): Promise<string>;
    deleteReview(id: string): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>;
    getAllApplications(): Promise<Array<Application>>;
    getAllContent(): Promise<Array<[string, string]>>;
    getAllKyc(): Promise<Array<KycRecord>>;
    getAllReviews(): Promise<Array<Review>>;
    getAllUsers(): Promise<Array<User>>;
    getApplication(id: string): Promise<Application | null>;
    getContent(key: string): Promise<string | null>;
    getKyc(userId: string): Promise<KycRecord | null>;
    getUser(id: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    saveContent(key: string, value: string): Promise<void>;
    saveKyc(record: KycRecord): Promise<void>;
    submitApplication(app: Application): Promise<string>;
    submitReview(review: Review): Promise<string>;
    updateApplicationStatus(id: string, status: string, remark: string): Promise<boolean>;
    updateKycStatus(userId: string, status: string, remark: string): Promise<boolean>;
    updateUser(id: string, user: User): Promise<boolean>;
}
