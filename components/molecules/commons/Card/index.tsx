import { ReactNode } from 'react';

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex aspect-[3/2] flex-col items-center justify-center gap-[10px] break-all rounded-xl bg-slate-100 p-5">
      {children}
    </div>
  );
};

export default Card;
