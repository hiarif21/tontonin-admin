import { ChangeEvent } from 'react';
import Input from '../../../atoms/Input';

interface SearchFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchField = ({ value, onChange }: SearchFieldProps) => {
  return (
    <>
      <label>
        <Input
          type={'search'}
          value={value}
          onChange={onChange}
          placeholder="Search here..."
        />
      </label>
    </>
  );
};

export default SearchField;
