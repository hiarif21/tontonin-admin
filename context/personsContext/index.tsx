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
import {
  CreatePerson,
  DataPerson,
  DeletePerson,
  EditDataPersons,
  GetPerson,
  LoadDataPersons,
  UsePersons,
} from '../../types/persons';

const Context = createContext({});

export const PersonsProvider = (props: { children: ReactNode }) => {
  const [data, setData] = useState<DataPerson[]>([]);
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

  const deleteData: DeletePerson = async (id) => {
    const result = await deletePerson(id);

    if (result.success) {
      setData(data.filter((val) => val._id !== id));
      setTotalData(totalData - 1);
    }

    return result;
  };

  const createData: CreatePerson = async (data) => {
    const result = await createPerson(data);

    if (result.success) loadData();

    return result;
  };

  const loadData: LoadDataPersons = async (signal = undefined) => {
    const result = await getPersons({ name: filter.name }, signal);

    if (result?.success) {
      setData(result.data);
      setTotalData(result.total_data);
    }

    return result;
  };

  const getData: GetPerson = async (id) => {
    const result = await getPerson(id);
    return result;
  };

  const editData: EditDataPersons = async (id, newData, additionalData) => {
    const result = await editPerson(id, newData);

    if (result.success) {
      setData(
        data.map((val) => {
          if (val._id === id) {
            return {
              ...val,
              role: additionalData.roles.find(
                (value) => value._id === newData.role
              )!,
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

// @ts-ignore
export const usePersons: UsePersons = () => {
  return useContext(Context);
};
