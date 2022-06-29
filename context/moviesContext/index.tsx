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
import {
  CreateMovie,
  DataMovie,
  DeleteMovie,
  EditDataMovies,
  GetMovie,
  GetMovies,
  LoadDataMovies,
  UseMovies,
} from '../../types/movies';

const Context = createContext({});

export const MoviesProvider = (props: { children: ReactNode }) => {
  const [data, setData] = useState<DataMovie[]>([]);
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

  const deleteData: DeleteMovie = async (id) => {
    const result = await deleteMovie(id);

    if (result.success) {
      setData(data.filter((val) => val._id !== id));
      setTotalData(totalData - 1);
    }

    return result;
  };

  const createData: CreateMovie = async (data) => {
    const result = await createMovie(data);

    if (result.success) loadData();

    return result;
  };

  const loadData: LoadDataMovies = async (signal = undefined) => {
    const result = await getMovies({ title: filter.title }, signal);

    if (result?.success) {
      setData(result.data);
      setTotalData(result.total_data);
    }

    return result;
  };

  const getData: GetMovie = async (id) => {
    const result = await getMovie(id);
    return result;
  };

  const editData: EditDataMovies = async (id, newData, additionalData) => {
    const result = await editMovie(id, newData);

    console.log(newData.watch_options);

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
                )!;
              }),
              persons: newData.persons.map((val) => {
                return additionalData.persons.find(
                  (value) => value._id === val
                )!;
              }),
              genres: newData.genres.map((val) => {
                return additionalData.genres.find(
                  (value) => value._id === val
                )!;
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

// @ts-ignore
export const useMovies: UseMovies = () => {
  return useContext(Context);
};
