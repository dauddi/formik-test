// data filter module
export const dataFilterFn = (response) => {
	const available_categories = [];
	let grouped_data = [];

	const data = response.map(item => ({
		name: item.name,
		id: item.id,
		category: item.category?.name || "None",
		category_id: item.category ? item.category.id : 0,
	}))

	data?.forEach(item => !(available_categories.includes(item.category)) ? available_categories.push(item.category) : null)
	
	available_categories?.forEach(category => {
		grouped_data.push({
			"category": category,
			"items": [...(data?.filter(item => item.category === category))]
		})
	})

	return [...grouped_data];
}