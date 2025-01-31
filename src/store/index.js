import { persistStore } from 'redux-persist';
import persistedReducers from './modules/reduxPersist';

import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './modules/rootReducer';
import sagas from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	persistedReducers(reducers),
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
export default store;
