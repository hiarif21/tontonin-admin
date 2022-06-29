import { createContext, ReactNode, useContext, useState } from 'react';
import {
  createStreamingService,
  deleteStreamingService,
  editStreamingService,
  getStreamingService,
  getStreamingServices,
} from '../../services/api/streamingServices.service';
import {
  CreateStreamingService,
  DataStreamingService,
  DeleteStreamingService,
  EditStreamingService,
  GetStreamingService,
  GetStreamingServices,
  UseStreamingServices,
} from '../../types/streamingServices';

const Context = createContext({});

export const StreamingServicesProvider = (props: { children: ReactNode }) => {
  const [data, setData] = useState<DataStreamingService[]>([]);

  const deleteData: DeleteStreamingService = async (id) => {
    const result = await deleteStreamingService(id);

    if (result.success) setData(data.filter((val) => val._id !== id));

    return result;
  };

  const createData: CreateStreamingService = async (data) => {
    const result = await createStreamingService(data);

    if (result.success) loadData();

    return result;
  };

  const loadData: GetStreamingServices = async () => {
    const result = await getStreamingServices();

    if (result.success) setData(result.data);

    return result;
  };

  const getData: GetStreamingService = async (id) => {
    const result = await getStreamingService(id);
    return result;
  };

  const editData: EditStreamingService = async (id, newData) => {
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

  const store = {
    data,
    setData,
    deleteData,
    createData,
    getData,
    editData,
    loadData,
  };

  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

// @ts-ignore.
export const useStreamingServices: UseStreamingServices = () => {
  return useContext(Context);
};
