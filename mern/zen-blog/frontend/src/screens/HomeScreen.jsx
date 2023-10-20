import useFetch from '../utils/useFetch';
import BlogList from '../components/BlogList';

const HomeScreen = () => {
  const { data: blogs, error, isLoading } = useFetch('blogs');

  return (
    <div className="home">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {blogs && <BlogList blogs={blogs} title={'All Blogs!'} />}
    </div>
  );
};

export default HomeScreen;
