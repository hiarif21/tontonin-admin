import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createWatchOption,
  deleteWatchOption,
  editWatchOption,
  getWatchOption,
  getWatchOptions,
} from '../../services/api/watchOptions.service';
import {
  CreateWatchOption,
  DataWatchOption,
  DeleteWatchOption,
  EditDataWatchOptions,
  GetWatchOption,
  LoadDataWatchOptions,
  UseWatchOptions,
} from '../../types/watchOptions';

const Context = createContext({});

export const WatchOptionsProvider = (props: { children: ReactNode }) => {
  const [data, setData] = useState<DataWatchOption[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [filter, setFilter] = useState({
    title: '',
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    loadData(signal);

    return () => {
      abortController.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const deleteData: DeleteWatchOption = async (id) => {
    const result = await deleteWatchOption(id);

    if (result.success) {
      setData(data.filter((val) => val._id !== id));
      setTotalData(totalData - 1);
    }

    return result;
  };

  const createData: CreateWatchOption = async (data) => {
    const result = await createWatchOption(data);

    if (result.success) loadData();

    return result;
  };

  const loadData: LoadDataWatchOptions = async (signal = undefined) => {
    const result = await getWatchOptions({ title: filter.title }, signal);

    if (result?.success) {
      setData(result.data);
      setTotalData(result.total_data);
    }

    return result;
  };

  const getData: GetWatchOption = async (id) => {
    const result = await getWatchOption(id);
    return result;
  };

  const editData: EditDataWatchOptions = async (
    id,
    newData,
    additionalData
  ) => {
    const result = await editWatchOption(id, newData);

    if (result.success) {
      setData(
        data.map((val) => {
          if (val._id === id) {
            return {
              ...val,
              streaming_service: additionalData.streaming_services.find(
                (value) => value._id === newData.streaming_service
              )!,
              title: newData.title,
              link_streaming: newData.link_streaming,
            };
          }
          return val;
        })
      );
    }

    return result;
  };

  const loadMoreData = async () => {
    let count = Math.floor(data.length / 10 + 1);

    if (data.length < totalData) {
      const result = await getWatchOptions({
        page: count,
        title: filter.title,
      });
      setData([...data, ...result.data]);
      setTotalData(result.total_data);
    }
  };

  const store = {
    data,
    setData,
    deleteData,
    createData,
    getData,
    editData,
    setTotalData,
    loadMoreData,
    loadData,
    filter,
    setFilter,
  };

  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

// @ts-ignore.
export const useWatchOptions: UseWatchOptions = () => {
  return useContext(Context);
};
