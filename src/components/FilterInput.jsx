const FilterInput = ({ filter, setFilter }) => {
	return (
		<div className="filter">
			<input
				type="text"
				value={filter}
				placeholder="Filter coins by name or symbol"
				onChange={e => setFilter(e.target.value)}
			/>
		</div>
	);
};

export default FilterInput;
