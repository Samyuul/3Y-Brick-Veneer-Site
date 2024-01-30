import React, { useState } from 'react';
import "./index.css"

const Intro = () => {

    const [slide, setSlide] = useState(0);

    // Modulo operation that works with negative values
    const modulo = (a, n) => {
        return ((a % n) + n) % n;
    } 

    const getImage = () => {
        return require(`./../../img/gallery4/${slide}.webp`);
    }

    const incrementImage = (n) => {
        console.log("success");
        setSlide(modulo(slide + n, 5));
    } 

    return (
        <div id='intro'>

            <div id='demoGallery'>
                <div className="leftGallery galleryArrow" onClick={() => incrementImage(-1)}>&#10094;</div>
                <img id='galleryImg' src={getImage()} alt='Brick Demo'/>
                <div className="rightGallery galleryArrow" onClick={() => incrementImage(1)}>&#10095;</div>
            </div>

            <div id='introDesc'>
                <h1>About Us</h1>

                <p>
                    We are a small family business selling brick veneer. The design of brick veneer are based on a patent that we have. 
                    You can view the bricks in the gallery below and clicking on them will bring up a menu.
                </p>

                <p>
                    If you are interested, you can use the checkout buttom in the top right to get an estimate of the price and send
                    your contact information to us and we will call back when we are free. Otherwise, you can contact us directly at 289-707-1211.
                </p>

                <p>
                    You can set up an appointment to come in and see our wares. We will directly text you the address once we have decided
                    a time.
                </p>
            </div>

        </div>
    )


}

export default Intro