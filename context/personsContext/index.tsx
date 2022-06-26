import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createPerson,
  deletePerson,
  editPerson,
  getPerson,
  getPersons,
} from '../../services/api/persons.service';

interface Props {
  children: ReactNode;
}

interface DataPerson {
  name: string;
  role: string;
}

const Context = createContext({});

export const PersonsProvider = (props: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [filter, setFilter] = useState({
    name: '',
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
    const result = await deletePerson(id);

    if (result.success) {
      setData(data.filter((val) => val._id !== id));
      setTotalData(totalData - 1);
    }

    return result;
  };

  const createData = async (data: DataPerson) => {
    const result = await createPerson(data);

    if (result.success) loadData();

    return result;
  };

  const loadData = async (signal: AbortSignal | undefined = undefined) => {
    const result = await getPersons({ name: filter.name }, signal);

    if (result?.success) {
      setData(result.data);
      setTotalData(result.total_data);
    }

    return result;
  };

  const getData = async (id: string) => {
    const result = await getPerson(id);
    return result;
  };

  const editData = async (
    id: string,
    newData: DataPerson,
    additionalData: { name: string }
  ) => {
    const result = await editPerson(id, newData);

    if (result.success) {
      setData(
        data.map((val) => {
          if (val._id === id) {
            return {
              ...val,
              role: {
                _id: newData.role,
                name: additionalData.name,
              },
              name: newData.name,
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
      const result = await getPersons({
        page: count,
        name: filter.name,
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

export const usePersons = () => {
  return useContext(Context);
};
