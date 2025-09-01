import { useState, useEffect } from 'react';

// components
import CoinCard from './components/CoinCard';

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
					`${API_URL}&order=market_cap_desc&per_page=10&page=1&spqrkline=false`
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
	}, []);

	return (
		<div>
			{loading && <p>Loading...</p>}

			{error && <div className="error"> {error} </div>}

			<div className="controls">
				<label htmlFor="limit">Show:</label>
				<select
					id="limit"
					value={limit}
					onChange={e => setLimit(Number(e.target.value))}
				>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>

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
