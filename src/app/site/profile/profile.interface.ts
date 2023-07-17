import { IDrawer, DrawerVoid } from "src/app/admin/drawers/drawers.interface";

export interface IRole {
  id:             number;
  name:           string;
}

export var RoleVoid: IRole = {
  id:             0,
  name:           ''
}

export interface ISettings {
  id:             number; 
  theme:          string;
  theme_header:   string;
  theme_sidebar:  string;
}

export var SettingsVoid: ISettings = {
  id:             0,
  theme:          '',
  theme_header:   '',
  theme_sidebar:  ''
}

export interface IProfile {
  id:             number; 
  prefix:         string;
  phone:          string;
  name:           string;
  image_url:      string;
  is_active:      boolean;
  is_staff:       boolean;
  role:           IRole;
  drawer:         IDrawer;
  settings:       ISettings;
  checked:        boolean;
}

export var ProfileVoid: IProfile = {
  id:             0,
  prefix:         '',
  phone:          '',
  name:           '',
  image_url:      'assets/images/users/default.webp',
  is_active:      true,
  is_staff:       false,
  role:           RoleVoid,
  drawer:         DrawerVoid,
  settings:       SettingsVoid,
  checked:        false
}

export function clone(source:IProfile, dest:IProfile) : void {
  dest.id             = source.id;
  dest.prefix         = source.prefix;
  dest.phone          = source.phone;
  dest.name           = source.name;
  dest.image_url      = source.image_url;
  dest.is_active      = source.is_active;
  dest.is_staff       = source.is_staff;
  dest.role           = source.role;
  dest.drawer         = source.drawer;
  dest.settings       = source.settings;
  dest.checked        = source.checked;
}