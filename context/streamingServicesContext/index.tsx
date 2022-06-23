import { createContext, ReactNode, useContext, useState } from 'react';
import {
  createStreamingService,
  deleteStreamingService,
  editStreamingService,
  getStreamingService,
  getStreamingServices,
} from '../../services/api/streamingServices.service';

interface Props {
  children: ReactNode;
}

const Context = createContext({});

export const StreamingServicesProvider = (props: Props) => {
  const [data, setData] = useState<any[]>([]);

  const deleteData = async (id: string) => {
    const result = await deleteStreamingService(id);

    if (result.success) setData(data.filter((val) => val._id !== id));

    return result;
  };

  const createData = async (data: { name: string }) => {
    const result = await createStreamingService(data);

    if (result.success) loadData();

    return result;
  };

  const loadData = async () => {
    const result = await getStreamingServices();

    setData(result.data);
  };

  const getData = async (id: string) => {
    const result = await getStreamingService(id);
    return result;
  };

  const editData = async (id: string, newData: { name: string }) => {
    const result = await editStreamingService(id, newData);

    if (result.success) {
      setData(
        data.map((val) => {
          if (val._id === id) {
            return { ...val, name: newData.name };
          }
          return val;
        })
      );
    }

    return result;
  };

  const store = { data, setData, deleteData, createData, getData, editData };

  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

export const useStreamingServices = () => {
  return useContext(Context);
};
