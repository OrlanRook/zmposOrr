export interface ITransfer {
  id:             number; 
  branch:         number;
  status:         string;
  quantity:       string;
  total:          string;
  notes:          string;
  items:          ITransferItem[];
  created_date:   string;
  created_by:     string;
}

export interface ITransferItem {
  product:        number; 
  stock:          number;
}