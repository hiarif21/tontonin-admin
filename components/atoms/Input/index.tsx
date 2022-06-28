import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface InputProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  min?: number;
}

const Input = ({
  type,
  placeholder = 'Type here...',
  value,
  onChange,
  name,
  min,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      autoComplete="off"
      autoCorrect="off"
      className="w-full rounded-xl border-[1px] border-slate-300 p-4 font-medium placeholder:text-slate-300 focus:outline-1 focus:outline-slate-300 focus-visible:outline-none"
      min={min}
    />
  );
};

export default Input;
