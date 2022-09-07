export interface navStyle {
    fontSize: string;
    color: string;
}
export interface userInfo {
    name: string;
    password: string;
}
export interface loginType {
    code: number;
    message: string;
    userName?: string;
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

