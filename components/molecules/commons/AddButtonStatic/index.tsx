import { AddButtonStaticProps } from '../../../../types/commons';
import Icons from '../../../atoms/Icons';

const AddButtonStatic = ({ title, onClick }: AddButtonStaticProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 flex items-center gap-3 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold capitalize text-white shadow-md shadow-blue-500/50">
      <Icons icon={'Plus'} color={'white'} />
      {title}
    </button>
  );
};

export default AddButtonStatic;
