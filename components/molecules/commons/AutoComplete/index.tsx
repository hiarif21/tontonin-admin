import classNames from 'classnames';
import { ChangeEvent, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import Icons from '../../../atoms/Icons';
import Table from '../Table';
import TextField from '../TextField';

interface AutoCompleteProps {
  label: string;
  valueSearch: string;
  nameSearch: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  dataList: any;
  dataIndexList: string;
  onDeleteList: (x: string) => void;
  onClickList: (val: any, name: string) => void;
  selectedData: any;
}

const AutoComplete = ({
  label,
  valueSearch,
  nameSearch,
  onChangeSearch,
  dataList,
  dataIndexList,
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

  const columns = [
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
            'absolute flex w-full flex-col overflow-hidden rounded-xl rounded-b-xl bg-white shadow-md',
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
                    {val[dataIndexList]}
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
