import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import SearchIcon from '@mui/icons-material/Search';
import { Icon } from '@mui/material';
import CategoryCheckbox from './CategoryCheckbox';
import ItemCheckbox from './ItemCheckbox';
import ButtonUI from '../UI/ButtonUI'
import response from '../../response.json'
import { dataFilterFn } from '../../dataFilterFunction';

const grouped_data = dataFilterFn(response);

const TaxForm = () => {
	const [filteredData, setFilteredData] = useState([...grouped_data])
	const [searchTerm, setSearchTerm] = useState("")
	const [notFound, setNotFound] = useState('none');

	const handleSearch = () => {
		setSearchTerm(event.target.value)
	}
	

	useEffect(()=>{
		const searchResults = dataFilterFn(response.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ))
		!searchResults.length ? setNotFound("") : setNotFound("none")
		searchTerm ? setFilteredData([...searchResults]) : setFilteredData([...grouped_data])
	}, [searchTerm])

	return (
		<div className="container md:w-10/12 lg:w-8/12 flex flex-col items-center justify-center">
			<Formik 
				initialValues = {{ 
					Applicable_items: [],
					Applied_to: "",
					name: "",
					rate: "",
					checkedCategories: [],
				}}
	
				onSubmit = { (data, { resetForm }) => {
					data.rate = Number(data.rate) / 100;
					data.Applicable_items = data.Applicable_items.map(id => typeof(id) !== Number ? Number(id) : id )
					alert(JSON.stringify(data, null, 2))
					resetForm();
				}}
				>
				{({ values }) => (
					<Form className="w-full">
						<h1 className="text-xl md:text-2xl text-left">Add Tax</h1>

						<div className="container w-auto flex flex-row gap-3 my-4">
							<Field className="border-2 w-6/12 md:w-auto md:pr-20 pl-2 py-1 rounded" placeholder="name" type="text" required name="name" />
							<div className="w-5/12 md:w-auto p-0 m-0 flex border-2 border-gray-250 rounded">
								<Field className="focus:outline-none pl-2 w-9/12" placeholder="rate" type="text" required name="rate" />
								<Icon className="w-3/12 p-0 m-0" fontSize="small">%</Icon>
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

						<div className="flex border-2 border-gray-250 m-2 w-auto md:w-4/12 mb-4 rounded" >
							<SearchIcon className="w-3/12 mt-1" color='grey' fontSize="small" />
							<Field onChange={handleSearch} className="w-full border-0 focus:outline-none pr-10 pl-2 py-1" placeholder="Search items" type="text" name="search_term" />
						</div>

						<div className="text-base" style={{display: notFound}}>
							<p className="text-red-500"> Item Not Found!! </p>
						</div>

						{filteredData.map(group => (
							<CategoryCheckbox key={group.category} category={group.category} checkedState={values.Applied_to} className="container mt-4 gap-2 w-auto">
								{(group.items).map(item => (
									<ItemCheckbox key={item.id} Applicable_items={values.Applicable_items} checkedCategories={values.checkedCategories} itemObject={item} checkedState={values.Applied_to} name="Applicable_items" />
								))}
							</CategoryCheckbox>
						))}

						<hr className="my-5 w-100 mt-14 md:mt-28" />

						<div className="text-right my-4 font-normal" >
							<ButtonUI text={ `Apply tax to ${ 0 || values.Applicable_items.length} items(s)` } />
						</div>
					</Form>
					)} 
			</Formik>

		</div>
	)
}

export default TaxForm;
