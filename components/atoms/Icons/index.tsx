import classNames from 'classnames';
import {
  ArrowSmLeftIcon,
  BanIcon,
  ClipboardListIcon,
  CollectionIcon,
  FilmIcon,
  HomeIcon,
  MenuIcon,
  MinusCircleIcon,
  PencilAltIcon,
  PlusCircleIcon,
  PlusSmIcon,
  PuzzleIcon,
  TicketIcon,
  TrashIcon,
  UserGroupIcon,
  VideoCameraIcon,
  XIcon,
} from '@heroicons/react/solid';
import { IconsProps } from '../../../types/commons';

const Icons = ({ icon, size, color }: IconsProps) => {
  const style = classNames('', {
    'h-6 w-6': !size || size === 'default',
    'h-5 w-5': size === 'small',
    'h-4 w-4': size === 'smallest',
    'fill-slate-900': !color || color === 'default',
    'fill-blue-500': color === 'primary',
    'fill-slate-500': color === 'secondary',
    'fill-red-500': color === 'danger',
    'fill-white': color === 'white',
  });

  switch (icon) {
    case 'Menu': {
      return <MenuIcon className={style} />;
    }
    case 'Close': {
      return <XIcon className={style} />;
    }
    case 'Dashboard': {
      return <HomeIcon className={style} />;
    }
    case 'Discovers': {
      return <CollectionIcon className={style} />;
    }
    case 'Movies': {
      return <FilmIcon className={style} />;
    }
    case 'Genres': {
      return <ClipboardListIcon className={style} />;
    }
    case 'Persons': {
      return <UserGroupIcon className={style} />;
    }
    case 'Roles': {
      return <PuzzleIcon className={style} />;
    }
    case 'Watch Options': {
      return <VideoCameraIcon className={style} />;
    }
    case 'Streaming Services': {
      return <TicketIcon className={style} />;
    }
    case 'Edit': {
      return <PencilAltIcon className={style} />;
    }
    case 'Delete': {
      return <TrashIcon className={style} />;
    }
    case 'Plus': {
      return <PlusSmIcon className={style} />;
    }
    case 'Back': {
      return <ArrowSmLeftIcon className={style} />;
    }
    case 'Minus Circle': {
      return <MinusCircleIcon className={style} />;
    }
    case 'Plus Circle': {
      return <PlusCircleIcon className={style} />;
    }
    default:
      return <BanIcon className={style} />;
  }
};

export default Icons;
