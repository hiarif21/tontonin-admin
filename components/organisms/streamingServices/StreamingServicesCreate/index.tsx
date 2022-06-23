import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useStreamingServices } from '../../../../context/streamingServicesContext';
import Modal from '../../../atoms/Modal';
import HeaderCreateAndEdit from '../../../molecules/commons/HeaderCreateAndEdit';
import TextField from '../../../molecules/commons/TextField';

interface StreamingServicesCreateProps {
  show: boolean;
}

const initialStateData = {
  name: '',
};

const StreamingServicesCreate = ({ show }: StreamingServicesCreateProps) => {
  const router = useRouter();

  const [data, setData] = useState(initialStateData);

  const { createData }: any = useStreamingServices();

  const handleSubmit = async () => {
    const result = await createData(data);

    if (result.success) {
      setData(initialStateData);
      handleBack();
      toast(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleBack = () => {
    router.push(`${router.pathname}`);
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
          type={'Create'}
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

export default StreamingServicesCreate;
