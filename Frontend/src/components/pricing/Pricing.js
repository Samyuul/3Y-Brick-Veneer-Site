import React from "react";
import "./index.css"

const Pricing = () => {

    return (
        <div id="price">
            <div id="desc">
                <h1>Pricing</h1>
                <p>
                    The dimensions for a flat piece of brick veneer is 240mm * 60 * 12mm(10 1/4" x 2 3/8" x1/2"), and the price of a single flat piece is $1. 
                    Boxes consists of 58 pieces and cover approximately 10.75 sqft, which correspond to around 5.5 pieces per sqft. 
                </p>
                <p>
                    Corner pieces are sold separately and are $2 per corner piece. These only come in the dark gray variation or the indoor variation.

                </p>
            </div>
            <img src={require("./../../img/gallery3/10.webp")} alt="Indoor Corners"/>
        </div>
    )

};

export default Pricing