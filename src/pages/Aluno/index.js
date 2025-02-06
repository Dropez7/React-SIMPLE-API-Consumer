import React from 'react';
import get from 'lodash/get';

import { PropTypes } from 'prop-types';

import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import { FaEdit, FaUserCircle } from 'react-icons/fa';

import { isEmail, isFloat, isInt } from 'validator';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

import history from '../../services/history';

import { Link } from 'react-router-dom';

export default function Aluno({ match }) {
	// Props são as propriedades passadas para o componente pelo React
	// const { id } = props.match.params;

	const dispatch = useDispatch();
	const [foto, setFoto] = React.useState('');
	const [nome, setNome] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [sobrenome, setSobrenome] = React.useState('');
	const [idade, setIdade] = React.useState('');
	const [peso, setPeso] = React.useState('');
	const [altura, setAltura] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const id = get(match, 'params.id', '');

	React.useEffect(() => {
		if (!id) return;

		async function getData() {
			try {
				setIsLoading(true);
				const data = await axios.get(`/alunos/${id}`);
				console.log(data);
				const { nome, email, sobrenome, idade, peso, altura } =
					data.data;
				const Foto = get(data, 'data.Fotos[0].url', false);

				console.log(Foto);
				setFoto(Foto);
				setNome(nome || '');
				setEmail(email || '');
				setSobrenome(sobrenome || '');
				setIdade(idade || '');
				setPeso(peso || '');
				setAltura(altura || '');
			} catch (err) {
				const errors = get(err, 'response.data.errors', []);
				errors.map((error) => toast.error(error));
				history.push('/');
			} finally {
				setIsLoading(false);
			}
		}

		getData();
	}, [id]);

	async function handleSubmit(e) {
		e.preventDefault();

		const formErros = [];

		if (nome.length < 3 || nome.length > 255) {
			formErros.push('Nome precisa ter entre 3 e 255 caracteres');
		}
		if (sobrenome.length < 3 || sobrenome.length > 255) {
			formErros.push('Sobrenome precisa ter entre 3 e 255 caracteres');
		}
		if (!isEmail(email)) {
			formErros.push('Email inválido');
		}
		if (!isInt(String(idade))) {
			formErros.push('Idade precisa ser um inteiro');
		}
		if (!isFloat(String(peso))) {
			formErros.push('Peso precisa ser um número real');
		}
		if (!isFloat(String(altura))) {
			formErros.push('Altura precisa ser um número real');
		}

		if (formErros.length > 0) {
			formErros.map((erro) => toast.error(erro));
			return;
		}

		try {
			setIsLoading(true);
			if (id) {
				await axios.put(`/alunos/${id}`, {
					nome,
					email,
					sobrenome,
					idade,
					peso,
					altura,
				});

				toast.success('Aluno(a) atualizado(a) com sucesso');
			} else {
				await axios.post(`/alunos`, {
					nome,
					email,
					sobrenome,
					idade,
					peso,
					altura,
				});
				toast.success('Aluno(a) criado(a) com sucesso');
			}
			setIsLoading(false);
		} catch (err) {
			const status = get(err, 'response.status', 0);
			const errors = get(err, 'response.data.errors', []);

			if (errors.length > 0) {
				errors.map((error) => toast.error(error));
			} else {
				toast.error('Ocorreu um erro desconhecido ao salvar o aluno');
			}

			// Unauthorized
			if (status === 401) {
				dispatch(actions.loginFailure());
			}
		}
	}
	return (
		<>
			<Loading isLoading={isLoading} />
			<Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Title>
			{id && (
				<ProfilePicture>
					{foto ? (
						<img src={foto} alt={nome} />
					) : (
						<FaUserCircle size={180} />
					)}

					<Link to={`/fotos/${id}`}>
						<FaEdit size={24} />
					</Link>
				</ProfilePicture>
			)}
			<Form onSubmit={handleSubmit}>
				<label htmlFor="nome">
					Nome:
					<input
						type="text"
						id="nome"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
					/>
				</label>
				<label htmlFor="sobrenome">
					Sobrenome:
					<input
						type="text"
						id="sobrenome"
						value={sobrenome}
						onChange={(e) => setSobrenome(e.target.value)}
					/>
				</label>
				<label htmlFor="email">
					Email:
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label htmlFor="idade">
					Idade:
					<input
						type="number"
						id="idade"
						value={idade}
						onChange={(e) => setIdade(e.target.value)}
					/>
				</label>
				<label htmlFor="peso">
					Peso:
					<input
						type="number"
						id="peso"
						value={peso}
						onChange={(e) => setPeso(e.target.value)}
					/>
				</label>
				<label htmlFor="altura">
					Altura:
					<input
						type="number"
						id="altura"
						value={altura}
						onChange={(e) => setAltura(e.target.value)}
					/>
				</label>

				<button type="submit">Submit</button>
			</Form>
		</>
	);
}

Aluno.propTypes = {
	match: PropTypes.shape({}).isRequired,
};
