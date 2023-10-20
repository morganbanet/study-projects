import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../utils/useFetch';

const DetailsScreen = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: blog, error, isLoading } = useFetch(`blogs/${id}`);

  const handleDelete = async () => {
    const options = { method: 'DELETE' };
    await fetch(`/api/blogs/${id}`, options);

    navigate('/');
  };

  return (
    <div className="blog-details">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written By {blog.author}</p>
          <div>{blog.body}</div>

          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default DetailsScreen;
