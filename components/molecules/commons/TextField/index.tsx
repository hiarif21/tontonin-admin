import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import Input from '../../../atoms/Input';

interface TextFieldProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name?: string;
}

const TextField = ({
  type,
  placeholder,
  onChange,
  label,
  value,
  name,
}: TextFieldProps) => {
  return (
    <label className="flex flex-col gap-2 font-bold">
      <span className="text-sm">{label}</span>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </label>
  );
};

export default TextField;
