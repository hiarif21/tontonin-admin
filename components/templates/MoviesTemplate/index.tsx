import { useRouter } from 'next/router';
import React from 'react';
import AddButtonStatic from '../../molecules/commons/AddButtonStatic';
import MoviesCreate from '../../organisms/movies/MoviesCreate';
import MoviesEdit from '../../organisms/movies/MoviesEdit';
import MoviesFilterList from '../../organisms/movies/MoviesFilterList';
import MoviesList from '../../organisms/movies/MoviesList';
import Layout from '../Layout';

const MoviesTemplate = () => {
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
        <MoviesCreate show={method === 'create'} />
        <MoviesEdit show={method === 'edit'} />
        <div className="flex flex-col gap-5 p-5">
          <MoviesFilterList />
          <MoviesList />
        </div>
      </Layout>
    </>
  );
};

export default MoviesTemplate;
