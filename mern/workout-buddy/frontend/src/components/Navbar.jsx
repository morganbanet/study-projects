import { Link } from 'react-router-dom';

import { useAuthContext } from '../hooks/auth/useAuthContext';
import { useLogout } from '../hooks/auth/useLogout';

function Navbar() {
  const { logout } = useLogout();

  const { userInfo } = useAuthContext();

  const handleClick = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>

        <nav>
          {userInfo && (
            <div>
              <span>{userInfo.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          {!userInfo && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Navbar;
