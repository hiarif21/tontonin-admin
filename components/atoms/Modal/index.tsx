import classNames from 'classnames';
import { ReactNode, RefObject, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

interface ModalProps {
  show: boolean;
  children: ReactNode;
  onClickOutside?: (event: MouseEvent) => void;
  _ref?: RefObject<HTMLElement>;
}

const Modal = ({ show, children, onClickOutside, _ref }: ModalProps) => {
  const ref = useRef(null);
  onClickOutside ? onClickOutside : (onClickOutside = () => {});

  useOnClickOutside(_ref || ref, onClickOutside);

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
