import {
  createStore,
  bindActionCreators,
  combineReducers,
  applyMiddleware,
} from 'redux';

import reduxLogger from 'redux-logger';
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// Action creator
const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
};
const restockCake = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty, // Dynamic value inside an action property
  };
};
const orderIceCream = (qty = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
};
const restockIceCream = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
};

// State object
// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };

const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case 'CAKE_ORDERED':
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case 'CAKE_RESTOCKED':
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case 'ICECREAM_ORDERED':
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    case 'ICECREAM_RESTOCKED':
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

// Combine our multiple reducers into one using combineReducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// Create a store using createStore and pass in the reducer method
const store = createStore(rootReducer, applyMiddleware(logger));

// Get the current state of the app
console.log(`Initial state: `, store.getState());

// Subscribe to changes in the store
// const unsubscribe = store.subscribe(() =>
//   console.log(`Updated state: `, store.getState())
// );

// Dispatch an action to the state
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

// Bind actions
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);

// Dispatch actions
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

// Unsubscribe to changes in the store
// unsubscribe();

store.dispatch(orderCake());
