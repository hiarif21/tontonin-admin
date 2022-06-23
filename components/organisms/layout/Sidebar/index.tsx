import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Icons from '../../../atoms/Icons';
import Modal from '../../../atoms/Modal';
import SidebarItem from '../../../molecules/layout/SidebarItem';

interface DataSidebar {
  Dashboard: string;
  Discovers: string;
  Movies: string;
  Genres: string;
  Persons: string;
  Roles: string;
  ['Watch Options']: string;
  ['Streaming Services']: string;
}

const dataSidebar = [
  { title: 'Dashboard' },
  { title: 'Discovers' },
  { title: 'Movies' },
  { title: 'Genres' },
  { title: 'Persons' },
  { title: 'Roles' },
  { title: 'Watch Options' },
  { title: 'Streaming Services' },
];

interface SidebarProps {
  title: string;
}

const Sidebar = ({ title }: SidebarProps) => {
  const [show, setShow] = useState(false);

  const ref = useRef(null);

  const handleClickOutside = () => {
    setShow(false);
  };

  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-3 items-center p-5">
        <div className="flex items-center">
          <button onClick={() => setShow(!show)}>
            <Icons icon={'Menu'} />
          </button>
        </div>
        <span className="justify-self-center whitespace-nowrap text-xl font-bold capitalize">
          {title}
        </span>
      </div>
      <Modal _ref={ref} show={show} onClickOutside={handleClickOutside}>
        <div
          ref={ref}
          className={classNames(
            'fixed h-screen max-h-screen w-3/4 overflow-auto bg-white p-5 duration-500 ease-in-out',
            {
              'left-0': show,
              '-left-full': !show,
            }
          )}>
          <div className="flex h-[24px] items-center justify-between">
            <Link href={'/'}>
              <a>
                <Image
                  src={'/tontonin.svg'}
                  alt={'Logo Tontonin'}
                  height={24}
                  width={130}
                />
              </a>
            </Link>
            <button onClick={() => setShow(!show)}>
              <Icons icon={'Close'} />
            </button>
          </div>
          <div className="mt-10 flex flex-col gap-1 whitespace-nowrap">
            {dataSidebar.map(({ title }, index) => {
              const path = router.pathname;

              let active = false;

              if (path === '/' && title === 'Dashboard') {
                active = true;
              } else if (path.replace('-', ' ') === `/${title.toLowerCase()}`) {
                active = true;
              }

              let icon;

              if (active) {
                icon = (
                  <Icons icon={title as keyof DataSidebar} color={'primary'} />
                );
              } else {
                icon = (
                  <Icons
                    icon={title as keyof DataSidebar}
                    color={'secondary'}
                  />
                );
              }

              const handleClick = () => {
                if (title === 'Dashboard') {
                  router.push('/');
                } else {
                  router.push(title.replace(' ', '-').toLowerCase());
                }
              };

              return (
                <SidebarItem
                  key={index}
                  icon={icon}
                  title={title}
                  onClick={handleClick}
                  active={active}
                />
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
