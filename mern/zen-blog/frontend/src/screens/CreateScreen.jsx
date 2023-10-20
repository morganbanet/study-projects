import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('John Doe');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // data to send in http body
    const blogPost = { title, body, author };

    setIsLoading(true);

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(blogPost),
    };

    await fetch('/api/blogs', options);

    setIsLoading(false);

    // Redirect back to homepage once submitted
    navigate('/');
  };

  return (
    <div className="create">
      <h2>Add a new blog</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Blog title:</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="body">Blog body:</label>
        <textarea
          id="body"
          name="body"
          rows="5"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <label htmlFor="author">Blog author:</label>
        <select
          id="author"
          name="author"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="John Doe">John Doe</option>
          <option value="Sarah Jane">Sarah Jane</option>
        </select>

        {!isLoading && <button>Add blog</button>}
        {isLoading && <button disabled>Submitting...</button>}
      </form>
    </div>
  );
};

export default CreateScreen;
