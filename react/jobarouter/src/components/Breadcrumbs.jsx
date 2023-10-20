import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    // Filter out white space item if there is leading / in the pathname
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;

      // Return a piece of template for the current iteration
      // Each piece of template is stored in crumbs variable
      return (
        <div className="crumb" key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });

  return <div className="breadcrumbs">{crumbs}</div>;
}
