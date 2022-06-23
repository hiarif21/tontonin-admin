import { createContext, ReactNode, useContext, useState } from 'react';
import {
  createRole,
  deleteRole,
  editRole,
  getRole,
  getRoles,
} from '../../services/api/roles.service';

interface Props {
  children: ReactNode;
}

const Context = createContext({});

export const RolesProvider = (props: Props) => {
  const [data, setData] = useState<any[]>([]);

  const deleteData = async (id: string) => {
    const result = await deleteRole(id);

    if (result.success) setData(data.filter((val) => val._id !== id));

    return result;
  };

  const createData = async (data: { name: string }) => {
    const result = await createRole(data);

    loadData();

    return result;
  };

  const loadData = async () => {
    const result = await getRoles();

    setData(result.data);
  };

  const getData = async (id: string) => {
    const result = await getRole(id);
    return result;
  };

  const editData = async (id: string, newData: { name: string }) => {
    const result = await editRole(id, newData);

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

export const useRoles = () => {
  return useContext(Context);
};
