import { useDiscovers } from '../../../../context/discoversContext';
import SearchField from '../../../molecules/commons/SearchField';

const DiscoversFilterList = () => {
  const { filter, setFilter }: any = useDiscovers();

  return (
    <SearchField
      value={filter.title}
      onChange={(e) => setFilter({ ...filter, title: e.target.value })}
    />
  );
};

export default DiscoversFilterList;
