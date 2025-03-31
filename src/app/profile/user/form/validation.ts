import * as Yup from 'yup';

export const validationSchema = Yup.object({
  department: Yup.string().required('Department required'),
  role: Yup.string().required('Role required'),
  username: Yup.string()
    .min(3, 'Minimum 3 characters')
    .required('Username required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email required'),
  customField: Yup.string(),
  isDisabled: Yup.boolean()
});
