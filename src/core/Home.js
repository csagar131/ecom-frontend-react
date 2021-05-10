import React,{useState,useEffect} from 'react'
import {getProducts} from './Helper/coreapicalls'
import Base from './Base';
import '../styles.css'
import Card from './Card';


 
export default function Home() {

    const [products,setProduct] = useState([]);
    const [error, setError] = useState(false);
    

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
        <Base className="Container-fluid" display="block" title="Exclusive Tshirt Store" description="Welcome Aliens">
           
            <div className="row" style={{padding:"0 100px"}}>
            {
                products.map((product,index) =>{
                    return( <div key={index} className="col-xs-12  mb-4 col-md-4 col-sm-12" style={{cursor:"pointer"}}>
                                <Card product={product} addToCart={true} removeFromCart={false}/>
                            </div>
                        )
                })
            }
           </div>
        </Base>
    )
}

