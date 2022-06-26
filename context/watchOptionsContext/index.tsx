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

interface Props {
  children: ReactNode;
}

interface DataWatchOption {
  streaming_service: string;
  title: string;
  link_streaming: string;
}

const Context = createContext({});

export const WatchOptionsProvider = (props: Props) => {
  const [data, setData] = useState<any[]>([]);
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

  const deleteData = async (id: string) => {
    const result = await deleteWatchOption(id);

    if (result.success) {
      setData(data.filter((val) => val._id !== id));
      setTotalData(totalData - 1);
    }

    return result;
  };

  const createData = async (data: DataWatchOption) => {
    const result = await createWatchOption(data);

    if (result.success) loadData();

    return result;
  };

  const loadData = async (signal: AbortSignal | undefined = undefined) => {
    const result = await getWatchOptions({ title: filter.title }, signal);

    if (result?.success) {
      setData(result.data);
      setTotalData(result.total_data);
    }

    return result;
  };

  const getData = async (id: string) => {
    const result = await getWatchOption(id);
    return result;
  };

  const editData = async (
    id: string,
    newData: DataWatchOption,
    additionalData: { name: string }
  ) => {
    const result = await editWatchOption(id, newData);

    if (result.success) {
      setData(
        data.map((val) => {
          if (val._id === id) {
            return {
              ...val,
              streaming_service: {
                _id: newData.streaming_service,
                name: additionalData.name,
              },
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

export const useWatchOptions = () => {
  return useContext(Context);
};
