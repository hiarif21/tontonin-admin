import { useEffect } from 'react';
import RolesTemplate from '../../components/templates/RolesTemplate';
import { useRoles } from '../../context/rolesContext';
import { getRoles } from '../../services/api/roles.service';

interface RolesProps {
  data: {
    _id: string;
    name: string;
  }[];
}

const Roles = ({ data }: RolesProps) => {
  const { setData }: any = useRoles();

  useEffect(() => {
    setData(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RolesTemplate />;
};

export async function getServerSideProps() {
  const result = await getRoles();
  return {
    props: {
      data: result.data,
    },
  };
}

export default Roles;
