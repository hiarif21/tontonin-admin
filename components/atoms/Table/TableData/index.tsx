import { ReactNode } from 'react';

interface TableDataProps {
  children: ReactNode;
  title?: string;
}

const TableData = ({ children, title }: TableDataProps) => {
  return (
    <td
      title={title}
      className="gap-[10px] whitespace-nowrap p-4 first:w-full first:max-w-0 first:truncate first:pr-0 last:flex last:justify-center">
      {children}
    </td>
  );
};

export default TableData;
