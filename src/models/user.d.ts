export interface navStyle {
    fontSize: string;
    color: string;
}
export interface userInfo {
    name: string;
    password: string;
}
export interface Info {
     avatar: string,
      chat: string,
       region: string,
        sign: string, 
        sex: number,
         name: string
     }

export interface loginType {
    code: number;
    message: string;
    userName?: string;
    Info: Info
}


export interface friend {
    id: number;
    user: string;
    friend: string;
    time: string;
    talk: number;
    isread: number;
    lastInfo: string
    avatar: string
}

export interface friendsType {
    friends: friend[]
}

export interface uploadImg {
    message: string;
    url: string;
}
