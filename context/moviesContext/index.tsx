import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createMovie,
  deleteMovie,
  editMovie,
  getMovie,
  getMovies,
} from '../../services/api/movies.service';

interface Props {
  children: ReactNode;
}

interface DataMovie {
  title: string;
  image: string;
  release_year: number;
  runtime: number;
  storyline: string;
  link_trailer: string;
  watch_options: string[];
  persons: string[];
  genres: string[];
}

const Context = createContext({});

export const MoviesProvider = (props: Props) => {
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
    const result = await deleteMovie(id);

    if (result.success) {
      setData(data.filter((val) => val._id !== id));
      setTotalData(totalData - 1);
    }

    return result;
  };

  const createData = async (data: DataMovie) => {
    const result = await createMovie(data);

    if (result.success) loadData();

    return result;
  };

  const loadData = async (signal: AbortSignal | undefined = undefined) => {
    const result = await getMovies({ title: filter.title }, signal);

    if (result?.success) {
      setData(result.data);
      setTotalData(result.total_data);
    }

    return result;
  };

  const getData = async (id: string) => {
    const result = await getMovie(id);
    return result;
  };

  const editData = async (
    id: string,
    newData: DataMovie,
    additionalData: {
      watch_options: { _id: string; title: string; link_streaming: string }[];
      persons: { _id: string; name: string }[];
      genres: { _id: string; name: string }[];
    }
  ) => {
    const result = await editMovie(id, newData);

    if (result.success) {
      setData(
        data.map((val) => {
          if (val._id === id) {
            return {
              ...val,
              title: newData.title,
              image: newData.image,
              release_year: newData.release_year,
              runtime: newData.runtime,
              storyline: newData.storyline,
              link_trailer: newData.link_trailer,
              watch_options: newData.watch_options.map((val) => {
                return additionalData.watch_options.find(
                  (value) => value._id === val
                );
              }),
              persons: newData.persons.map((val) => {
                return additionalData.persons.find(
                  (value) => value._id === val
                );
              }),
              genres: newData.genres.map((val) => {
                return additionalData.genres.find((value) => value._id === val);
              }),
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
      const result = await getMovies({
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

export const useMovies = () => {
  return useContext(Context);
};
