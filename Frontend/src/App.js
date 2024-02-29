import React, {useEffect, useState} from "react";

import OrderDataService from "./services/OrderServices"
import StockDataService from "./services/StockServices";

import GetOrder from "./components/order/GetOrder";
import Header from "./components/header/Header";
import Intro from "./components/intro/Intro";
import Pricing from "./components/pricing/Pricing";
import Location from "./components/location/Location";

function App() {

	var num_boxes = 0;
    var numSqft = 0;
    var totalCost = 0;
    var test_order = {};

    const desc = [
        "White",
        "Sand",
        "Red",
        "Peach",
        "Gray",
        "Dark Brown",
        "Coffee",
        "Mixed Brown",
        "Mixed Indoor",
        "Corners"
    ];

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
	const [date, setDate] = useState("");

	const [showNav, setShowNav] = useState("block");
	const [showMobile, setShowMobile] = useState("none");

    //const [quantity, setQuantity] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	const [quantity, setQuantity] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

	const [stock, setStock] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const [currLightboxSelect, setCurrLightboxSelect] = useState(-1);

	const getQuantity = (type) => {
        return quantity[type];
    }

	const updateName = (name) => {
        setName(name);
    } 

    const updatePhone = (phone) => {
		setPhone(phone);
    } 

	const updateDate = (date) => {
		setDate(date);
	}

	const getUserData = () => {
		return [name, phone, date];
	}

    const updateQuantity = (index, currQuantityVal) => {

        const newQuantity = quantity.map((val, i) => {
            if (i === index) {
                return currQuantityVal;
            } else {
                return val;
            }
        })

        setQuantity(newQuantity);
    }

	const toggleNavBar = () => {
		if (showNav === "block") 
			setShowNav("none");
		else
			setShowNav("block");
	} 

	const toggleMobileNavBar = () => {
		if (showMobile === "block") 
			setShowMobile("none");
		else
			setShowMobile("block");
	} 

	const closeMobileNavBar = () => {
		if (showMobile !== "none")
			setShowMobile("none");
	}

	const resetAll = () => {
		setName("");
		setPhone("");
		setQuantity([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	}

	// Send user's order to database
	const saveOrder = () => {

		num_boxes = quantity.reduce((a, b) => a + b, 0);
		numSqft = num_boxes * 10.75;
		totalCost = (num_boxes * 50 * 1.13).toFixed(2);

		test_order = {
			name: name, 
			phone: phone, 
			quantity: quantity,
			sqft: numSqft,
			cost: totalCost
		};

		OrderDataService.create(test_order)
		.then(response => {
			resetAll();
		})
		.catch(e => {
			console.log(e.message);
		}); // Error

	} // saveOrder


	// Onload to get stock
	useEffect(() => {

		StockDataService.getStock(1)
		.then(response => {
			var result = response.data;
			var currStock = [result.white, result.sand, result.red, result.peach, result.gray,
				result.darkBrown, result.coffee, result.mixedBrown, result.mixedIndoor,
				result.corner];
			setStock(currStock);
		})
		.catch(e => {
			console.log(e.message);
		})

	}, []);

	return (
		<div className="App">      
			<div className="container mt-3">
				{<Header 
					showNav={showNav} 
					toggleNavBar={toggleNavBar}
					showMobile={showMobile}
					toggleMobileNavBar={toggleMobileNavBar}
					closeMobileNavBar={closeMobileNavBar}
					updateName={updateName}
					updatePhone={updatePhone}
					updateDate={updateDate}
					updateQuantity={updateQuantity}
					submitOrder={saveOrder}
					getUserData={getUserData}
					quantity={quantity}
					resetAll={resetAll}
					stock={stock}
					desc={desc}
				/>}
				{<Intro/>}
				{<Pricing/>}
				{<GetOrder 
					desc={desc} 
					quantity={quantity} 
					stock={stock}
					setCurrLightboxSelect={setCurrLightboxSelect} 
					currLightboxSelect={currLightboxSelect} 
					getQuantity={getQuantity} 
					updateQuantity={updateQuantity}
					toggleNavBar={toggleNavBar}
					setNavBar={setShowNav}
				/>}
				{<Location/>}
			</div>
			
		</div>
	);
}

export default App;
