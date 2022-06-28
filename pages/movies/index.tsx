import { useEffect } from 'react';
import MoviesTemplate from '../../components/templates/MoviesTemplate';
import { useMovies } from '../../context/moviesContext';
import { getMovies } from '../../services/api/movies.service';

interface MoviesProps {
  data: {
    _id: string;
    name: string;
  }[];
  total_data: number;
}

const Movies = ({ data, total_data }: MoviesProps) => {
  const { setData, setTotalData }: any = useMovies();

  useEffect(() => {
    setData(data);
    setTotalData(total_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MoviesTemplate />;
};

export async function getServerSideProps() {
  const result = await getMovies();
  return {
    props: {
      data: result.data,
      total_data: result.total_data,
    },
  };
}

export default Movies;
