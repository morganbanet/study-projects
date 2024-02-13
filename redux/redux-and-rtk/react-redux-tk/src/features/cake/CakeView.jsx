import { useSelector, useDispatch } from 'react-redux';
import { ordered, restocked } from './cakeSlice';

function CakeView() {
  // Retreives state from our store file
  const numOfCakes = useSelector(
    (state) =>
      // Returns the state of our choosing
      // State here refers to multiple reducers in our store.js file
      // The ".cake" part is the key we gave for the cakeReducer in there
      // The ".numOfCakes" is then from the initialState in cakeSlice.js
      state.cake.numOfCakes
  );

  // Returns a reference to the dispatch function from the Redux store
  // Constant can be used to dispatch actions when needed
  const dispatch = useDispatch();

  // We can now display our state data in our JSX component.
  return (
    <div>
      <h2>Number of cakes - {numOfCakes}</h2>
      <button onClick={() => dispatch(ordered())}>Order cake</button>
      <button onClick={() => dispatch(restocked(5))}>Restock cakes</button>
    </div>
  );
}

export default CakeView;
