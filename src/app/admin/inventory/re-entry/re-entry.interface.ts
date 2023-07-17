export interface IReentry {
    id:             number; 
    branch:         number;
    status:         string;
    quantity:       string;
    total:          string;
    notes:          string;
    items:          IReentryItem[];
    created_date:   string;
    created_by:     string;
  }
  
  export interface IReentryItem {
    product:        number; 
    stock:          number;
  }