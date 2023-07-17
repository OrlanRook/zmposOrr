import { IDrawer, IDrawerAssign } from "../../drawers/drawers.interface";

export interface IBranch {
    id:             number;
    name:           string;
    email:          string;
    address:        string;
    countrycode:    string;
    phone:          string;
    is_main:        number;
    drawers:        IDrawer[];
    drawer_assign:  IDrawerAssign[];
}

export var BranchVoid: IBranch = {
    id:             0,
    name:           '',
    email:          '',
    address:        '',
    countrycode:    '',
    phone:          '',
    is_main:        0,
    drawers:        [],
    drawer_assign:  []
}

export function clone(source:IBranch, dest:IBranch) : void {
    dest.id              = source.id;
    dest.name            = source.name;
    dest.email           = source.email;
    dest.address         = source.address;
    dest.countrycode     = source.countrycode;
    dest.phone           = source.phone;
    dest.drawers         = source.drawers;
    dest.drawer_assign   = source.drawer_assign;
}