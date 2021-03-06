import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { AutoCompleteProps } from '../../../../types/commons';
import Icons from '../../../atoms/Icons';
import Table from '../Table';
import TextField from '../TextField';

const AutoComplete = ({
  label,
  label2,
  valueSearch,
  nameSearch,
  onChangeSearch,
  dataList,
  dataIndexList,
  dataIndexList2,
  onClickList,
  selectedData,
  onDeleteList,
}: AutoCompleteProps) => {
  const ref = useRef(null);

  const [show, setShow] = useState(false);

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  let columns = [
    {
      title: label,
      dataIndex: dataIndexList,
    },
    {
      title: 'Action',
      render: (_: string, { _id }: { _id: string }) => {
        return (
          <>
            <button onClick={() => onDeleteList(_id)}>
              <Icons icon={'Delete'} color={'danger'} size={'small'} />
            </button>
          </>
        );
      },
    },
  ];

  if (dataIndexList2) {
    columns.splice(1, 0, {
      title: label2 ? label2 : '',
      dataIndex: dataIndexList2,
    });
  }

  return (
    <>
      <label onClick={() => setShow(!show)} className="relative">
        <TextField
          label={label}
          value={valueSearch}
          name={nameSearch}
          onChange={onChangeSearch}
          placeholder={'Search here...'}
        />
        <ul
          ref={ref}
          className={classNames(
            'absolute z-50 flex w-full flex-col overflow-hidden rounded-xl rounded-b-xl bg-white shadow-md',
            {
              hidden: !show,
            }
          )}>
          {dataList ? (
            dataList.map((val: any, idx: number) => {
              return (
                <li key={idx}>
                  <button
                    onClick={() => onClickList(val, nameSearch)}
                    disabled={
                      selectedData &&
                      selectedData.find((value: any) => value._id === val._id)
                    }
                    className="w-full px-5 py-3 text-left hover:bg-slate-100 disabled:bg-slate-100 disabled:text-slate-300">
                    {eval('val.' + dataIndexList)}
                    {dataIndexList2 && ' - ' + eval('val.' + dataIndexList2)}
                  </button>
                </li>
              );
            })
          ) : (
            <div className="flex w-full justify-center p-5">
              <span>not found</span>
            </div>
          )}
        </ul>
      </label>
      {selectedData && selectedData.length !== 0 && (
        <Table columns={columns} dataSource={selectedData} />
      )}
    </>
  );
};

export default AutoComplete;
