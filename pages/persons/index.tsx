import { useEffect } from 'react';
import PersonsTemplate from '../../components/templates/PersonsTemplate';
import { usePersons } from '../../context/personsContext';
import { getPersons } from '../../services/api/persons.service';
import { PersonsProps } from '../../types/persons';

const Persons = ({ data, total_data }: PersonsProps) => {
  const { setData, setTotalData } = usePersons();

  useEffect(() => {
    setData(data);
    setTotalData(total_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PersonsTemplate />;
};

export async function getServerSideProps() {
  const result = await getPersons();
  return {
    props: {
      data: result.data,
      total_data: result.total_data,
    },
  };
}

export default Persons;
