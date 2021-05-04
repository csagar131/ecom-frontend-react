export const addItemToCart = (item,next) => {
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


export const loadCart = () =>{
    if(window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = productName => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
           cart =  JSON.parse(localStorage.getItem("cart"))
        }
        cart = cart.filter(product => product.name !== productName)
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