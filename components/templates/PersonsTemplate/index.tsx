import { useRouter } from 'next/router';
import React from 'react';
import AddButtonStatic from '../../molecules/commons/AddButtonStatic';
import PersonsCreate from '../../organisms/persons/PersonsCreate';
import PersonsEdit from '../../organisms/persons/PersonsEdit';
import PersonsFilterList from '../../organisms/persons/PersonsFilterList';
import PersonsList from '../../organisms/persons/PersonsList';
import Layout from '../Layout';

const PersonsTemplate = () => {
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
        <PersonsCreate show={method === 'create'} />
        <PersonsEdit show={method === 'edit'} />
        <div className="flex flex-col gap-5 p-5">
          <PersonsFilterList />
          <PersonsList />
        </div>
      </Layout>
    </>
  );
};

export default PersonsTemplate;
