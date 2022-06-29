import { useMovies } from '../../../../context/moviesContext';
import SearchField from '../../../molecules/commons/SearchField';

const MoviesFilterList = () => {
  const { filter, setFilter } = useMovies();

  return (
    <SearchField
      value={filter.title}
      onChange={(e) => setFilter({ ...filter, title: e.target.value })}
    />
  );
};

export default MoviesFilterList;
