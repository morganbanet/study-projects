import { useState } from 'react';
import { useRegister } from '../hooks/auth/useRegister';

function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, isLoading, error } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();

    register(username, email, password);

    setPassword('');
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Register</h3>

      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button disabled={isLoading}>Register</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
}
export default RegisterScreen;
