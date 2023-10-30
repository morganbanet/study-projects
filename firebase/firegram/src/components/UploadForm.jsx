import { useState } from 'react';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const changeHandler = async (e) => {
    e.preventDefault();

    // Specify index to grab only one file
    let selected = e.target.files[0];

    // Make sure selected is an image file before setting state
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(null);

      console.log(selected);
    } else {
      setFile(null);
      setError('Please select a valid image type (png or jpeg)');
    }
  };

  return (
    <form type="file">
      <input type="file" onChange={changeHandler}></input>

      <div className="output">
        {error && <div className="error">{error}</div>}

        {file && <div>{file.name}</div>}
      </div>
    </form>
  );
}
export default UploadForm;
