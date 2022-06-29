import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { usePersons } from '../../../../context/personsContext';
import useInfinite from '../../../../hooks/useInfinite';
import { DataPerson } from '../../../../types/persons';
import Icons from '../../../atoms/Icons';
import AlertDelete from '../../../molecules/commons/AlertDelete';
import Table from '../../../molecules/commons/Table';

const PersonsList = () => {
  const router = useRouter();
  const refLastElement = useRef(null);

  const { data, deleteData, loadMoreData } = usePersons();

  useInfinite(refLastElement, loadMoreData);

  const [alertDelete, setAlertDelete] = useState({
    id: '',
    data: '',
    show: false,
    delete: false,
  });

  const handleClickDelete = (name: string, id: string) => {
    setAlertDelete({ ...alertDelete, id, data: name, show: true });
  };

  const handleClickAlertDelete = (x: boolean) => {
    setAlertDelete({ ...alertDelete, delete: x, show: false });
  };

  useEffect(() => {
    (async () => {
      if (alertDelete.delete) {
        const result = await deleteData(alertDelete.id);
        result.success ? toast(result.message) : toast.error(result.message);

        setAlertDelete({ ...alertDelete, show: false, delete: false });
      }
    })();
  }, [alertDelete, deleteData]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Action',
      render: (_: string, { name, _id }: { name: string; _id: string }) => {
        return (
          <>
            <button
              onClick={() =>
                router.push(`?method=edit&id=${_id}`, `${router.pathname}`, {
                  shallow: true,
                })
              }>
              <Icons icon={'Edit'} color={'primary'} size={'small'} />
            </button>
            <button onClick={() => handleClickDelete(name, _id)}>
              <Icons icon={'Delete'} color={'danger'} size={'small'} />
            </button>
          </>
        );
      },
    },
  ];

  const dataSource = data.map((val: DataPerson) => {
    return { ...val, role: val.role.name };
  });

  return (
    <>
      <AlertDelete
        data={alertDelete.data}
        show={alertDelete.show}
        onClick={handleClickAlertDelete}
      />
      <div>
        <Table columns={columns} dataSource={dataSource} />
        <div ref={refLastElement}></div>
      </div>
    </>
  );
};

export default PersonsList;
