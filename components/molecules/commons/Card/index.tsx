import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="flex aspect-[3/2] flex-col items-center justify-center gap-[10px] break-all rounded-xl bg-slate-100 p-5">
      {children}
    </div>
  );
};

export default Card;
