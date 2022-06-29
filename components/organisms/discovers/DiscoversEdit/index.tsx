import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDiscovers } from '../../../../context/discoversContext';
import { useGenres } from '../../../../context/genresContext';
import { useMovies } from '../../../../context/moviesContext';
import { usePersons } from '../../../../context/personsContext';
import { useRoles } from '../../../../context/rolesContext';
import { useWatchOptions } from '../../../../context/watchOptionsContext';
import useInfinite from '../../../../hooks/useInfinite';
import {
  DiscoversEditProps,
  InitialStateDataDiscover,
  InitialStateFilteredAndSelectedDataDiscover,
  InitialStateListDiscover,
} from '../../../../types/discovers';
import Modal from '../../../atoms/Modal';
import AutoComplete from '../../../molecules/commons/AutoComplete';
import HeaderCreateAndEdit from '../../../molecules/commons/HeaderCreateAndEdit';
import TextField from '../../../molecules/commons/TextField';

const initialStateData: InitialStateDataDiscover = {
  title: '',
};

const initialStateList: InitialStateListDiscover = {
  movies: {
    label: 'Movies',
    name_search: 'movies',
    data_index_list: 'title',
  },
};

const initialStateFilteredAndSelectedData: InitialStateFilteredAndSelectedDataDiscover =
  {
    movies: [],
  };

const DiscoversEdit = ({ show }: DiscoversEditProps) => {
  const router = useRouter();
  const refLastElementMovies = useRef(null);

  const { id, method } = router.query;

  const [data, setData] = useState(initialStateData);
  const [list, setList] = useState(initialStateList);

  const [filteredData, setFilteredData] = useState(
    initialStateFilteredAndSelectedData
  );
  const [selectedData, setSelectedData] = useState(
    initialStateFilteredAndSelectedData
  );

  const { editData, getData, loadMoreDataSingle, dataSingle } = useDiscovers();
  const UseMovies = useMovies();

  const dataMovies = UseMovies.data;
  const loadDataMovies = UseMovies.loadData;
  const filterMovies = UseMovies.filter;
  const setFilterMovies = UseMovies.setFilter;

  useInfinite(refLastElementMovies, () => loadMoreDataSingle(id!.toString()));

  // load data
  useEffect(() => {
    (async () => {
      if (id) {
        const result = await getData(id.toString());
        setData({
          title: result.data!.title,
        });
        setSelectedData({
          movies: result.data!.movies,
        });
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setSelectedData({
      movies: dataSingle.movies,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSingle]);

  // load list
  useEffect(() => {
    (async () => {
      await loadDataMovies();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  //   filter list watch options
  useEffect(() => {
    setFilteredData({
      ...filteredData,
      movies: dataMovies,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMovies]);

  const handleSubmit = async () => {
    const result = await editData(
      id!.toString(),
      {
        title: data.title,
        movies: selectedData.movies.map((val) => {
          return val._id;
        }),
      },
      {
        ...selectedData,
      }
    );

    if (result.success) {
      setData(initialStateData);
      setList(initialStateList);
      setFilteredData(initialStateFilteredAndSelectedData);
      setSelectedData(initialStateFilteredAndSelectedData);
      setFilterMovies({ title: '' });
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
          type={'Edit'}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
        <div className="flex flex-col gap-5 p-5">
          <TextField
            label="Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <AutoComplete
            label={list.movies.label}
            valueSearch={filterMovies.title}
            nameSearch={list.movies.name_search}
            onChangeSearch={(e) => setFilterMovies({ title: e.target.value })}
            dataList={filteredData.movies}
            dataIndexList={list.movies.data_index_list}
            onClickList={(val) =>
              setSelectedData({
                ...selectedData,
                movies: [...selectedData.movies, val],
              })
            }
            onDeleteList={(id) =>
              setSelectedData({
                ...selectedData,
                movies: selectedData.movies.filter((val) => val._id !== id),
              })
            }
            selectedData={selectedData.movies}
          />
          <div ref={refLastElementMovies}></div>
        </div>
        <div className="pb-60"></div>
      </div>
    </Modal>
  );
};

export default DiscoversEdit;
