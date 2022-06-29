import { useEffect } from 'react';
import WatchOptionsTemplate from '../../components/templates/WatchOptionsTemplate';
import { useWatchOptions } from '../../context/watchOptionsContext';
import { getWatchOptions } from '../../services/api/watchOptions.service';
import { WatchOptionsProps } from '../../types/watchOptions';

const WatchOptions = ({ data, total_data }: WatchOptionsProps) => {
  const { setData, setTotalData } = useWatchOptions();

  useEffect(() => {
    setData(data);
    setTotalData(total_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <WatchOptionsTemplate />;
};

export async function getServerSideProps() {
  const result = await getWatchOptions();
  return {
    props: {
      data: result.data,
      total_data: result.total_data,
    },
  };
}

export default WatchOptions;
