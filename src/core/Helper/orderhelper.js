import {API} from "../../Backend"

export const createOrder = async (userId,token,orderDetails) =>{
    const formData = new FormData()

    for(const name in orderDetails){
        formData.append(name,orderDetails[name])
    }
    return await fetch(`${API}/order/add/${userId}/${token}/`,{
        method : "POST",
        body : formData
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}
