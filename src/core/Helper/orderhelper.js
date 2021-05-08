import {API} from "../../Backend"

const createOrder = (userId,token,orderDetails) =>{
    const formData = new FormData()

    for(const name in orderDetails){
        formData.append(name,orderDetails[name])
    }
    return fetch(`${API}/order/add/${userId}/${token}/`,{
        method : "POST",
        data : formData
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export default createOrder;