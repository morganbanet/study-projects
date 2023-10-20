import { useParams, useNavigate } from 'react-router-dom';

import useFetch from './useFetch';

const BlogDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: blog, isLoading, error } = useFetch(`blogs/${id}`);

  const handleDelete = async () => {
    const options = { method: 'DELETE' };
    await fetch(`http://localhost:5000/blogs/${id}`, options);

    navigate('/');
  };

  return (
    <div className="blog-details">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>

          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
