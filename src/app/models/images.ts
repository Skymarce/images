export interface IImages {
    photos: {
        page: number;
        pages: number;
        perpage: number;
        photo: [];
        total: number;
    }
    stat: string;
}

export interface IImage {
    datetaken: string;
    datetakengranularity: number;
    datetakenunknown: string;
    farm: number;
    fbId: string;
    height_m: number;
    height_q: number;
    id: string;
    isfamily: number;
    isfriend: number;
    ispublic: number;
    owner: string;
    ownername: string;
    secret: string;
    server: string;
    tags: string;
    title: string;
    url_m: string;
    url_q: string;
    width_m: number;
    width_q: number;
}

export interface FImage {
    id: string;
}