import { TextFieldProps } from '../../../../types/commons';
import Input from '../../../atoms/Input';

const TextField = ({
  type,
  placeholder,
  onChange,
  label,
  value,
  name,
  min,
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
        min={min}
      />
    </label>
  );
};

export default TextField;
