import { usePersons } from '../../../../context/personsContext';
import SearchField from '../../../molecules/commons/SearchField';

const PersonsFilterList = () => {
  const { filter, setFilter } = usePersons();

  return (
    <SearchField
      value={filter.name}
      onChange={(e) => setFilter({ ...filter, name: e.target.value })}
    />
  );
};

export default PersonsFilterList;
