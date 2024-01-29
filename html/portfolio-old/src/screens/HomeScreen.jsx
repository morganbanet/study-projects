import Title from '../components/Title';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function HomeScreen() {
  return (
    <main>
      <section>
        <Title />
      </section>

      <Navbar />

      <section>
        <About />
      </section>

      <section>
        <Projects />
      </section>

      <section>
        <Contact />
      </section>

      <Footer />
    </main>
  );
}

export default HomeScreen;
