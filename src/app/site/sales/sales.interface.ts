import { IItem } from "src/app/admin/items/item/item.interface";
import { ClientVoid, IClient } from "src/app/admin/records/client/client.interface";

export interface ISaleRaw {
  id:             number;
  client:         number | undefined;
  branch:         number;
  drawer:         number;
  total:          string;
  subtotal:       string;
  discount:       string;
  tax:            string;
  quantity:       number;
  status:         string;
  type:           string;
  notes:          string;
  created_date:   string;
  items:          ISaleItemRaw[];
  payments:       ISalePayment[];
  retref:         number | undefined;
}

export interface ISale {
  id:             number;
  client:         IClient;
  branch:         number;
  drawer:         number;
  total:          number;
  subtotal:       number;
  discount:       number;
  tax:            number;
  quantity:       number;
  status:         string;
  type:           string;
  notes:          string;
  created_date:   string;
  items:          ISaleItemRaw[];
  payments:       ISalePayment[];
  retref:         number;

  isCanceled:     boolean;
}
export var SaleVoid : ISale = {
  id:             0,
  client:         ClientVoid,
  branch:         0,
  drawer:         0,
  total:          0,
  subtotal:       0,
  discount:       0,
  tax:            0,
  quantity:       0,
  status:         '',
  type:           '',
  notes:          '',
  created_date:   '',
  items:          [],
  payments:       [],
  retref:         0,

  isCanceled:     false
}



export interface ISaleItemRaw {
  id:             number;
  sale:           number;
  item:           number;
  branch:         number;
  drawer:         number;
  returns:        number;
  quantity:       number;
  base:           string;
  price:          string;
  total:          string;
  disc_total:     number;
  disc_minimum:   number;
  disc_percent:   number;
  disc_amount:    number;
}

export interface ISaleItem {
  id:             number;
  sale:           ISale;
  item:           IItem;
  branch:         number;
  drawer:         number;
  returns:        number;
  quantity:       number;
  base:           string;
  price:          string;
  total:          string;
  disc_total:     number;
  disc_minimum:   number;
  disc_percent:   number;
  disc_amount:    number;
}

export interface ISaleItem2 {
  id:             number;
  sale:           number;
  item:           IItem;
  drawer:         number;
  returns:        number;
  quantity:       number;
  price:          string;
  total:          string;
}


export interface ISalePayment {
  id:             number;
  sale:           number;
  method:         string;
  branch:         number;
  drawer:         number;
  reference:      string;
  total:          string;
  cashback:       string;
  created_date:   string;
}

export interface IPrinterDB {
  type:           string;
  id:             string;
  customerId:     string;
  customer:       string;
  cashier:        string,
  drawer:         string,
  total:          string,
  subtotal:       string,
  discount:       string,
  tax:            string,
  cashback:       string,
  quantity:       string,
  created_date:   string,
  number2Word:    string,
  sale_item:      ISaleItem2[];
  sale_payment:   ISalePayment[];
}

export interface ISaleWeekly {
  year:           number,
  week:           number,
  quantity:       number,
  total:          number,
  goal:           number
}

export interface ISaleYearly {
  year:           number,
  month:          number,
  total:          number
}

export interface ISaleYearlySummary {
  att:            string,
  total:          number
}