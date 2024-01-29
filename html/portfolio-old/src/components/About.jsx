function About() {
  return (
    <div id="about" className="about-section">
      <div className="about">
        <h2>About</h2>

        <img src="./images/man.png" />

        <div>
          <p>
            I’m a software engineer, or full stack web developer, with a passion
            for building web applications using JavaScript and React. <br />
            <br />
            I’m someone who loves a challenge and isn’t afraid to push ahead
            when learning something new. <br />
            <br />I have several ambitions in many areas of my life which I’d
            like to fulfil. I am always open to new opportunities. <br />
            <br />
            Whenever I am not at my computer, I like to spend my time with
            family, listening to music, or reading books.
          </p>
        </div>
      </div>

      <div className="stack">
        <h2>Tech</h2>

        <img src="./images/fork.png" />

        <div className="logos">
          <div className="layer-one">
            <div>
              <img src="./images/logos/javascript.png" />
              <p>JavaScript</p>
            </div>

            <div>
              <img src="./images/logos/react.png" />
              <p>React</p>
            </div>

            <div>
              <img src="./images/logos/express.png" />
              <p>Express</p>
            </div>

            <div>
              <img src="./images/logos/node.png" />
              <p>Node</p>
            </div>
          </div>

          <div className="layer-two">
            <div>
              <img src="./images/logos/mongodb.png" />
              <p>MongoDB</p>
            </div>

            <div>
              <img src="./images/logos/firebase.png" />
              <p>Firebase</p>
            </div>

            <div>
              <img src="./images/logos/git.png" />
              <p>Git</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
