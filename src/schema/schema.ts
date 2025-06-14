import * as yup from "yup";
export const schemaLogin = yup.object({
  email: yup
    .string()
    .required("Email is Required")
    .email("Enter vaild Email ex:test@test.com"),

  password: yup
    .string()
    .required("Passward is Required")
    .min(6, "Passward at least 6 Character or Number"),
});

export const schemaSignup = yup.object({
  name: yup
    .string()
    .required("YourName is Required ")
    .min(3, "Name at least 6 Character "),
  email: yup
    .string()
    .required("Email is Required")
    .email("Enter vaild Email ex:test@test.com"),
  phone: yup
    .string()
    .required("Phone is Required")
    .matches(
      /^01[0-2|5]{1}[0-9]{8}$/,
      "Enter Valid Number ex:[01(0,1,2,5)....]"
    ),
  password: yup
    .string()
    .required("Passward is Required")
    .min(6, "Passward at least 6 Character or Number"),
  rePassword: yup
    .string()
    .required("rePassward is Required")
    .oneOf([yup.ref("password")], "Password and Repassword Must be Match"),
});
