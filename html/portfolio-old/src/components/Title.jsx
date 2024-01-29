import { useEffect } from 'react';
import { Link } from 'react-scroll';
import canvasDots from '../utils/canvasDots';

function Title() {
  useEffect(() => canvasDots(), []);

  return (
    <div id="home" className="title-section">
      <div className="canvas">
        <canvas className="connecting-dots" />
      </div>

      <h1>
        Hi, I'm <span>Alex</span>. <br />
        I'm a full stack web developer.
      </h1>

      <Link className="about-link" smooth spy to="about-section">
        View my work
        <span className="material-symbols-outlined">arrow_downward</span>
      </Link>
    </div>
  );
}

export default Title;
