import React from "react";
import Lightbox from "./Lightbox";

const GetOrder = (props) => {

    const toggleLightboxOn = (type) => {
        document.body.style.overflow = "hidden";
        props.setNavBar("none");
        props.setCurrLightboxSelect(type);
    }

    const toggleLightboxOff = () => {
        document.body.style.overflow = "unset";
        props.setNavBar("block");
        props.setCurrLightboxSelect(-1);
    } 

    const getImage = (gallery, type) => {
        return require(`./../../img/gallery${gallery}/${type}.webp`);
    } 

    const getGalleryCell = (i) => {
        return (
            <div key={i} className="galleryCell">
                <div className="stockCounter">{props.quantity[i]} <p className="gallery-text">Ord</p>
                    <div>{props.stock[i]} <p className="gallery-text">Left</p></div>
                </div>
                <div className="brickImage">
                    <img alt="Brick Gallery" onClick={() => toggleLightboxOn(i)} src={getImage(1, i)}/>
                </div>
            </div>
        )
    }

    const getGallery = () => {
        return(
            [...Array(10).keys()].map((val, i) => {
                return getGalleryCell(i);
            })
        )
    }

    return (

        <div id="gallery">
            {(props.currLightboxSelect >= 0) && 
            <Lightbox 
                desc={props.desc[props.currLightboxSelect]} 
                setter={props.updateQuantity} 
                type={props.currLightboxSelect}
                closeModal={toggleLightboxOff} 
                getQuantity={props.getQuantity} 
                openModal={toggleLightboxOn} 
                quantity={props.quantity[props.currLightboxSelect]}
                stock={props.stock[props.currLightboxSelect]}
                getImage={getImage}
            />}

            <h1>Gallery</h1>
            <p>
                If the current stock has loaded yet, please give it a minute for it to load. In the meanwhile, you
                can browse our gallery below. The value for stock are estimates given in units of boxes (10.75 sqft each).
            </p>
            <div id="flexboxGallery">
                {getGallery()}
            </div>
            
        </div>


    );
}

export default GetOrder