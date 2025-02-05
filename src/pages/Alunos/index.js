import React from 'react';
import axios from '../../services/axios';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import Loading from '../../components/Loading';

import { AlunosContainer, ProfilePicture } from './styled';

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

	return (
		<>
			<Loading isLoading={isLoading} />
			<h1>Alunos</h1>
			<AlunosContainer>
				{alunos.map((aluno) => (
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
						<Link to={`/aluno/${aluno.id}/delete`}>
							<FaWindowClose size={16} />
						</Link>
					</div>
				))}
			</AlunosContainer>
		</>
	);
}
