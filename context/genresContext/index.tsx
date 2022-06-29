import { createContext, ReactNode, useContext, useState } from 'react';
import {
  createGenre,
  deleteGenre,
  editGenre,
  getGenre,
  getGenres,
} from '../../services/api/genres.service';
import {
  CreateGenre,
  DataGenre,
  DeleteGenre,
  EditGenre,
  GetGenre,
  GetGenres,
  UseGenres,
} from '../../types/genres';

const Context = createContext({});

export const GenresProvider = (props: { children: ReactNode }) => {
  const [data, setData] = useState<DataGenre[]>([]);

  const deleteData: DeleteGenre = async (id) => {
    const result = await deleteGenre(id);

    if (result.success) setData(data.filter((val) => val._id !== id));

    return result;
  };

  const createData: CreateGenre = async (data) => {
    const result = await createGenre(data);

    if (result.success) loadData();

    return result;
  };

  const loadData: GetGenres = async () => {
    const result = await getGenres();

    if (result.success) setData(result.data);

    return result;
  };

  const getData: GetGenre = async (id) => {
    const result = await getGenre(id);
    return result;
  };

  const editData: EditGenre = async (id, newData) => {
    const result = await editGenre(id, newData);

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
export const useGenres: UseGenres = () => {
  return useContext(Context);
};
