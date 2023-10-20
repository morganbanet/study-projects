import { useLoaderData, Link } from 'react-router-dom';

export const careersLoader = async () => {
  try {
    const baseURL = 'http://localhost:5000';
    const response = await fetch(`${baseURL}/careers`);

    if (!response.ok) {
      throw new Error(`Resource not found`);
    }

    return response.json();
  } catch (error) {
    console.log(error.message);
  }
};

export default function CareersScreen() {
  const careers = useLoaderData();

  return (
    <div className="careers">
      {careers.map((career) => (
        <Link to={`${career.id}`} key={career.id}>
          <p>{career.title}</p>
          <p>Based in {career.location}</p>
        </Link>
      ))}
    </div>
  );
}
