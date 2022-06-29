import { useEffect } from 'react';
import StreamingServicesTemplate from '../../components/templates/StreamingServicesTemplate';
import { useStreamingServices } from '../../context/streamingServicesContext';
import { getStreamingServices } from '../../services/api/streamingServices.service';
import { StreamingServicesProps } from '../../types/streamingServices';

const StreamingServices = ({ data }: StreamingServicesProps) => {
  const { setData } = useStreamingServices();

  useEffect(() => {
    setData(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <StreamingServicesTemplate />;
};

export async function getServerSideProps() {
  const result = await getStreamingServices();
  return {
    props: {
      data: result.data,
    },
  };
}

export default StreamingServices;
