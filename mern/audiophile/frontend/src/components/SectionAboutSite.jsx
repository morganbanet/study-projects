import React from 'react';

function AboutSite({ className }) {
  return (
    <section className={`about-site ${className}`}>
      <div className="about-site-container">
        <div className="img-container">
          <picture>
            <source
              srcSet="/images/shared/desktop/image-best-gear.jpg"
              media="(min-width: 1110px)"
            />
            <source
              srcSet="/images/shared/tablet/image-best-gear.jpg"
              media="(min-width: 768px)"
            />
            <img src="/images/shared/mobile/image-best-gear.jpg" />
          </picture>
        </div>

        <div className="about-site-info">
          <h2>
            Bringing you the <span>best</span> audio gear
          </h2>
          <p>
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSite;
