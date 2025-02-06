import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import Loading from '../../components/Loading'; // Componente de Loading

import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions'; // Actions do redux

import { Form } from './styled';

export default function Register() {
	const dispatch = useDispatch(); // Disparar actions pro redux

	const id = useSelector((state) => state.auth.user.id); // Pegando o estado do redux
	const nomeStored = useSelector((state) => state.auth.user.nome); // Pegando o estado do redux
	const emailStored = useSelector((state) => state.auth.user.email); // Pegando o estado do redux
	const isLoading = useSelector((state) => state.auth.isLoading); // Pegando o estado do redux

	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	React.useEffect(() => {
		if (!id) return;
		setNome(nomeStored);
		setEmail(emailStored);
	}, [id, nomeStored, emailStored]);

	async function handleSubmit(e) {
		e.preventDefault();

		// Vou validar aqui pra n gastar recursos do servidor
		let formErros = false;

		if (nome.length < 3 || nome.length > 255) {
			formErros = true;
			toast.error('Nome precisa ter entre 3 e 255 caracteres');
		}

		if (!isEmail(email)) {
			formErros = true;
			toast.error('E-mail inválido');
		}

		if (!id && (password.length < 6 || password.length > 50)) {
			formErros = true;
			toast.error('Senha precisa ter entre 6 e 50 caracteres');
		}

		if (formErros) return;
		console.log('id', id);
		dispatch(actions.registerRequest({ nome, email, password, id }));
	}

	return (
		<>
			<Loading isLoading={isLoading} />
			<h1>{id ? 'Editar Dados' : 'Crie sua Conta!'}</h1>

			<Form onSubmit={handleSubmit}>
				<label htmlFor="nome">
					Nome:
					<input
						type="text"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						placeholder="Digite seu nome"
					/>
				</label>

				<label htmlFor="Email">
					Email:
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Digite seu Email"
					/>
				</label>

				<label htmlFor="password">
					Senha:
					<input
						type="text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Digite sua Senha"
					/>
				</label>

				<button type="submit">{id ? 'Salvar' : 'Editar Conta'}</button>
			</Form>
		</>
	);
}
