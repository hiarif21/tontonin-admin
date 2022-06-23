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
      <RolesCreate show={method === 'create'} />
      <RolesEdit show={method === 'edit'} />
      <Layout title={router.pathname.replace('-', ' ').replace('/', '')}>
        <div className="flex flex-col gap-5">
          <RolesList />
        </div>
      </Layout>
    </>
  );
};

export default RolesTemplate;
