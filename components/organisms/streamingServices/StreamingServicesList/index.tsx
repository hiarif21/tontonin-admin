import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useStreamingServices } from '../../../../context/streamingServicesContext';
import Icons from '../../../atoms/Icons';
import AlertDelete from '../../../molecules/commons/AlertDelete';
import Table from '../../../molecules/commons/Table';

const StreamingServicesList = () => {
  const router = useRouter();

  const { data, deleteData } = useStreamingServices();

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

  return (
    <>
      <AlertDelete
        data={alertDelete.data}
        show={alertDelete.show}
        onClick={handleClickAlertDelete}
      />
      <div className="p-5">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default StreamingServicesList;
