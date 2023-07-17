export interface IProvider {
  id:             number;
  name:           string;
  email:          string;
  country:        string;
  zip:            string;
  address:        string;
  city:           string;
  state:          string;
  countrycode:    string;
  phone:          string;
  rfc:            string;
  credit_per_pay: string;
  credit_limit:   string;
  is_active:      boolean;
  image_url:      string;
}

export var ProviderVoid: IProvider = {
  id:             0,
  name:           '',
  email:          '',
  country:        '',
  zip:            '',
  address:        '',
  city:           '',
  state:          '',
  countrycode:    '',
  phone:          '',
  rfc:            '',
  credit_per_pay: '',
  credit_limit:   '',
  is_active:      true,
  image_url:      'assets/images/avatars/default.webp'
}

export function clone(source:IProvider, dest:IProvider) : void {
  dest.id              = source.id;
  dest.name            = source.name ;
  dest.name            = source.name ;
  dest.country         = source.country;
  dest.zip             = source.zip;
  dest.address         = source.address;
  dest.city            = source.city;
  dest.state           = source.state;
  dest.countrycode     = source.countrycode;
  dest.phone           = source.phone;
  dest.rfc             = source.rfc;
  dest.credit_per_pay  = source.credit_per_pay;
  dest.credit_limit    = source.credit_limit;
  dest.is_active       = source.is_active;
  dest.image_url       = source.image_url;
}