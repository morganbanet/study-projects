import useFetch from './useFetch';
import BlogList from './BlogList';

const Home = () => {
  const { data: blogs, isLoading, error } = useFetch('blogs');

  return (
    <div className="home">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {blogs && <BlogList blogs={blogs} title={'All Blogs!'} />}
    </div>
  );
};

export default Home;
