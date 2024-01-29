function Contact() {
  return (
    <div id="contact" className="contact-section">
      <h2>Contact</h2>

      <p>
        Have a question or want to work together? Leave me a message and I’ll
        get back to you as soon as possible.
      </p>

      <div className="contact-links">
        <ul>
          <li>
            <div className="contact-icon">
              <span className="material-symbols-outlined">call</span>
            </div>

            <a href="tel:07947821231">+44 7947 821 231</a>
          </li>

          <li>
            <div className="contact-icon">
              <span className="material-symbols-outlined">mail</span>
            </div>

            <a href="mailto:contact@morganba.com">contact@morganba.com</a>
          </li>

          <li>
            <div className="contact-icon">
              <i className="fa-brands fa-linkedin-in" />
            </div>

            <a href="https://www.linkedin.com/in/morganbanet/" target="_blank">
              in/morganbanet
            </a>
          </li>

          <li>
            <div className="contact-icon">
              <i className="fa-brands fa-github-alt" />
            </div>

            <a href="https://github.com/morganbanet" target="_blank">
              github.com/morganbanet
            </a>
          </li>
        </ul>

        <a
          className="download-btn"
          href="https://dl.dropbox.com/scl/fi/v0cnu9pl39hlvsneq7mrd/alex_morgan_cv.pdf?rlkey=9o9gukalaz6180biix17oove9&dl=0"
          download="alex_morgan_cv"
        >
          <span className="material-symbols-outlined">cloud_download</span>
          Download CV PDF
        </a>
      </div>
    </div>
  );
}

export default Contact;
