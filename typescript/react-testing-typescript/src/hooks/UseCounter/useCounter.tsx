import { useState } from 'react';
import { UseCounterProps } from './useCounter.types';

function useCounter({ initialCount = 0 }: UseCounterProps = {}) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // Return values for this custom hook
  return { count, increment, decrement };
}
export default useCounter;
