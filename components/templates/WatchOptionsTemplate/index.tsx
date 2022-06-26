import { useRouter } from 'next/router';
import React from 'react';
import AddButtonStatic from '../../molecules/commons/AddButtonStatic';
import WatchOptionsCreate from '../../organisms/watchOptions/WatchOptionsCreate';
import WatchOptionsEdit from '../../organisms/watchOptions/WatchOptionsEdit';
import WatchOptionsFilterList from '../../organisms/watchOptions/WatchOptionsFilterList';
import WatchOptionsList from '../../organisms/watchOptions/WatchOptionsList';
import Layout from '../Layout';

const WatchOptionsTemplate = () => {
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
        <WatchOptionsCreate show={method === 'create'} />
        <WatchOptionsEdit show={method === 'edit'} />
        <div className="flex flex-col gap-5 p-5">
          <WatchOptionsFilterList />
          <WatchOptionsList />
        </div>
      </Layout>
    </>
  );
};

export default WatchOptionsTemplate;
