import React, { useEffect, useRef, useState } from "react";
import "./index.css";

import logo from "../../img/shopping.svg";
import menu from "../../img/Hamburger_icon.svg";
import title from "../../img/2_objects.png";
import mobileTitle from "../../img/Logo.svg";

const Header = (props) => {

    const colorClasses = ["whiteSelect", "sandSelect", "redSelect", "peachSelect", "graySelect",
        "darkSelect", "coffeeSelect", "mixedSelect", "indoorSelect", "graySelect"];

    const [showOrderScreen, setShowOrderScreen] = useState(false);
    const [errorArray, setErrorArray] = useState({flags: [false, false, false], msg: ["0", "0", "0"]});

    const toggleOrderScreen = () => {

        props.toggleNavBar();

        if (showOrderScreen === true) 
        {
            setShowOrderScreen(false);
            document.body.style.overflow = "unset";
        }
        else 
        {
            setShowOrderScreen(true);
            document.body.style.overflow = "hidden";
        }
    }

    let checkoutRef = useRef();
    let mobileMenu = useRef();

    const updateName = (event) => {
        props.updateName(event.target.value);
    }

    const updatePhone = (event) => {
        props.updatePhone(event.target.value);
    }

    const updateDate = (event) => {
        props.updateDate(event.target.value);
    }

    // Client-side validation for form
    const checkValues = () => {

        var userData = props.getUserData();
        var currErrorArray = [false, false, false];
        var currMsgArray = ["0", "0", "0"];

        if (userData[0] === "")
        {
            currErrorArray[0] = true;
            currMsgArray[0] = "A name is required!";
        }

        const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

        if (userData[1] === "")
        {
            currErrorArray[1] = true;
            currMsgArray[1] = "A phone number is required!"
        }
        else if (!phoneRegex.test(userData[1])) 
        {
            currErrorArray[1] = true;
            currMsgArray[1] = "Please enter a valid phone number!!"
        }

        if (userData[2] !== "")
        {
            var date = new Date().getTime();
            var selectedDate = new Date(userData[2]);

            if (date > selectedDate.getTime())
            {
                currErrorArray[2] = true;
                currMsgArray[2] = "Preferred date has already passed!"; 
            }
        }

        if (currErrorArray.every((val) => val === false))
        {
            props.submitOrder();
            setErrorArray({flags: [false, false, false], msg: ["0", "0", "0"]});
            toggleOrderScreen();
            props.resetAll();
        }
        else 
        {
            setErrorArray({flags: currErrorArray, msg: currMsgArray});
        }
    }

    // Handle closing of ordering screen
    useEffect(() => {
        let handler = (e) => {
            if(checkoutRef.current && !checkoutRef.current.contains(e.target) ) {
                setErrorArray({flags: [false, false, false], msg: ["0", "0", "0"]});
                toggleOrderScreen();
            }
        };
    
        document.addEventListener("mousedown", handler);
    
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    })

    useEffect(() => {
        let handler = (e) => {
            if(mobileMenu.current && !mobileMenu.current.contains(e.target) ) {
                props.closeMobileNavBar();
            }
        };
    
        document.addEventListener("mousedown", handler);
    
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    })


    // Update order quantity
    const updateQty = (event, type, val) => {
    
        const positiveRegex = /^\d+$/;

        if(positiveRegex.test(event.target.value))
        {
            var number = Number(event.target.value);

            if (number <= props.stock[type])
                props.updateQuantity(type, number);
            else 
                props.updateQuantity(type, props.stock[type]);

        }
    } 

    // Return items bought in table
    const itemsBought = () => {

        return props.quantity.map((val, i) => {

            if (val !== 0 )
            {
                return (
                    
                <tr key={i} className={"brickRow " + colorClasses[i]}>
                    <td>{props.desc[i]}</td>
                    <td><input onChange={(e) => {updateQty(e, i, val)}} value={val}></input></td>
                    <td>$ {(i !== 9) ? (val * 50).toFixed(2) : (val * 2).toFixed(2)}</td>
                </tr>)
            }
        })
    }

    // Calculate estimated totals
    const calcTotals = () => {

        let sumBoxes = props.quantity.slice(0, 9).reduce((sum, v) => sum + v);
        let sqft = sumBoxes * 10.75;
        let subtotal = (sumBoxes * 52 + 2 * props.quantity[9]).toFixed(2);

        if (sumBoxes !== 0 || props.quantity[9] !== 0)
        {

            return(<tbody>
                {itemsBought()}   
                <tr>
                    <td></td>
                    <td>Sqft:</td>
                    <td>{sqft} sqft</td>
                </tr> 
                <tr>
                    <td></td>
                    <td>Subtotal:</td>
                    <td>$ {subtotal}</td>
                </tr> 
                <tr>
                    <td></td>
                    <td>Tax (13%):</td>
                    <td>$ {(subtotal * 0.13).toFixed(2)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Total:</td>
                    <td>$ {(subtotal * 1.13).toFixed(2)}</td>
                </tr>
            </tbody>)
        }
    }

    return (   
        <>
            {showOrderScreen && 
            <div id="orderScreen">
                <div ref={checkoutRef} id="orderContainer">
                    <h1>Get a Quote!</h1>
                    <div id="orderLayout">
                        <div id="quantitySection">

                            <table>
                                <thead>
                                    <tr>
                                        <th>Color</th>
                                        <th>Quantity</th>
                                        <th>Cost</th>
                                    </tr>
                                </thead>
                                {calcTotals()}
                            </table>
                        </div>

                        <div id="infoSection">
                    
                            <div className="formCell">
                                {errorArray.flags[0] && <a></a>}
                                <label>Name:</label>
                                <input onChange={updateName} id="userName"/>
                                <p>{errorArray.msg[0]}</p>
                            </div>

                            <div className="formCell">
                                {errorArray.flags[1] && <a></a>}
                                <label>Phone Number:</label>
                                <input onChange={updatePhone} id="userNumber"/>
                                <p>{errorArray.msg[1]}</p>
                            </div>
                            
                            <div className="formCell">
                                {errorArray.flags[2] && <a></a>}
                                <label>Preferred Meeting Date:</label>
                                <input onChange={updateDate} type="datetime-local" id="userDate"/>
                                <p>{errorArray.msg[2]}</p>
                            </div>
                       
                            <button id="quoteSubmit" onClick={checkValues}>
                                Submit
                            </button>

                        </div>
                    </div>
                </div>
                <p>X</p>
            </div>}

            <header>


                <nav id="nav-wrap" style={{display: props.showNav}}>
                    <p>3Y Brick Veneer</p>

                    <ul ref={mobileMenu} id="nav" style={{display: props.showMobile}}>
                        <li><a tabIndex={0} href="#home">Home</a></li>
                        <li><a tabIndex={0} href="#intro">About</a></li>
                        <li><a tabIndex={0} href="#price">Pricing</a></li>
                        <li><a tabIndex={0} href="#gallery">Gallery</a></li>
                        <li><a tabIndex={0} href="#contact">Contact Us</a></li>
                    </ul>
                    
                    <img onClick={() => props.toggleMobileNavBar()} className="navIcon" id="hamburgerIcon" src={menu} alt="shopping cart"/>
                    <img tabIndex={"0"} onClick={toggleOrderScreen} className="navIcon" id="shoppingCart" src={logo} alt="shopping cart"/>
                </nav>

            </header>    

            <div id="home">
                <img id="desktop" src={title} alt="Title Page"/>
                <img id="mobile" src={mobileTitle} alt="Title Page"/>
            </div>
        </>
    )
};

export default Header