import React from 'react';
import axios from '../../services/axios';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import {
	FaUserCircle,
	FaEdit,
	FaWindowClose,
	FaExclamation,
} from 'react-icons/fa';

import Loading from '../../components/Loading';

import { AlunosContainer, ProfilePicture, NovoAluno } from './styled';

import { toast } from 'react-toastify';

export default function Alunos() {
	const [alunos, setAlunos] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		// Antes de mandar pro axios eu falo q ta carregando
		async function getData() {
			setIsLoading(true);
			const response = await axios.get('/alunos');
			setAlunos(response.data);
			setIsLoading(false);
		}

		getData();
	}, []);

	const handleDeleteAsk = (e) => {
		e.preventDefault();
		// e.target seria o caminho do icone svg
		// e.currentTarget seria o caminho do link
		// e.currentTarget.nextSibling seria o botão de exclamação

		const exclamation = e.currentTarget.nextSibling;

		e.currentTarget.remove();
		exclamation.setAttribute('display', 'block');
	};

	const handleDelete = async (e, id, index) => {
		// Ele pede isso
		e.persist();
		try {
			setIsLoading(true);
			await axios.delete(`/alunos/${id}`);
			const novosAlunos = [...alunos];
			novosAlunos.splice(index, 1);
			setAlunos(novosAlunos);
			setIsLoading(false);
		} catch (e) {
			const status = get(e, 'response.status', 0);

			if (status === 401) {
				toast.error('Você precisa fazer login novamente');
			} else {
				toast.error('Ocorreu um erro ao excluir o aluno');
			}

			setIsLoading(false);
		}
	};

	return (
		<>
			<Loading isLoading={isLoading} />
			<h1>Alunos</h1>

			<NovoAluno to="/aluno/">Novo aluno</NovoAluno>

			<AlunosContainer>
				{alunos.map((aluno, index) => (
					<div key={String(aluno.id)}>
						<ProfilePicture>
							{get(aluno, 'Fotos[0].url', false) ? (
								<img
									src={aluno.Fotos[0].url}
									alt={aluno.Fotos[0].name}
								/>
							) : (
								<FaUserCircle size={36} />
							)}
						</ProfilePicture>

						<span>{aluno.nome}</span>
						<span>{aluno.email}</span>

						<Link to={`/aluno/${aluno.id}/edit`}>
							<FaEdit size={16} />
						</Link>
						<Link
							onClick={handleDeleteAsk}
							to={`/aluno/${aluno.id}/delete`}
						>
							<FaWindowClose size={16} />
						</Link>
						<FaExclamation
							size={16}
							display="none"
							cursor="pointer"
							onClick={(e) => handleDelete(e, aluno.id, index)}
						/>
					</div>
				))}
			</AlunosContainer>
		</>
	);
}
