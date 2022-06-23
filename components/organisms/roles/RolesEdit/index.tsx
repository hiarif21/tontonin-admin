import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRoles } from '../../../../context/rolesContext';
import Modal from '../../../atoms/Modal';
import HeaderCreateAndEdit from '../../../molecules/commons/HeaderCreateAndEdit';
import TextField from '../../../molecules/commons/TextField';

interface RolesEditProps {
  show: boolean;
}

const initialStateData = {
  name: '',
};

const RolesEdit = ({ show }: RolesEditProps) => {
  const router = useRouter();

  const [data, setData] = useState(initialStateData);
  const { id } = router.query;

  const { getData, editData }: any = useRoles();

  useEffect(() => {
    if (id) {
      (async () => {
        const result = await getData(id);
        result.success
          ? setData({ name: result.data.name })
          : toast.error(result.message);
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async () => {
    const result = await editData(id, data);

    if (result.success) {
      setData(initialStateData);
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
          'fixed h-full w-full bg-white transition-all duration-500 ease-in-out',
          {
            'right-0': show,
            '-right-full': !show,
          }
        )}>
        <HeaderCreateAndEdit
          type={'Edit'}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
        <div className="p-5">
          <TextField
            label="Name"
            value={data.name}
            onChange={(e) => setData({ name: e.target.value })}
          />
        </div>
      </div>
    </Modal>
  );
};

export default RolesEdit;
