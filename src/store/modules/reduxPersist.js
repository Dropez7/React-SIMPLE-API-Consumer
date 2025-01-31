import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';
import rootReducer from './rootReducer';

export default function reducers() {
	const persistedReducer = persistReducer(
		{
			key: 'ReactBase',
			storage,
			whitelist: ['exampleReducer'],
		},
		rootReducer
	);

	return persistedReducer;
}
