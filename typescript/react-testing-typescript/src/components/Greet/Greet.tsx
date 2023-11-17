import { GreetProps } from './Greet.types';

function Greet({ name }: GreetProps) {
  return <div>Hello {name ? name : 'Guest'}</div>;
}
export default Greet;
