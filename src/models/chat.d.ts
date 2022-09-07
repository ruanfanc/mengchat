import { information, informations } from './chat.d';


export interface information {
    id?: number;
    fromname: string;
    toname: string;
    message: string;
    time: string;
}

export interface informations {
    informations: information[]
}