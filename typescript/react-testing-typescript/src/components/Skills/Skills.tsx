import { SkillsProps } from './Skills.types';

function Skills({ skills }: SkillsProps) {
  return (
    <>
      <ul>
        {skills.map((skill) => {
          return <li key={skill}>{skill}</li>;
        })}
      </ul>
    </>
  );
}
export default Skills;
