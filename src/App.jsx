import { useState, useEffect } from 'react';

// components
import CoinCard from './components/CoinCard';
import LimitSelector from './components/LimitSelector';

// env variables
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [limit, setLimit] = useState(10);

	useEffect(() => {
		const fetchCoins = async () => {
			try {
				const res = await fetch(
					`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&spqrkline=false`
				);

				if (!res.ok) throw new Error('Failed to fetch data');

				const data = await res.json();

				setCoins(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCoins();
	}, [limit]);

	return (
		<div>
			{loading && <p>Loading...</p>}

			{error && <div className="error"> {error} </div>}

			<LimitSelector
				limit={limit}
				setLimit={setLimit}
			/>

			{!loading && !error && (
				<div>
					<main className="grid">
						{coins.map(coin => (
							<CoinCard
								key={coin.id}
								coin={coin}
							/>
						))}
					</main>
				</div>
			)}
		</div>
	);
};

export default App;
