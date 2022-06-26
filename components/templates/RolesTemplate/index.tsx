import { useRouter } from 'next/router';
import React from 'react';
import AddButtonStatic from '../../molecules/commons/AddButtonStatic';
import RolesCreate from '../../organisms/roles/RolesCreate';
import RolesEdit from '../../organisms/roles/RolesEdit';
import RolesList from '../../organisms/roles/RolesList';
import Layout from '../Layout';

const RolesTemplate = () => {
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
      <Layout title={router.pathname.replace('-', ' ').replace('/', '')}>
        <RolesCreate show={method === 'create'} />
        <RolesEdit show={method === 'edit'} />
        <div className="flex flex-col gap-5">
          <RolesList />
        </div>
      </Layout>
    </>
  );
};

export default RolesTemplate;
