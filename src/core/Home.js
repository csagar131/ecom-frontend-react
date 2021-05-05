import React,{useState,useEffect} from 'react'
import {getProducts} from './Helper/coreapicalls'
import Base from './Base';
import '../styles.css'
import Card from './Card';

 
export default function Home() {

    const [products,setProduct] = useState([]);
    const [error, setError] = useState(false)

    const loadAllProducts =  () => {
         getProducts().then(
            data => {
                    setProduct(data)
            }
        ).catch(err => {
            setError(err)
            console.log(error)
        })
    }

    useEffect(() => {
        loadAllProducts()
        // eslint-disable-next-line
    },[])

    return (
        <Base className="Container-fluid" title="Home Page" description="Welcome Aliens">
           <div className="row">
            {
                products.map((product,index) =>{
                    return( <div key={index} className="col-4 mb-4">
                                <Card product={product} addToCart={true} removeFromCart={false}/>
                            </div>
                        )
                })
            }
           </div>
        </Base>
    )
}
