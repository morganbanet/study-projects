import { CounterTwoProps } from './CounterTwo.types';

function CounterTwo({
  count,
  handleIncrement,
  handleDecrement,
}: CounterTwoProps) {
  return (
    <div>
      <h1>Counter Two</h1>
      <p>{count}</p>
      {handleIncrement && <button onClick={handleIncrement}>Increment</button>}
      {handleDecrement && <button onClick={handleDecrement}>Decrement</button>}
    </div>
  );
}
export default CounterTwo;
