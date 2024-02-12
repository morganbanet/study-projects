// We import our store from the app/store.js
import store from './app/store.js';

// To dispatch the cake actions we need to import them from cakeSlice.js
import { cakeActions } from './features/cake/cakeSlice.js';
import { icecreamActions } from './features/icecream/icecreamSlice.js';
import { fetchUsers } from './features/user/userSlice.js';

console.log('Initial state: ', store.getState());
const unsubscribe = store.subscribe(() => {
  console.log('Updated state: ', store.getState());
});

// Disaptch the async thunk action
store.dispatch(fetchUsers());

// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.restocked(3));

// store.dispatch(icecreamActions.ordered());
// store.dispatch(icecreamActions.ordered());
// store.dispatch(icecreamActions.restocked(2));

// unsubscribe();
