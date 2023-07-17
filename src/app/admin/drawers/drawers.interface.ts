import { IProfile } from "src/app/site/profile/profile.interface";

export interface IDrawer {
    id:             number;
    name:           string;
    branch:         number;
    assign:         boolean;
}

export var DrawerVoid: IDrawer = {
    id:             0,
    name:           '',
    branch:         0,
    assign:         false
}


export interface IDrawerAssign {
    id:             number;
    user:           IProfile;
    branch:         number;
    drawer:         IDrawer;
}

export interface IDrawerOp {
    id:              number;
    drawer:          number;
    operation:       string;
    deviation:       boolean;
    deviation_amt:   number;
    notes:           string;
    total:           number;
    b_1000:          number;
    b_500:           number;
    b_200:           number;
    b_100:           number;
    b_50:            number;
    b_20:            number;
    c_50:            number;
    c_20:            number;
    c_10:            number;
    c_5:             number;
    c_2:             number;
    c_1:             number;
    created_date:    string;
}