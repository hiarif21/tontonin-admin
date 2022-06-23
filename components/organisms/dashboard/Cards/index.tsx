import Card from '../../../molecules/commons/Card';

interface CardsProps {
  data: {
    content: any;
  }[];
}

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
