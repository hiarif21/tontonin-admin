import { createContext, ReactNode, useContext, useState } from 'react';
import {
  createRole,
  deleteRole,
  editRole,
  getRole,
  getRoles,
} from '../../services/api/roles.service';
import {
  CreateRole,
  DataRole,
  DeleteRole,
  EditRole,
  GetRole,
  GetRoles,
  UseRoles,
} from '../../types/roles';

const Context = createContext({});

export const RolesProvider = (props: { children: ReactNode }) => {
  const [data, setData] = useState<DataRole[]>([]);

  const deleteData: DeleteRole = async (id) => {
    const result = await deleteRole(id);

    if (result.success) setData(data.filter((val) => val._id !== id));

    return result;
  };

  const createData: CreateRole = async (data) => {
    const result = await createRole(data);

    if (result.success) loadData();

    return result;
  };

  const loadData: GetRoles = async () => {
    const result = await getRoles();

    if (result.success) setData(result.data);

    return result;
  };

  const getData: GetRole = async (id) => {
    const result = await getRole(id);
    return result;
  };

  const editData: EditRole = async (id, newData) => {
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

// @ts-ignore
export const useRoles: UseRoles = () => {
  return useContext(Context);
};
