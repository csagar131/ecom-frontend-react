const addItemToCart = (item,next) => {
    let cart = []
    if(window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.push({
            ...item,
        })
        localStorage.setItem("cart",JSON.stringify(cart))

        next()
    }
}

export default addItemToCart;

export const loadCart = () =>{
    if(window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = productId => {
    let cart = []
    if(window !== undefined){
        if(localStorage.getItem("cart")){
           cart =  JSON.parse(localStorage.getItem("cart"))
        }
        cart.filter((product) => {
            return product.id !== productId
        })
    
        localStorage.setItem("cart",JSON.stringify(cart))
    }
}

export const cartEmpty = next =>{
    if(window !== undefined){
        localStorage.removeItem("cart")
        let cart = []
        localStorage.setItem("cart",JSON.stringify(cart))
        next()
    }
}