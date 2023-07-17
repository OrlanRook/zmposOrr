export enum PRICE{
    PUBLIC          = 0,
    TECHNICIAN      = 1,
    WHOLESALE       = 2,
    DISTRIBUTOR     = 3,
    BRANCH          = 4
}

export interface IInventory {
    product:        number;
    branch:         number;
    stock:          number;
}

export interface IItem {
    id:             number; 
    code:           string;
    shortname:      string;
    description:    string;
    sku:            string;
    base:           number;
    price:          number;
    image_url:      string;
    provider:       string;
    line:           string;
    stock:          number;
    quantity:       number;
    isNewPrice:     boolean;
    public:         number;
    technician:     number;
    wholesale:      number;
    distributor:    number;
    branch:         number;
    product_stock:  IInventory[];
    disc_total:     number;
    disc_minimum:   number;
    disc_percent:   number;
    disc_amount:    number;

}

export interface INewItem {
    id:             number;
    code:           string;
    shortname:      string;
    description:    string;
    sku:            string;
    price:          number;
    image_url:      string;
    line:           number;
    subline1:       number;
    subline2:       number;
    public:         number;
    technician:     number;
    wholesale:      number;
    distributor:    number;
    branch:         number;
}