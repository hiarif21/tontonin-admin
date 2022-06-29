import { useEffect } from 'react';
import GenresTemplate from '../../components/templates/GenresTemplate';
import { useGenres } from '../../context/genresContext';
import { getGenres } from '../../services/api/genres.service';
import { GenresProps } from '../../types/genres';

const Genres = ({ data }: GenresProps) => {
  const { setData } = useGenres();

  useEffect(() => {
    setData(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <GenresTemplate />;
};

export async function getServerSideProps() {
  const result = await getGenres();
  return {
    props: {
      data: result.data,
    },
  };
}

export default Genres;
