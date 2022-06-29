import { HeaderCreateAndEditProps } from '../../../../types/commons';
import Icons from '../../../atoms/Icons';

const HeaderCreateAndEdit = ({
  type,
  onSubmit,
  onBack,
}: HeaderCreateAndEditProps) => {
  return (
    <div className="sticky top-0 left-0 z-50 grid grid-cols-3 bg-white p-5 shadow-sm">
      <div className="flex items-center place-self-start">
        <button onClick={onBack}>
          <Icons icon={'Back'} />
        </button>
      </div>
      <div className="place-self-center font-bold">{type}</div>
      <div className="place-self-end">
        <button onClick={onSubmit} className="text-sm text-blue-500">
          Save
        </button>
      </div>
    </div>
  );
};

export default HeaderCreateAndEdit;
