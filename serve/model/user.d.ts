export interface userInfo {
    id: number;
    name: string;
    password: number;
    imgUrl: string;
}

export interface friend {
    id: number;
    user: string;
    friend: string;
    time: string;
    talk: number;
    isread: number;
    lastInfo: string
}

export interface friendsType {
    friends: friend[]
}

