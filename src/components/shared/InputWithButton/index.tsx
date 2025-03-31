import { TextInput, Button } from '@carbon/react';

interface InputWithButtonProps {
  id: string;
  labelText: string;
  buttonText: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: string;
}

export const InputWithButton = ({
  id,
  labelText,
  buttonText,
  value,
  onChange,
  onBlur,
  onButtonClick,
  disabled,
  invalid,
  invalidText,
}: InputWithButtonProps) => {
  return (
    <div className="flex gap-2 items-end">
      <TextInput
        id={id}
        labelText={labelText}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        invalid={invalid}
        invalidText={invalidText}
      />
      <Button onClick={onButtonClick} disabled={disabled}>
        {buttonText}
      </Button>
    </div>
  );
};
