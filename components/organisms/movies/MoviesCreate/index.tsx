import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGenres } from '../../../../context/genresContext';
import { useMovies } from '../../../../context/moviesContext';
import { usePersons } from '../../../../context/personsContext';
import { useWatchOptions } from '../../../../context/watchOptionsContext';
import { DataGenre } from '../../../../types/genres';
import {
  InitialStateDataMovie,
  InitialStateFilteredAndSelectedDataMovie,
  InitialStateListMovie,
  MoviesCreateProps,
} from '../../../../types/movies';
import Modal from '../../../atoms/Modal';
import AutoComplete from '../../../molecules/commons/AutoComplete';
import HeaderCreateAndEdit from '../../../molecules/commons/HeaderCreateAndEdit';
import TextField from '../../../molecules/commons/TextField';

const initialStateData: InitialStateDataMovie = {
  title: '',
  image: '',
  release_year: 0,
  runtime: '',
  storyline: '',
  link_trailer: '',
};

const initialStateList: InitialStateListMovie = {
  watch_options: {
    label: 'Watch Options',
    label_2: 'Service',
    name_search: 'watch options',
    data_index_list: 'title',
    data_index_list_2: 'streaming_service.name',
  },
  persons: {
    label: 'Persons',
    label_2: 'Role',
    name_search: 'persons',
    data_index_list: 'name',
    data_index_list_2: 'role.name',
  },
  genres: {
    label: 'Genres',
    value_search: '',
    name_search: 'genre',
    data_list: [],
    data_index_list: 'name',
  },
};

const initialStateFilteredAndSelectedData: InitialStateFilteredAndSelectedDataMovie =
  {
    watch_options: [],
    persons: [],
    genres: [],
  };

const MoviesCreate = ({ show }: MoviesCreateProps) => {
  const router = useRouter();

  const { method } = router.query;

  const [data, setData] = useState(initialStateData);
  const [list, setList] = useState(initialStateList);

  const [filteredData, setFilteredData] = useState(
    initialStateFilteredAndSelectedData
  );
  const [selectedData, setSelectedData] = useState(
    initialStateFilteredAndSelectedData
  );

  const { createData } = useMovies();
  const UseWatchOptions = useWatchOptions();
  const UsePersons = usePersons();
  const UseGenres = useGenres();

  const dataWatchOptions = UseWatchOptions.data;
  const loadDataWatchOptions = UseWatchOptions.loadData;
  const filterWatchOptions = UseWatchOptions.filter;
  const setFilterWatchOptions = UseWatchOptions.setFilter;

  const dataPersons = UsePersons.data;
  const loadDataPersons = UsePersons.loadData;
  const filterPersons = UsePersons.filter;
  const setFilterPersons = UsePersons.setFilter;

  const loadDataGenres = UseGenres.loadData;

  // load list
  useEffect(() => {
    (async () => {
      await loadDataWatchOptions();
      await loadDataPersons();
      const resultGenres = await loadDataGenres();
      setList({
        ...list,
        genres: { ...list.genres, data_list: resultGenres.data },
      });
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  //   filter list watch options
  useEffect(() => {
    setFilteredData({
      ...filteredData,
      watch_options: dataWatchOptions,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataWatchOptions]);

  //   filter list persons
  useEffect(() => {
    setFilteredData({
      ...filteredData,
      persons: dataPersons,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPersons]);

  //   filter list genres
  useEffect(() => {
    if (list.genres.value_search === '') {
      setFilteredData({ ...filteredData, genres: list.genres.data_list });
    } else {
      setFilteredData({
        ...filteredData,
        genres: list.genres.data_list.filter((val: DataGenre) =>
          val.name
            .toLowerCase()
            .includes(list.genres.value_search.toLowerCase())
        ),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.genres.data_list, list.genres.value_search]);

  const handleSubmit = async () => {
    const result = await createData({
      title: data.title,
      image: data.image,
      release_year: data.release_year,
      runtime: data.runtime,
      storyline: data.storyline,
      link_trailer: data.link_trailer,
      watch_options: selectedData.watch_options.map((val) => {
        return val._id;
      }),
      persons: selectedData.persons.map((val) => {
        return val._id;
      }),
      genres: selectedData.genres.map((val) => {
        return val._id;
      }),
    });

    if (result.success) {
      setData(initialStateData);
      setList(initialStateList);
      setFilteredData(initialStateFilteredAndSelectedData);
      setSelectedData(initialStateFilteredAndSelectedData);
      setFilterWatchOptions({ title: '' });
      setFilterPersons({ name: '' });
      handleBack();
      toast(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleBack = () => {
    router.push(`${router.pathname}`, undefined, { shallow: true });
  };

  return (
    <Modal show={show}>
      <div
        className={classNames(
          'fixed h-full w-full overflow-auto bg-white transition-all duration-500 ease-in-out',
          {
            'right-0': show,
            '-right-full': !show,
          }
        )}>
        <HeaderCreateAndEdit
          type={'Create'}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
        <div className="flex flex-col gap-5 p-5">
          <TextField
            label="Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <TextField
            label="Image"
            value={data.image}
            onChange={(e) => setData({ ...data, image: e.target.value })}
          />
          <TextField
            label="Release Year"
            type={'number'}
            value={data.release_year.toString()}
            onChange={(e) =>
              setData({ ...data, release_year: e.target.valueAsNumber })
            }
          />
          <TextField
            label="Runtime (minutes)"
            value={data.runtime}
            onChange={(e) => setData({ ...data, runtime: e.target.value })}
          />
          <TextField
            label="Storyline"
            value={data.storyline}
            onChange={(e) => setData({ ...data, storyline: e.target.value })}
          />
          <TextField
            label="Link Trailer"
            value={data.link_trailer}
            onChange={(e) => setData({ ...data, link_trailer: e.target.value })}
          />
          <AutoComplete
            label={list.watch_options.label}
            label2={list.watch_options.label_2}
            valueSearch={filterWatchOptions.title}
            nameSearch={list.watch_options.name_search}
            onChangeSearch={(e) =>
              setFilterWatchOptions({ title: e.target.value })
            }
            dataList={filteredData.watch_options}
            dataIndexList={list.watch_options.data_index_list}
            dataIndexList2={list.watch_options.data_index_list_2}
            onClickList={(val) =>
              setSelectedData({
                ...selectedData,
                watch_options: [...selectedData.watch_options, val],
              })
            }
            onDeleteList={(id) =>
              setSelectedData({
                ...selectedData,
                watch_options: selectedData.watch_options.filter(
                  (val) => val._id !== id
                ),
              })
            }
            selectedData={selectedData.watch_options}
          />
          <AutoComplete
            label={list.persons.label}
            label2={list.persons.label_2}
            valueSearch={filterPersons.name}
            nameSearch={list.persons.name_search}
            onChangeSearch={(e) => setFilterPersons({ name: e.target.value })}
            dataList={filteredData.persons}
            dataIndexList={list.persons.data_index_list}
            dataIndexList2={list.persons.data_index_list_2}
            onClickList={(val) =>
              setSelectedData({
                ...selectedData,
                persons: [...selectedData.persons, val],
              })
            }
            onDeleteList={(id) =>
              setSelectedData({
                ...selectedData,
                persons: selectedData.persons.filter((val) => val._id !== id),
              })
            }
            selectedData={selectedData.persons}
          />
          <AutoComplete
            label={list.genres.label}
            valueSearch={list.genres.value_search}
            nameSearch={list.genres.name_search}
            onChangeSearch={(e) =>
              setList({
                ...list,
                genres: { ...list.genres, value_search: e.target.value },
              })
            }
            dataList={filteredData.genres}
            dataIndexList={list.genres.data_index_list}
            onClickList={(val) =>
              setSelectedData({
                ...selectedData,
                genres: [...selectedData.genres, val],
              })
            }
            onDeleteList={(id) =>
              setSelectedData({
                ...selectedData,
                genres: selectedData.genres.filter((val) => val._id !== id),
              })
            }
            selectedData={selectedData.genres}
          />
        </div>
        <div className="pb-60"></div>
      </div>
    </Modal>
  );
};

export default MoviesCreate;
