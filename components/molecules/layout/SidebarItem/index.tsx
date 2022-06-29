import classNames from 'classnames';
import { SidebarItemProps } from '../../../../types/commons';

const SidebarItem = ({
  icon,
  title,
  onClick,
  active = false,
}: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames('flex w-full gap-[10px] rounded-xl p-5', {
        'bg-blue-50 font-bold text-blue-500': active,
        'text-slate-500 hover:bg-slate-50': !active,
      })}>
      {icon}
      <p>{title}</p>
    </button>
  );
};

export default SidebarItem;
