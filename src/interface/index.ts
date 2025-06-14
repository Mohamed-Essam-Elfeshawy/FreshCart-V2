import { SvgIconComponent } from "@mui/icons-material";

export interface ISignForm {
  id: keyof ISignupInput;
  type: string;
  title: string;
  placeholder: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}
export interface ISigninForm {
  id: keyof ILoginInput;
  type: string;
  title: string;
  placeholder: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}
export interface ILoginInput {
  email: string;
  password: string;
}
export interface ISignupInput {
  email: string;
  name: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface IHomeitems {
  icon: SvgIconComponent;
  title: string;
  refer: string;
}
export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IProduct {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: ICategory;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}
export interface ICartItem {
  count: number;
  _id: string;
  product: IProduct;
  price: number;
}

export interface ICart {
  _id: string;
  cartOwner: string;
  products: ICartItem[];
  createdAt: string;
  updatedAt: string;
  totalCartPrice: number;
  __v?: number;
}
export interface ICartResponse {
  status: "success" | "fail";
  numOfCartItems: number;
  cartId: string;
  data: ICart;
}
