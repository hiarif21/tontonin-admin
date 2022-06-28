import { useEffect } from 'react';
import DiscoversTemplate from '../../components/templates/DiscoversTemplate';
import { useDiscovers } from '../../context/discoversContext';
import { getDiscovers } from '../../services/api/discovers.service';

interface DiscoversProps {
  data: {
    _id: string;
    name: string;
  }[];
  total_data: number;
}

const Discovers = ({ data, total_data }: DiscoversProps) => {
  const { setData, setTotalData }: any = useDiscovers();

  useEffect(() => {
    setData(data);
    setTotalData(total_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DiscoversTemplate />;
};

export async function getServerSideProps() {
  const result = await getDiscovers();
  return {
    props: {
      data: result.data,
      total_data: result.total_data,
    },
  };
}

export default Discovers;
