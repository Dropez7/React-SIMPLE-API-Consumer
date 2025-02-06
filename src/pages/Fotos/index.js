import React from 'react';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import { FaUserCircle } from 'react-icons/fa';
import axios from '../../services/axios';
import history from '../../services/history';
import { get } from 'lodash';

import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

import { toast } from 'react-toastify';

import { PropTypes } from 'prop-types';

export default function Fotos({ match }) {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = React.useState(false);
	const [foto, setFoto] = React.useState('');
	const id = get(match, 'params.id', '');

	React.useEffect(() => {
		async function getData() {
			try {
				setIsLoading(true);
				const { data } = await axios.get(`/alunos/${id}`);
				setFoto(get(data, 'Fotos[0].url', ''));
			} catch (err) {
				toast.error('Erro ao obter Imagem');
				history.push('/');
			} finally {
				setIsLoading(false);
			}
		}

		getData();
	}, [id]);

	async function handleChange(e) {
		const file = e.target.files[0];
		const fotoURL = URL.createObjectURL(file); // Cria um link temporário para a imagem

		setFoto(fotoURL);

		// Vamos ter que simular um formulario por que o multer espera um FormData
		const formData = new FormData();
		formData.append('aluno_id', id);
		formData.append('foto', file);

		try {
			setIsLoading(true);
			// formData é enviado pelo body como um form
			// {} é o header
			await axios.post('/photos/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			toast.success('Foto enviada com sucesso');
		} catch (err) {
			const status = get(err, 'response.status', 0);
			if (status === 401) {
				toast.error('Você precisa fazer login novamente');
				dispatch(actions.loginFailure());
			}
			const errors = get(err, 'response.data.errors', []);
			errors.map((error) => toast.error(error));
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<Loading isLoading={isLoading} />
			<Title>Fotos</Title>

			<Form>
				<label htmlFor="foto">
					{foto ? (
						<img src={foto} alt="Foto" />
					) : (
						<FaUserCircle size={180} color="#eee" />
					)}
					<input
						type="file"
						id="foto"
						name="foto"
						accept="image/*"
						onChange={handleChange}
					/>
				</label>
			</Form>
		</>
	);
}

Fotos.propTypes = {
	match: PropTypes.shape({}).isRequired,
};
