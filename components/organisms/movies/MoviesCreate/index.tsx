import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGenres } from '../../../../context/genresContext';
import { useMovies } from '../../../../context/moviesContext';
import { usePersons } from '../../../../context/personsContext';
import { useWatchOptions } from '../../../../context/watchOptionsContext';
import Modal from '../../../atoms/Modal';
import AutoComplete from '../../../molecules/commons/AutoComplete';
import HeaderCreateAndEdit from '../../../molecules/commons/HeaderCreateAndEdit';
import TextField from '../../../molecules/commons/TextField';

interface MoviesCreateProps {
  show: boolean;
}

interface WatchOptionsData {
  _id: string;
  title: string;
  link_streaming: string;
}

interface PersonsData {
  _id: string;
  name: string;
}

interface GenresData {
  _id: string;
  name: string;
}

interface InitialStateListProperty {
  label: string;
  name_search: string;
  data_index_list: string;
}

interface InitialStateList {
  watch_options: InitialStateListProperty;
  persons: InitialStateListProperty;
  genres: InitialStateListProperty & {
    value_search: string;
    data_list: GenresData[];
  };
}

interface InitialStateFilteredAndSelectedData {
  watch_options: WatchOptionsData[];
  persons: PersonsData[];
  genres: GenresData[];
}

const initialStateData = {
  title: '',
  image: '',
  release_year: 0,
  runtime: 0,
  storyline: '',
  link_trailer: '',
};

const initialStateList: InitialStateList = {
  watch_options: {
    label: 'Watch Options',
    name_search: 'watch options',
    data_index_list: 'title',
  },
  persons: {
    label: 'Persons',
    name_search: 'persons',
    data_index_list: 'name',
  },
  genres: {
    label: 'Genres',
    value_search: '',
    name_search: 'genre',
    data_list: [],
    data_index_list: 'name',
  },
};

const initialStateFilteredAndSelectedData: InitialStateFilteredAndSelectedData =
  {
    watch_options: [],
    persons: [],
    genres: [],
  };

const MoviesCreate = ({ show }: MoviesCreateProps) => {
  const router = useRouter();

  const [data, setData] = useState(initialStateData);
  const [list, setList] = useState(initialStateList);

  const [filteredData, setFilteredData] = useState(
    initialStateFilteredAndSelectedData
  );
  const [selectedData, setSelectedData] = useState(
    initialStateFilteredAndSelectedData
  );

  const { createData }: any = useMovies();
  const UseWatchOptions: any = useWatchOptions();
  const UsePersons: any = usePersons();
  const UseGenres: any = useGenres();

  const dataWatchOptions = UseWatchOptions.data;
  const loadDataWatchOptions = UseWatchOptions.loadData;
  const filterWatchOptions = UseWatchOptions.filter;
  const setFilterWatchOptions = UseWatchOptions.setFilter;

  const dataPersons = UsePersons.data;
  const loadDataPersons = UsePersons.loadData;
  const filterPersons = UsePersons.filter;
  const setFilterPersons = UsePersons.setFilter;

  const loadDataGenres = UseGenres.loadData;

  const { method } = router.query;

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
        genres: list.genres.data_list.filter((val) =>
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
      watch_options: selectedData.watch_options,
      persons: selectedData.persons,
      genres: selectedData.genres,
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
            min={10}
            type={'number'}
            value={data.runtime.toString()}
            onChange={(e) =>
              setData({ ...data, runtime: e.target.valueAsNumber })
            }
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
            valueSearch={filterWatchOptions.title}
            nameSearch={list.watch_options.name_search}
            onChangeSearch={(e) =>
              setFilterWatchOptions({ title: e.target.value })
            }
            dataList={filteredData.watch_options}
            dataIndexList={list.watch_options.data_index_list}
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
            valueSearch={filterPersons.name}
            nameSearch={list.persons.name_search}
            onChangeSearch={(e) => setFilterPersons({ name: e.target.value })}
            dataList={filteredData.persons}
            dataIndexList={list.persons.data_index_list}
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
