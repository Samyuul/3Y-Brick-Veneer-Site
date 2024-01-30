import React, { useState, useEffect, useRef } from "react";
import "./index.css"

const Lightbox = (props) => {

    const colorClasses = ["whiteSelect", "sandSelect", "redSelect", "peachSelect", "graySelect",
        "darkSelect", "coffeeSelect", "mixedSelect", "indoorSelect", "graySelect"];

    const [imageNum, setImageNum] = useState(0);

    // Modulo operation that works with negative values
    const modulo = (a, n) => {
        return ((a % n) + n) % n;
    } 

    const incrementImage = (n) => {
        setImageNum(modulo(imageNum + n, 3));
    } 

    const incrementQuantity = (n) => {
        props.setter(props.type, (props.getQuantity(props.type) + n) < 0 ? 0 : 
            ((props.getQuantity(props.type) + n) > props.stock ? props.stock : props.getQuantity(props.type) + n));
    }

    const inputQuantity = (event) => {

        const positiveRegex = /^\d+$/;

        if(positiveRegex.test(event.target.value))
        {
            var number = Number(event.target.value);

            if (number <= props.stock)
                props.setter(props.type, number);
            else 
                props.setter(props.type, props.stock);

        }
    }

    const returnThumbnail = (gallery, type) => {
        return require(`./../../img/thumbnail/${gallery}/${type}.webp`);
    }

    const getThumbnails = () => {

        return (
            <div className="thumbnailControls">
                <img onClick={() => setImageNum(0)} className="thumbnail" src={returnThumbnail(1, props.type)} alt="Single Brick"></img>
                <img onClick={() => setImageNum(1)} className="thumbnail" src={returnThumbnail(2, props.type)} alt="Side of Bricks"></img>
                <img onClick={() => setImageNum(2)} className="thumbnail" src={returnThumbnail(3, props.type)} alt="Brick wall layout"></img>
            </div>
        )
    } 

    const colorSelector = () => {

        return (
            [...Array(10).keys()].map((val, i) => {
                return (<button key={i} className={"colorButton " + colorClasses[i]} onClick={() => props.openModal(i)}></button>)
            })
        )
    }

    let modalRef = useRef();

    // Handle closing of lightbox
    useEffect(() => {
        let handler = (e) => {
            if(modalRef.current && !modalRef.current.contains(e.target) ) {
                props.closeModal();
            }
        };
    
        document.addEventListener("mousedown", handler);
    
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    })

    return (
        <div className="modal">
            <div ref={modalRef} className="modalContent">
                
                <div className="stockCounter">{props.stock} <p>Left</p></div>2

                {/* Main Image Display */}
                <div className="mySlides">
                    <div className="numberText">{imageNum + 1}{"/3"}</div>
                    <img className="lightboxImg" src={props.getImage(imageNum + 1, props.type)} alt="Current brick"></img>
                </div>

                <div className="info">
                    <button onClick={() => incrementQuantity(-1)} className="incrementButton">-</button>
                    <input type="number" id="displayCounter" onChange={inputQuantity} value={props.getQuantity(props.type)} ></input>
                    <button onClick={() => incrementQuantity(1)} className="incrementButton">+</button>
                    <div id="modalCaption"> {props.desc} {props.type !== 9 ? "-" : ""} {props.type !== 9 ? (props.getQuantity(props.type) * 10.75).toFixed(2) : ""} {" "}
                        {props.type !== 9 ? "Sqft" : ""} </div>
                </div>

                {/* Thumbnail Controls */}
                {getThumbnails()}

                {/* Photo Arrow Controls */}
                <div className="prev" onClick={() => incrementImage(-1)}>&#10094;</div>
                <div className="next" onClick={() => incrementImage(1)}>&#10095;</div>

                {/* Brick Color Select */}
                <div className="brickSelect"> 
                    {colorSelector()}
                </div>
            </div> 
        </div>
    )
};

export default Lightbox
