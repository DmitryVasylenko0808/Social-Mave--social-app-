export type UserDetails = {
    _id: string;
    email: string;
    firstName: string;
    secondName: string;
    followers: string[];
    followings: string[];
    bio?: string;
    avatar?: string;
    cover?: string;
} 

export type GetOneUserDto = UserDetails;