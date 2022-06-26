import { useWatchOptions } from '../../../../context/watchOptionsContext';
import SearchField from '../../../molecules/commons/SearchField';

const WatchOptionsFilterList = () => {
  const { filter, setFilter }: any = useWatchOptions();

  return (
    <SearchField
      value={filter.title}
      onChange={(e) => setFilter({ ...filter, title: e.target.value })}
    />
  );
};

export default WatchOptionsFilterList;
