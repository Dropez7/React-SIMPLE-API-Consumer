import React, { useState } from 'react';
import { Form } from './styled';

import { useDispatch, useSelector } from 'react-redux';

import { get } from 'lodash'; // Buscar de um objeto mais aninhado
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/Loading';

export default function Login(props) {
	const dispatch = useDispatch();

	const isLoading = useSelector((state) => state.auth.isLoading);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(e) {
		e.preventDefault();

		// Se existir ele pega, se n ele considera '/'
		const prevPath = get(props, 'location.state.prevPath', '/');

		console.log(email, password);

		// Vou validar aqui pra n gastar recursos do servidor
		let formErros = false;

		if (!isEmail(email)) {
			formErros = true;
			toast.error('E-mail inválido');
		}

		if (password.length < 6 || password.length > 50) {
			formErros = true;
			toast.error('Senha inválida');
		}

		if (formErros) return;

		// Disparando uma action de loginrequest mandando meu email e senha
		dispatch(actions.loginRequest({ email, password, prevPath }));
	}
	// React.useEffect(() => {
	// 	// Função que faz o get na api
	// 	async function getData() {
	// 		console.log('Bom dia');
	// 	}

	// 	getData();
	// }, []);

	return (
		<>
			<Loading isLoading={isLoading} />
			<h1>Login</h1>

			<Form onSubmit={handleSubmit}>
				<label htmlFor="email">
					E-mail:
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Digite seu e-mail"
					/>
				</label>

				<label htmlFor="password">
					Senha:
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Digite sua senha"
					/>
				</label>

				<button type="submit">Entrar</button>
			</Form>
		</>
	);
}
