import Skills from './components/Skills/Skills';

function App() {
  const skills = ['Html', 'Css', 'JavaScript'];

  return (
    <div className="App">
      <Skills skills={skills} />
    </div>
  );
}
export default App;
