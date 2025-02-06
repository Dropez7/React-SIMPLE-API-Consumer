import { call, put, all, takeLatest } from 'redux-saga/effects';
// call: Chama uma função que retorna uma promise
// put: Dispara uma action
// all: Permite que eu escute várias actions ao mesmo tempo
// takeLatest: Pega a última action disparada e executa a função que eu passar

import { toast } from 'react-toastify';

import * as actions from './actions';
import * as types from '../types';

import history from '../../../services/history';

import axios from '../../../services/axios';

import { get } from 'lodash';

export function* loginRequest({ payload }) {
	try {
		// Não uso axios.post('/tokens', payload) porque o payload é um objeto com email e senha, uso call
		const response = yield call(axios.post, '/tokens', payload);
		yield put(actions.loginSuccess({ ...response.data }));

		toast.success('Login realizado com sucesso!');

		// Adicionando o token no cabeçalho das requisições
		// Porém é so quando loga, dps some, ent tenho que usar outra action pra settar isso
		axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

		// Redireciona pra rota que ele tava tentando acessar
		history.push(payload.prevPath);
	} catch (e) {
		toast.error('Usuário ou senha inválidos');

		yield put(actions.loginFailure());
	}
}

function persistRehydrate({ payload }) {
	const token = get(payload, 'auth.token', '');

	if (!token) return;

	axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
	console.log('payload', payload);
	const { id, nome, email, password } = payload;
	console.log('id 2', id);
	try {
		if (id) {
			// Como tem id ele ta logado e vai mudar os dados
			yield call(axios.put, `/users/${id}`, {
				nome,
				email,
				password: password || undefined,
			});
			toast.success('Conta alterada com sucesso');
			yield put(
				actions.registerUpdatedSuccess({ id, nome, email, password })
			);
		} else {
			// Como não tem id ele vai criar uma conta
			yield call(axios.post, '/users', {
				nome,
				email,
				password,
			});
			toast.success('Conta criada com sucesso');
			yield put(
				actions.registerCreatedSuccess({ id, nome, email, password })
			);
			history.push('/login');
		}
	} catch (e) {
		const errors = get(e, 'response.data.error', []);
		const status = get(e, 'response.status', 0);

		if (status === 401) {
			toast.error('Você precisa fazer login novamente');
			yield put(actions.loginFailure());
			return history.push('/login');
		}

		if (errors.length > 0) {
			errors.map((error) => toast.error(error));
		} else {
			toast.error('Erro desconhecido');
		}
		yield put(actions.registerFailure());
		return history.push('/login');
	}
}

export default all([
	takeLatest(types.LOGIN_REQUEST, loginRequest),
	takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
	takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
