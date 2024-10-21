import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Search from "./components/search/Search";
import AddProducts from "./components/addproducts/AddProducts";
import CardBody from "./components/cards/CardBody";
import Button from "./components/button/Button";
import Cupon from "./components/Cupones/Cupon";
import Footer from "./components/footer/Footer";
import "./App.css";

const App = () => {
	const [items, setItem] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [descValue, setDescValue] = useState("");
	const [addedItems, setAddedItem] = useState([]);
	const [showAddProducts, setShowAddProducts] = useState(false);
	const [descuentoActivo, setDescuentoActivo] = useState(false);

	useEffect(() => {
		fetch("https://fakestoreapi.com/products/")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const limitedProducts = data.slice(0, 15);
				setItem(limitedProducts);
			});
	}, []);

	function changingSrarchData(e) {
		setSearchValue(e.target.value);
	}

	const itmesFilter = items.filter((item) =>
		item.title.toLowerCase().includes(searchValue.toLowerCase())
	);

	function addItem(item) {
		item.addNumber = 1;
		setAddedItem([...addedItems, item]);
	}

	function removeItem(item) {
		const newItems = addedItems.filter(
			(addedItem) => addedItem.id !== item.id
		);
		setAddedItem(newItems);
	}

	function changingCuponData(e) {
		setDescValue(e.target.value);

		if (e.target.value === "1234") {
			setDescuentoActivo(true);
		} else {
			setDescuentoActivo(false);
		}
	}

	return (
		<div>
			<div className="body__container">
				<div className="nav">
					<Header />
					<div>
						<div className="nav-right">
							<Cupon
								value={descValue}
								onChangeData={changingCuponData}
							/>
							<Search
								value={searchValue}
								onChangeData={changingSrarchData}
							/>
							<Button
								num={addedItems.length}
								click={setShowAddProducts}
							/>
						</div>
					</div>
				</div>

				{showAddProducts && (
					<AddProducts
						click={setShowAddProducts}
						items={addedItems}
						removeItem={removeItem}
						setAddedItem={setAddedItem}
					/>
				)}

				<CardBody
					products={itmesFilter}
					addItem={addItem}
					removeItem={removeItem}
					addedItems={addedItems}
					descuentoActivo={descuentoActivo}
				/>

				<div className="_footer_">
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default App;
