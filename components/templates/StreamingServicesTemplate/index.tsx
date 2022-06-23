import { useRouter } from 'next/router';
import React from 'react';
import AddButtonStatic from '../../molecules/commons/AddButtonStatic';
import StreamingServicesCreate from '../../organisms/streamingServices/StreamingServicesCreate';
import StreamingServicesEdit from '../../organisms/streamingServices/StreamingServicesEdit';
import StreamingServicesList from '../../organisms/streamingServices/StreamingServicesList';
import Layout from '../Layout';

const StreamingServicesTemplate = () => {
  const router = useRouter();

  const { method } = router.query;

  return (
    <>
      <AddButtonStatic
        title={router.pathname.replace('-', ' ').replace('/', '')}
        onClick={() => router.push(`?method=create`, `${router.pathname}`)}
      />
      <StreamingServicesCreate show={method === 'create'} />
      <StreamingServicesEdit show={method === 'edit'} />
      <Layout title={router.pathname.replace('-', ' ').replace('/', '')}>
        <div className="flex flex-col gap-5">
          <StreamingServicesList />
        </div>
      </Layout>
    </>
  );
};

export default StreamingServicesTemplate;
