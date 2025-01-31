import { call, put, all, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import * as actions from './actions';
import * as types from '../types';

const requisicao = () =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, 600);
	});

export function* exampleRequest() {
	try {
		yield call(requisicao);
		yield put(actions.clicaBotaoSuccess());
	} catch (err) {
		toast.error('Deu erro.');
		console.log('Erro');
	}
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
