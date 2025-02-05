import React from 'react';
import Header from './components/Header';
import GlobalStyles from './styles/GlobalStyles';
import { Container } from './styles/GlobalStyles';
import { Router } from 'react-router-dom';
import history from './services/history';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<Router history={history}>
					<Header />
					<Container>
						<Routes />
						<GlobalStyles />
						<ToastContainer
							autoClose={3000}
							className="toast-container"
						/>
					</Container>
				</Router>
			</PersistGate>
		</Provider>
	);
}

export default App;
