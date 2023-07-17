export interface INavNotification {
  id:             number;
  header:         string;
  body:           string;
  type:           string;
  status:         string;
  user:           number;
  class_image:    string;
  created_date:   Date;
  timediff:       string;
  color:          string;
}

export interface IPrinterCalc {
  type:           string;
  b1000:          number;
  b500:           number;
  b200:           number;
  b100:           number;
  b50:            number;
  b20:            number;
  c50:            number;
  c20:            number;
  c10:            number;
  c5:             number;
  c2:             number;
  c1:             number;
  total:          number;
  drawer:         string;
}