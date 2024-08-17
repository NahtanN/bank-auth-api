export interface UpdateUserRequestInterface {
  name: string;
  email: string;
  address: {
    zipcode: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement?: string;
  };
}
