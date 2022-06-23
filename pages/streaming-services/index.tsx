import { useEffect } from 'react';
import StreamingServicesTemplate from '../../components/templates/StreamingServicesTemplate';
import { useStreamingServices } from '../../context/streamingServicesContext';
import { getStreamingServices } from '../../services/api/streamingServices.service';

interface StreamingServicesProps {
  data: {
    _id: string;
    name: string;
  }[];
}

const StreamingServices = ({ data }: StreamingServicesProps) => {
  const { setData }: any = useStreamingServices();

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
