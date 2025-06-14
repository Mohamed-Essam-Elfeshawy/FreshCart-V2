import { IHomeitems, ISignForm, ISigninForm } from "@/interface";
import slide1 from "../images/slide1.jpg";
import slide2 from "../images/slide2.avif";
import slide3 from "../images/slide3.avif";
import slide4 from "../images/slide4.avif";
import slide5 from "../images/slide5.avif";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HomeIcon from "@mui/icons-material/Home";
import DiamondIcon from "@mui/icons-material/Diamond";
import WorkIcon from "@mui/icons-material/Work";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import RefreshIcon from "@mui/icons-material/Refresh";
import PaymentIcon from "@mui/icons-material/Payment";
import CallIcon from "@mui/icons-material/Call";
export const slideLogin = [slide1, slide2, slide3, slide4, slide5];
export const slideHome = [slide2, slide3, slide4, slide5];

export const signupFormInputs: ISignForm[] = [
  {
    id: "name",
    type: "text",
    title: "Full name",
    placeholder: "Enter Full Name",
    validation: {
      required: true,
      minLength: 3,
    },
  },
  {
    id: "email",
    type: "email",
    title: "Email address",
    placeholder: "Enter Email",
    validation: {
      required: true,
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
  },
  {
    id: "phone",
    type: "text",
    title: "Phone",
    placeholder: "Enter Phone",
    validation: {
      required: true,
      pattern: /^01[0-2|5]{1}[0-9]{8}$/,
    },
  },
  {
    id: "password",
    type: "password",
    title: "Password ",
    placeholder: "Enter Passward",
    validation: {
      required: true,
      minLength: 6,
    },
  },
  {
    id: "rePassword",
    type: "password",
    title: "Confirm Password ",
    placeholder: "Confirm Passward",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];
export const signinFormInputs: ISigninForm[] = [
  {
    id: "email",
    type: "text",
    title: "Email address",
    placeholder: "Enter Email",
    validation: {
      required: true,
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
  },
  {
    id: "password",
    type: "password",
    title: "Password ",
    placeholder: "Enter Passward",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const homeItems: IHomeitems[] = [
  {
    icon: CardGiftcardIcon,
    title: "Gifts Box",
    refer: "30 Items",
  },
  {
    icon: HomeIcon,
    title: "Home & Living",
    refer: "25 Items",
  },
  {
    icon: DiamondIcon,
    title: "Categories",
    refer: "15 Items",
  },
  {
    icon: WorkIcon,
    title: "Office Stuff",
    refer: "40 Items",
  },
];
export const serviesItems: IHomeitems[] = [
  {
    icon: DeliveryDiningIcon,
    title: "Free Delivery",
    refer: "Order Over $120",
  },
  {
    icon: RefreshIcon,
    title: "Get Refund",
    refer: "With 30 Days Returns",
  },
  {
    icon: PaymentIcon,
    title: "Safe Payment",
    refer: "100% Secure Payment",
  },
  {
    icon: CallIcon,
    title: "24/7 Support Stuff",
    refer: "Feel Free To Call Us",
  },
];
export const bestSell = {
  paragraph:
    " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit in dignissimos quas aperiam rerum facere distinctio labore reiciendis velit eos.",
  button: "  Explore More",
};
export const detalisCategory: { name: string; referApi: string }[] = [
  {
    name: "Category",
    referApi: "_id",
  },
  {
    name: "Slug",
    referApi: "slug",
  },
  {
    name: "Created",
    referApi: "createdAt",
  },
];
export const categorizedBrands = {
  Electronics: [
    "Canon",
    "Dell",
    "Lenovo",
    "SONY",
    "Infinix",
    "Realme",
    "HONOR",
    "Nokia",
    "OPPO",
    "Huawei",
    "Apple",
    "Xiaomi",
    "Samsung",
    "Philips",
    "Toshiba",
    "Tornado",
    "Braun",
    "Kenwood",
    "Black + Decker",
    "Mienta",
    "Fresh",
    "Beko",
  ],
  Fashion: [
    "Jack & Jones",
    "LC Waikiki",
    "Andora",
    "Puma",
    "Skechers",
    "Reserved",
    "Reebok",
    "Adidas",
    "Nike",
    "DeFacto",
  ],
  Beauty: [
    "Garnier",
    "Essence",
    "Bourjois",
    "Kemei",
    "Carolina Herrera",
    "Calvin Klein",
    "Loreal",
    "Maybelline",
  ],
};
//export const btnBrand: string[] = ["All", "Electronics", "Fashion", "Beauty"];
export const btnBrand: string[] = [
  "men's-fashion",
  "women's-fashion",
  "electronics",
];
