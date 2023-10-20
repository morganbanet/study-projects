import { useLoaderData } from 'react-router-dom';

export const careerDetailsLoader = async ({ params }) => {
  try {
    const baseURL = 'http://localhost:5000';
    const response = await fetch(`${baseURL}/careers/${params.id}`);

    if (!response.ok) {
      throw new Error(`Career not found with id of ${params.id}`);
    }

    return response.json();
  } catch (error) {
    console.log(error.message);
  }
};

const CareerDetailsScreen = () => {
  const career = useLoaderData();

  return (
    <div className="career-details">
      <h2>Career Details for {career.title}</h2>
      <p>Starting salary: {career.salary}</p>
      <p>Location: {career.location}</p>
      <div className="details">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
        fugit illum vero incidunt. Amet velit corrupti a minus consectetur,
        cumque corporis, molestias repudiandae aliquid ducimus unde eos modi,
        natus ut.
      </div>
    </div>
  );
};

export default CareerDetailsScreen;
