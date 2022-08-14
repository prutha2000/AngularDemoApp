import { Photo } from "./photo";

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    createdOn: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interestedIn?: any;
    city: string;
    country: string;
    photos: Photo[];
}