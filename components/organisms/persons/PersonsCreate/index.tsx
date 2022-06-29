import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePersons } from '../../../../context/personsContext';
import { useRoles } from '../../../../context/rolesContext';
import {
  InitialStateDataPerson,
  InitialStateFilteredAndSelectedDataPerson,
  InitialStateListPerson,
  PersonsCreateProps,
} from '../../../../types/persons';
import Modal from '../../../atoms/Modal';
import AutoComplete from '../../../molecules/commons/AutoComplete';
import HeaderCreateAndEdit from '../../../molecules/commons/HeaderCreateAndEdit';
import TextField from '../../../molecules/commons/TextField';

const initialStateData: InitialStateDataPerson = {
  name: '',
};

const initialStateList: InitialStateListPerson = {
  label: 'Roles',
  value_search: '',
  name_search: 'roles',
  data_list: [],
  data_index_list: 'name',
};

const initialStateFilteredAndSelectedData: InitialStateFilteredAndSelectedDataPerson =
  {
    roles: [],
  };

const PersonsCreate = ({ show }: PersonsCreateProps) => {
  const router = useRouter();

  const { method } = router.query;

  const [data, setData] = useState(initialStateData);
  const [list, setList] = useState(initialStateList);

  const [filteredData, setFilteredData] = useState(
    initialStateFilteredAndSelectedData
  );
  const [selectedData, setSelectedData] = useState(
    initialStateFilteredAndSelectedData
  );

  const { createData } = usePersons();
  const { loadData } = useRoles();

  //   load data list
  useEffect(() => {
    (async () => {
      const result = await loadData();
      setList({ ...list, data_list: result.data });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  //   filter list
  useEffect(() => {
    if (list.value_search === '') {
      setFilteredData({ roles: list.data_list });
    } else {
      setFilteredData({
        roles: list.data_list.filter((val) =>
          val.name.toLowerCase().includes(list.value_search.toLowerCase())
        ),
      });
    }
  }, [list.data_list, list.value_search]);

  const handleSubmit = async () => {
    const result = await createData({
      name: data.name,
      role: selectedData.roles[0]._id,
    });

    if (result.success) {
      setData(initialStateData);
      setList(initialStateList);
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
            label={list.label}
            valueSearch={list.value_search}
            nameSearch={list.name_search}
            onChangeSearch={(e) =>
              setList({
                ...list,
                value_search: e.target.value,
              })
            }
            dataList={filteredData.roles}
            dataIndexList={list.data_index_list}
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
