import { Link } from 'react-scroll';

function Footer() {
  return (
    <div className="footer">
      <Link smooth spy to="title-section">
        <span className="material-symbols-outlined">
          keyboard_double_arrow_up
        </span>
      </Link>

      <p>ALEX MORGAN ©2024</p>
    </div>
  );
}

export default Footer;
