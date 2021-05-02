import React from 'react'

const ImageHelper = ({product}) => {
    const imageURL = product? product.image : "https://images.pexels.com/photos/1561011/pexels-photo-1561011.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
    return (
        <div className="round border border-success p-2">
            <img src={imageURL} 
            alt = "productIMG"
            style = {{maxHeight : '100%',maxWidth : '100%'}}
            className = "mb-3 img img-responsive"/>
        </div>
    )
}

export default ImageHelper
