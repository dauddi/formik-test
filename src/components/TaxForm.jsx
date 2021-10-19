import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import SearchIcon from '@mui/icons-material/Search';
import { Icon } from '@mui/material';
import Category from './Category';
import ItemCheckbox from './ItemCheckbox';
import ButtonUI from './UI/ButtonUI'
import response from '../response.json'
import { dataFilterFn } from '../dataFilterFunction';

const grouped_data = dataFilterFn(response);

const TaxForm = () => {
	const [filteredData, setFilteredData] = useState([...grouped_data])
	const [searchTerm, setSearchTerm] = useState("")

	const handleSearch = () => {
		setSearchTerm(event.currentTarget.value)
	}

	useEffect(()=>{
		const searchResults = dataFilterFn(response.filter(item => item.name === searchTerm))
		searchTerm ? setFilteredData([...searchResults]) : null
	}, [searchTerm])

	return (
		<div className="container flex flex-row justify-center align-baseline w-10/12 mx-auto text-left m-10">
			<Formik 
				initialValues = {{ 
					Applicable_items: [],
					Applied_to: "",
					name: "",
					rate: "",
					checkedCategories: [],
				}}
	
				onSubmit = {(data, {resetForm}) => {
					data.rate = Number(data.rate) / 100;
					data.Applicable_items = data.Applicable_items.map(id => typeof(id) !== Number ? Number(id) : id )
					alert(JSON.stringify(data, null, 2))
					resetForm();
				}}
				>
				{({ values }) => (
					<Form>
						<h1 className="text-2xl">Add Tax</h1>

						<div className="container w-full flex flex-row gap-3 my-4">
							<Field className="border-2 pr-20 pl-2 py-1 rounded" type="text" required name="name" />
							<div className="container h-auto flex align-baseline justify-center border-2 rounded">
								<Field className="focus:outline-none pl-2 " type="text" required name="rate" />
								<Icon className="w-auto h-auto" fontSize="small"> % </Icon>
							</div>
						</div>

						<div className="w-full">
							
							<Field color="warning" className="mr-2" type="radio" name="Applied_to" required value="all" />
							<label htmlFor="all">Apply to all items in collection</label>
						
							<div>
								<Field className="mr-2" type="radio" name="Applied_to" required value="some" />
								<label htmlFor="all">Apply to specific items</label>
							</div>
						</div>

						<hr className="my-5 w-100" />

						<div className="border-2 border-gray-250 w-7/12 mb-4 rounded" >
							<SearchIcon className="w-auto" color='grey' fontSize="small" />
							<Field onChange={handleSearch} className="border-0 focus:outline-none pr-10 pl-2 py-1" placeholder="Search items" type="text" name="search_term" />
						</div>

						{filteredData.map(group => (
							<Category key={group.category} category={group.category} checkedState={values.Applied_to} className="container mt-4 gap-2 w-full">
								{(group.items).map(item => {
									return (
									<ItemCheckbox key={item.id} Applicable_items={values.Applicable_items} checkedCategories={values.checkedCategories} itemObject={item} checkedState={values.Applied_to} name="Applicable_items" />
								)})}
							</Category>
						))}

						<hr className="my-5 w-100 mt-28" />

						<div className="text-right my-4 font-normal" >
							<ButtonUI text={ `Apply tax to ${ 0 || values.Applicable_items.length} items(s)` } />
						</div>
						
						{/* <pre>
							{JSON.stringify(values, null, 2)}
						</pre> */}

					</Form>
					)} 
			</Formik>
		</div>
	)
}

export default TaxForm;
