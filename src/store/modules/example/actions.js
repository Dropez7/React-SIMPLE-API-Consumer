import * as types from '../types';

export function clicaBotaoRequest() {
	return {
		type: types.BOTAO_CLICADO_REQUEST,
		payload: { name: 'Pedro' },
	};
}

export function clicaBotaoSuccess() {
	return {
		type: types.BOTAO_CLICADO_SUCCESS,
		payload: { name: 'Pedro' },
	};
}

export function clicaBotaoFailure() {
	return {
		type: types.BOTAO_CLICADO_FAILURE,
		payload: { name: 'Pedro' },
	};
}
