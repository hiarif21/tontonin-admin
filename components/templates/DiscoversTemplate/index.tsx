import { useRouter } from 'next/router';
import React from 'react';
import AddButtonStatic from '../../molecules/commons/AddButtonStatic';
import DiscoversCreate from '../../organisms/discovers/DiscoversCreate';
import DiscoversEdit from '../../organisms/discovers/DiscoversEdit';
import DiscoversFilterList from '../../organisms/discovers/DiscoversFilterList';
import DiscoversList from '../../organisms/discovers/DiscoversList';
import Layout from '../Layout';

const DiscoversTemplate = () => {
  const router = useRouter();

  const { method } = router.query;

  return (
    <>
      <AddButtonStatic
        title={router.pathname.replace('-', ' ').replace('/', '')}
        onClick={() =>
          router.push(`?method=create`, `${router.pathname}`, {
            shallow: true,
          })
        }
      />
      <Layout title={router.pathname.replace('-', ' ').replace('/', '')}>
        <DiscoversCreate show={method === 'create'} />
        <DiscoversEdit show={method === 'edit'} />
        <div className="flex flex-col gap-5 p-5">
          <DiscoversFilterList />
          <DiscoversList />
        </div>
      </Layout>
    </>
  );
};

export default DiscoversTemplate;
