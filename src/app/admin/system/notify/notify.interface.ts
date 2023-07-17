import { IProfile } from "src/app/site/profile/profile.interface";

export interface INotification {
  id:             number;
  header:         string;
  body:           string;
  expire:         string;
  status:         string;
  user:           IProfile;
  class_image:    string;
  created_date:   Date;
  type:           string;
  timediff:       string;
  color:          string;
}
