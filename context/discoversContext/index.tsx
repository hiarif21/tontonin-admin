import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createDiscover,
  deleteDiscover,
  editDiscover,
  getDiscover,
  getDiscovers,
} from '../../services/api/discovers.service';
import {
  CreateDiscover,
  DataDiscover,
  DeleteDiscover,
  EditDataDiscovers,
  GetDiscover,
  LoadDataDiscovers,
  UseDiscovers,
} from '../../types/discovers';

const Context = createContext({});

export const DiscoversProvider = (props: { children: ReactNode }) => {
  const [data, setData] = useState<DataDiscover[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [dataSingle, setDataSingle] = useState<DataDiscover>({
    _id: '',
    title: '',
    movies: [],
  });
  const [totalMovies, setTotalMovies] = useState(0); // total movies in single data
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

  const deleteData: DeleteDiscover = async (id) => {
    const result = await deleteDiscover(id);

    if (result.success) {
      setData(data.filter((val) => val._id !== id));
      setTotalData(totalData - 1);
    }

    return result;
  };

  const createData: CreateDiscover = async (data) => {
    const result = await createDiscover(data);

    if (result.success) loadData();

    return result;
  };

  const loadData: LoadDataDiscovers = async (signal = undefined) => {
    const result = await getDiscovers({ title: filter.title }, signal);

    if (result?.success) {
      setData(result.data);
      setTotalData(result.total_data);
    }

    return result;
  };

  const getData: GetDiscover = async (id) => {
    const result = await getDiscover(id);

    if (result?.success) {
      setDataSingle(result.data!);
      setTotalMovies(result.total_movies);
    }

    return result;
  };

  const editData: EditDataDiscovers = async (id, newData, additionalData) => {
    const result = await editDiscover(id, newData);

    if (result.success) {
      setData(
        data.map((val) => {
          if (val._id === id) {
            return {
              ...val,
              movies: newData.movies.map((val) => {
                return additionalData.movies.find(
                  (value) => value._id === val
                )!;
              }),
              title: newData.title,
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
      const result = await getDiscovers({
        page: count,
        title: filter.title,
      });
      setData([...data, ...result.data]);
      setTotalData(result.total_data);
    }
  };

  const loadMoreDataSingle = async (id: string) => {
    let count = Math.floor(dataSingle!.movies.length / 10 + 1);

    if (dataSingle!.movies.length < totalMovies) {
      const result = await getDiscover(id, {
        page: count,
      });
      setDataSingle({
        ...dataSingle!,
        movies: [...dataSingle!.movies, ...result.data!.movies],
      });
      setTotalMovies(result.total_movies);
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
    dataSingle,
    loadMoreDataSingle,
  };

  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

// @ts-ignore
export const useDiscovers: UseDiscovers = () => {
  return useContext(Context);
};
