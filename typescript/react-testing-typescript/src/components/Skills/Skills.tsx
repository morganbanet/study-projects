import { useState, useEffect } from 'react';
import { SkillsProps } from './Skills.types';

function Skills({ skills }: SkillsProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For the findBy & findAllBy queries in testing
  useEffect(() => {
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 500);
  }, []);

  return (
    <>
      <ul>
        {skills.map((skill) => {
          return <li key={skill}>{skill}</li>;
        })}
      </ul>

      {/* For the queryBy and queryAllBy queries in testing */}
      {isLoggedIn ? (
        <button>Start learning</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </>
  );
}
export default Skills;
