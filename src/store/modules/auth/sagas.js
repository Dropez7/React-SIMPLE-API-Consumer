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
	console.log(payload);
	const token = get(payload, 'auth.token', '');

	if (!token) return;

	axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
	takeLatest(types.LOGIN_REQUEST, loginRequest),
	takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
