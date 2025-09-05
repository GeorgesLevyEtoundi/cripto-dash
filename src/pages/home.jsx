// components
import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';
import Spinner from '../components/Spinner';

const HomePage = ({
	coins,
	filter,
	setFilter,
	limit,
	setLimit,
	sortBy,
	setSortBy,
	loading,
	error,
}) => {
	const filteredCoins = coins
		.filter(coin => {
			return (
				coin.name.toLowerCase().includes(filter.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(filter.toLowerCase())
			);
		})
		.slice() // 🔥 Important: make a shallow copy before sorting!
		.sort((a, b) => {
			switch (sortBy) {
				case 'market_cap_desc':
					return b.market_cap - a.market_cap;
				case 'price_desc':
					return b.current_price - a.current_price;
				case 'price_asc':
					return a.current_price - b.current_price;
				case 'change_desc':
					return (
						b.price_change_percentage_24h -
						a.price_change_percentage_24h
					);
				case 'change_asc':
					return (
						a.price_change_percentage_24h -
						b.price_change_percentage_24h
					);
				default:
					return 0;
			}
		});

	return (
		<div>
			<h1>Crypto Dash</h1>
			{loading && <Spinner color="white" />}

			{error && <div className="error"> {error} </div>}

			<div className="top-controls">
				<FilterInput
					filter={filter}
					setFilter={setFilter}
				/>
				<SortSelector
					sortBy={sortBy}
					setSortBy={setSortBy}
				/>
				<LimitSelector
					limit={limit}
					setLimit={setLimit}
				/>
			</div>

			{!loading && !error && (
				<div>
					<main className="grid">
						{filteredCoins.length > 0 ? (
							filteredCoins.map(coin => (
								<CoinCard
									key={coin.id}
									coin={coin}
								/>
							))
						) : (
							<p>No matching coins</p>
						)}
					</main>
				</div>
			)}
		</div>
	);
};

export default HomePage;
