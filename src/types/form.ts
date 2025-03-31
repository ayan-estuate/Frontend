export interface FormValues {
  department: string;
  role: string;
  username: string;
  email: string;
  customField: string;
  isDisabled?: boolean;
}

export interface FormState {
  data: FormValues | null;
  loading: boolean;
  error: string | null;
}

export type FormErrors = Partial<Record<keyof FormValues, string>>;
