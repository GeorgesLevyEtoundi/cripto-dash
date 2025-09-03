import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// env variables
const COIN_API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
	const { id } = useParams();
	const [coin, setCoin] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchCoin = async () => {
			try {
				const res = await fetch(`${COIN_API_URL}/${id}`);

				if (!res.ok) throw new Error('Failed to fetch the data');

				const data = await res.json();

				setCoin(data);

				console.log('Coin data |||', data);
			} catch (err) {
				setError(err.message);
				console.log('There is an error |||', err);
			} finally {
				setLoading(false);
			}
		};

		fetchCoin();
	}, [id]);

	return <></>;
};

export default CoinDetailsPage;
