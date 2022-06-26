import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePersons } from '../../../../context/personsContext';
import { useRoles } from '../../../../context/rolesContext';
import Modal from '../../../atoms/Modal';
import AutoComplete from '../../../molecules/commons/AutoComplete';
import HeaderCreateAndEdit from '../../../molecules/commons/HeaderCreateAndEdit';
import TextField from '../../../molecules/commons/TextField';

interface PersonsCreateProps {
  show: boolean;
}

interface RolesData {
  _id: string;
  name: string;
}

interface InitialStateRoles {
  label: string;
  value_search: string;
  name_search: string;
  data_list: RolesData[];
  data_index_list: string;
}

interface InitialStateFilteredAndSelectedData {
  roles: RolesData[];
}

const initialStateData = {
  name: '',
};

const initialStateRoles: InitialStateRoles = {
  label: 'Roles',
  value_search: '',
  name_search: 'roles',
  data_list: [],
  data_index_list: 'name',
};

const initialStateFilteredAndSelectedData: InitialStateFilteredAndSelectedData =
  {
    roles: [],
  };

const PersonsCreate = ({ show }: PersonsCreateProps) => {
  const router = useRouter();

  const [data, setData] = useState(initialStateData);
  const [roles, setRoles] = useState(initialStateRoles);

  const [filteredData, setFilteredData] = useState(
    initialStateFilteredAndSelectedData
  );
  const [selectedData, setSelectedData] = useState(
    initialStateFilteredAndSelectedData
  );

  const { createData }: any = usePersons();
  const { loadData }: any = useRoles();

  //   load data list
  useEffect(() => {
    (async () => {
      const result = await loadData();
      setRoles({ ...roles, data_list: result.data });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   filter list
  useEffect(() => {
    if (roles.value_search === '') {
      setFilteredData({ roles: roles.data_list });
    } else {
      setFilteredData({
        roles: roles.data_list.filter((val) =>
          val.name.toLowerCase().includes(roles.value_search.toLowerCase())
        ),
      });
    }
  }, [roles.data_list, roles.value_search]);

  const handleSubmit = async () => {
    const result = await createData({
      name: data.name,
      role: selectedData.roles[0]._id,
    });

    if (result.success) {
      setData(initialStateData);
      setRoles(initialStateRoles);
      setFilteredData(initialStateFilteredAndSelectedData);
      setSelectedData(initialStateFilteredAndSelectedData);
      handleBack();
      toast(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleBack = () => {
    router.push(`${router.pathname}`, undefined, { shallow: true });
  };

  return (
    <Modal show={show}>
      <div
        className={classNames(
          'fixed h-full w-full overflow-auto bg-white transition-all duration-500 ease-in-out',
          {
            'right-0': show,
            '-right-full': !show,
          }
        )}>
        <HeaderCreateAndEdit
          type={'Create'}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
        <div className="flex flex-col gap-5 p-5">
          <TextField
            label="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <AutoComplete
            label={roles.label}
            valueSearch={roles.value_search}
            nameSearch={roles.name_search}
            onChangeSearch={(e) =>
              setRoles({
                ...roles,
                value_search: e.target.value,
              })
            }
            dataList={filteredData.roles}
            dataIndexList={roles.data_index_list}
            onClickList={(val) => setSelectedData({ roles: [val] })}
            onDeleteList={(id) =>
              setSelectedData({
                roles: selectedData.roles.filter((val) => val._id !== id),
              })
            }
            selectedData={selectedData.roles}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PersonsCreate;
