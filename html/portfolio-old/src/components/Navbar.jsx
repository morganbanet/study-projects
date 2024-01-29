import { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';

function Navbar() {
  const contactRef = useRef();
  const projectsRef = useRef();

  const handleScroll = (event) => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY + 150) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      contactRef.current.querySelector('a').classList.add('active');
      projectsRef.current.querySelector('a').classList.remove('active');
    }

    if (!bottom) {
      contactRef.current.querySelector('a').classList.remove('active');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-inner">
        <ul>
          <li className="navbar-home">
            <Link activeClass="active" smooth spy to="title-section">
              Home
            </Link>
          </li>

          <li className="navbar-about">
            <Link activeClass="active" smooth spy to="about-section">
              About
            </Link>
          </li>

          <li ref={projectsRef} className="navbar-projects">
            <Link activeClass="active" smooth spy to="projects-section">
              Projects
            </Link>
          </li>

          <li ref={contactRef} className="navbar-contact">
            <Link activeClass="active" smooth spy to="contact-section">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
