import { CardsProps } from '../../../../types/dashboard';
import Card from '../../../molecules/commons/Card';

const Cards = ({ data }: CardsProps) => {
  return (
    <>
      {data.map(({ content }, index) => {
        return <Card key={index}>{content}</Card>;
      })}
    </>
  );
};

export default Cards;
