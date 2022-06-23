import { ReactNode } from 'react';

interface TableHeaderProps {
  children: ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps) => {
  return (
    <th className="p-4 first:rounded-l-xl first:pr-0 last:w-fit last:rounded-r-xl">
      {children}
    </th>
  );
};

export default TableHeader;
