import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { ModalProps } from '../../../types/commons';

const Modal = ({ show, children, onClickOutside, _ref }: ModalProps) => {
  const ref = useRef(null);
  onClickOutside ? onClickOutside : (onClickOutside = () => {});

  useOnClickOutside(_ref || ref, onClickOutside);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [show]);

  return (
    <div
      className={classNames(
        'fixed left-0 top-0 z-50 h-screen w-screen bg-slate-900/25 duration-300 ease-in-out',
        {
          'invisible opacity-0': !show,
        }
      )}>
      {children}
    </div>
  );
};

export default Modal;
