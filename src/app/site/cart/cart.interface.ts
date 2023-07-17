import { IItem } from "src/app/admin/items/item/item.interface";

export interface ICartItemFlat {
  id:             number;
  order:          number;
  item:           number;
  quantity:       number;
  price:          number;
}

export interface ICartItem {
  id:             number;
  order:          number;
  item:           IItem;
  quantity:       number;
  price:          number;
}
