import { useRef } from 'react';
import { AlertDeleteProps } from '../../../../types/commons';
import Modal from '../../../atoms/Modal';

const AlertDelete = ({ data, show, onClick }: AlertDeleteProps) => {
  const ref = useRef(null);

  return (
    <Modal _ref={ref} show={show} onClickOutside={() => onClick(false)}>
      <div className="flex h-full w-full items-center justify-center">
        <div
          ref={ref}
          className="flex flex-col items-center gap-5 rounded-xl bg-white p-5">
          <span className="font-bold">{data}</span>
          <span>Are you sure you want to delete?</span>
          <div className="flex gap-5">
            <button
              onClick={() => onClick(false)}
              className="rounded-xl bg-blue-500 px-5 py-3 text-xs font-bold text-white">
              Cancel
            </button>
            <button
              onClick={() => onClick(true)}
              className="rounded-xl bg-slate-100 px-5 py-3 text-xs font-bold">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AlertDelete;
