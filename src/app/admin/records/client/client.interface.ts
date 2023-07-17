export interface IClient {
  id:             number;
  branch:         string;
  countrycode:    string;
  phone:          string;
  name:           string;
  email:          string;
  rfc:            string;
  type:           number;
  country:        string;
  zip:            string;
  state:          string;
  city:           string;
  population:     string;
  neighborhood:   string;
  street:         string;
  notes:          string;
  image_url:      string;
}

export var ClientVoid: IClient = {
  id:             0,
  branch:         '',
  countrycode:    '',
  phone:          '',
  // name:           'Venta al público',
  name:           '',
  email:          '',
  rfc:            '',
  type:           0,
  country:        '',
  zip:            '',
  state:          '',
  city:           '',
  population:     '',
  neighborhood:   '',
  street:         '',
  notes:          '',
  image_url:      'assets\\images\\clients\\default.webp'
}

export function clone(source:IClient, dest:IClient) : void {
  dest.id              = source.id;
  dest.branch          = source.branch;
  dest.countrycode     = source.countrycode;
  dest.phone           = source.phone;
  dest.name            = source.name;
  dest.email           = source.email;
  dest.rfc             = source.rfc;
  dest.type            = source.type;
  dest.country         = source.country;
  dest.zip             = source.zip;
  dest.state           = source.state;
  dest.city            = source.city;
  dest.population      = source.population;
  dest.neighborhood    = source.neighborhood;
  dest.street          = source.street;
  dest.notes           = source.notes;
  dest.image_url       = source.image_url;
}