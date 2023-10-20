import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
  return (
    <div>
      <h2>Page not found!</h2>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
        impedit libero error voluptate deserunt maxime sunt amet officiis.
        Inventore sequi assumenda placeat quia sapiente cum expedita dolorum
        voluptates exercitationem neque!
      </p>

      <p>
        Go to the <Link to="/">homepage</Link>.
      </p>
    </div>
  );
};

export default NotFoundScreen;
