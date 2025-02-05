export const BOTAO_CLICADO_SUCCESS = 'BOTAO_CLICADO_SUCCESS';
export const BOTAO_CLICADO_FAILURE = 'BOTAO_CLICADO_FAILURE';
export const BOTAO_CLICADO_REQUEST = 'BOTAO_CLICADO_REQUEST';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Uso essa action por que ela é disparada pelo redux-persist sempre que ele termina de carregar o estado inicial da aplicação. assim eu posso recolocar o token no cabeçalho das requisições
export const PERSIST_REHYDRATE = 'persist/REHYDRATE';
