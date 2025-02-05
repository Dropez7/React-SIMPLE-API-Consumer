import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import history from '../../services/history'; // Importando o history

import axios from '../../services/axios'; // É o cara que fala com a API

import Loading from '../../components/Loading'; // Componente de Loading

import { useSelector } from 'react-redux';

import { Form } from './styled';

export default function Register() {
	const id = useSelector((state) => state.auth.user.id); // Pegando o estado do redux
	const nomeStored = useSelector((state) => state.auth.user.nome); // Pegando o estado do redux
	const emailStored = useSelector((state) => state.auth.user.email); // Pegando o estado do redux

	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

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

		if (password.length < 6 || password.length > 50) {
			formErros = true;
			toast.error('Senha precisa ter entre 6 e 50 caracteres');
		}

		if (formErros) return;

		setLoading(true);
		try {
			await axios.post('/users/', {
				nome,
				email,
				password,
			});

			toast.success('Cadastro realizado com sucesso!');
			setLoading(false);
			history.push('/login'); // Redireciona para a página de login
		} catch (e) {
			get(e, 'response.data.errors', []).map((err) => toast.error(err));
			setLoading(false);
		}
	}

	return (
		<>
			<Loading isLoading={loading} />
			<h1>Crie sua Conta!</h1>

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

				<button type="submit">Criar Conta</button>
			</Form>
		</>
	);
}
