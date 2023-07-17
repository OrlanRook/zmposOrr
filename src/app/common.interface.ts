import { IProfile } from "./site/profile/profile.interface";

export interface IFile {
  id:             number;
  path:           string;
  original_name:  string;
  url:            string;
  created_date:   string;
  created_by :    string;
}