import { useActionData, Form, redirect } from 'react-router-dom';

export const contactAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get('email'),
    message: data.get('message'),
  };

  // Send post request
  if (submission.message.length < 10) {
    return {
      error: 'Message must be a minimum of 10 characters',
    };
  }

  console.log(submission);

  // Redirect
  return redirect('/');
};

export default function ContactScreen() {
  const data = useActionData();

  return (
    <div className="contact">
      <h3>Contact Us</h3>

      <Form method="POST" action="/help/contact">
        <label>
          <span>Your email:</span>
          <input type="email" name="email" required />
        </label>

        <label>
          <span>Your message:</span>
          <textarea name="message" required></textarea>
        </label>

        <button>Submit</button>

        {data && data.error && <p>{data.error}</p>}
      </Form>
    </div>
  );
}
