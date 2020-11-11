import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";
import { voterToolReducer } from '../reducers/voterToolReducer';

import { composeWithDevTools } from "redux-devtools-extension";

// Internally, store will call reducer when it's intially created.  State will be init by the param initializer
export const voterToolStore = createStore(voterToolReducer, composeWithDevTools(applyMiddleware(thunk)));