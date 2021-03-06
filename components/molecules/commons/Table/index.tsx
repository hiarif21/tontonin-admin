import { TableProps } from '../../../../types/commons';
import TableData from '../../../atoms/Table/TableData';
import TableHeader from '../../../atoms/Table/TableHeader';

const Table = ({ columns, dataSource }: TableProps) => {
  return (
    <>
      {columns && dataSource && dataSource.length !== 0 ? (
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              {columns.map(({ title }, index) => {
                return <TableHeader key={index}>{title}</TableHeader>;
              })}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((value, index) => {
              return (
                <tr key={value._id | index}>
                  {columns.map((val, idx) => {
                    const key = val.dataIndex;
                    return (
                      <TableData title={value[val.dataIndex]} key={idx}>
                        {val.render
                          ? val.render(eval('value.' + key), value)
                          : eval('value.' + key)}
                      </TableData>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full text-center text-xs">Data Not Found!</div>
      )}
    </>
  );
};

export default Table;
