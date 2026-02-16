import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Profile {
    bio: string;
    displayName: string;
    socialLinks: Array<string>;
    email: string;
    phone?: string;
}
export interface UserProfile {
    name: string;
    email?: string;
}
export interface WorkItem {
    id: bigint;
    title: string;
    date: Time;
    link?: string;
    description: string;
    isVideo: boolean;
    orderIndex: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addWorkItem(newWork: {
        title: string;
        link?: string;
        description: string;
        isVideo: boolean;
    }): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteWorkItem(id: bigint): Promise<void>;
    getAllWorkItems(): Promise<Array<WorkItem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProfile(): Promise<Profile | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVideoWorkItems(): Promise<Array<WorkItem>>;
    getWorkItem(id: bigint): Promise<WorkItem | null>;
    initialize(adminToken: string, userProvidedToken: string): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isOwner(): Promise<boolean>;
    reorderWorkItems(newOrderIds: Array<bigint>): Promise<void>;
    saveCallerUserProfile(userProfile: UserProfile): Promise<void>;
    updateProfile(newProfile: Profile): Promise<void>;
}
