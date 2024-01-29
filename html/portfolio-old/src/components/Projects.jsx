function Projects() {
  return (
    <div id="projects" className="projects-section">
      <h2>Projects</h2>

      <div className="project">
        <div className="project-thumbnail">
          <img src="./images/screenshot_1.png" alt="screenshot 1" />
        </div>

        <div className="project-details">
          <h3>
            Tweeter <br />
            Social Media App
          </h3>

          <p>
            Full stack social media application built with React, Express, Node,
            MongoDB, and Firebase Admin.
          </p>

          <div className="project-links">
            <a href="#">Live App</a>
            <a href="#">Visit GitHub</a>
          </div>
        </div>
      </div>

      <div className="project">
        <div className="project-thumbnail">
          <img src="./images/screenshot_2.png" alt="screenshot 2" />
        </div>

        <div className="project-details">
          <h3>
            Art Course API <br />
            REST API
          </h3>

          <p>
            Back-end only art course directory application built with Express,
            Node, and MongoDB Atlas.
          </p>

          <div className="project-links">
            <a href="#">Live App</a>
            <a href="#">Visit GitHub</a>
          </div>
        </div>
      </div>

      <div className="project">
        <div className="project-thumbnail">
          <img src="./images/screenshot_3.png" alt="screenshot 3" />
        </div>

        <div className="project-details">
          <h3>
            FilmFlex <br />
            Movie Guide App
          </h3>

          <p>
            Movie guide application built without a framework, only JavaScript
            and The Movie Database API.
          </p>

          <div className="project-links">
            <a href="#">Live App</a>
            <a href="#">Visit GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
