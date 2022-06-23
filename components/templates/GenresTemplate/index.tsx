import { useRouter } from 'next/router';
import React from 'react';
import AddButtonStatic from '../../molecules/commons/AddButtonStatic';
import GenresCreate from '../../organisms/genres/GenresCreate';
import GenresEdit from '../../organisms/genres/GenresEdit';
import GenresList from '../../organisms/genres/GenresList';
import Layout from '../Layout';

const GenresTemplate = () => {
  const router = useRouter();

  const { method } = router.query;

  return (
    <>
      <AddButtonStatic
        title={router.pathname.replace('-', ' ').replace('/', '')}
        onClick={() =>
          router.push(`?method=create`, `${router.pathname}`, { shallow: true })
        }
      />
      <GenresCreate show={method === 'create'} />
      <GenresEdit show={method === 'edit'} />
      <Layout title={router.pathname.replace('-', ' ').replace('/', '')}>
        <div className="flex flex-col gap-5">
          <GenresList />
        </div>
      </Layout>
    </>
  );
};

export default GenresTemplate;
