import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
});
