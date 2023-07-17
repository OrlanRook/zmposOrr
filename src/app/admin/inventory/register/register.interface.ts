import { IFile} from "src/app/common.interface";

export interface IRegister {
  id:             number;
  status:         string;
  rec_total:      number;
  file:           IFile;
  created_date:   string;
}