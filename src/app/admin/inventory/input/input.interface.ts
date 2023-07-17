import { IFile} from "src/app/common.interface";

export interface IInput {
  id:             number;
  status:         string;
  rec_total:      number;
  file:           IFile;
  created_date:   string;
}