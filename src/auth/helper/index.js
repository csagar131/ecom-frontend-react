import {API} from '../../Backend'
import {cartEmpty} from '../../core/Helper/carthelper'

export const signup = async (user) => {
    return await fetch(`${API}/user/`,
    {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(err =>  console.log(err))
}


export const signin = async user => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name,user[name])
    }

    return await fetch(`${API}/user/login/`,{
        method : "POST",
        body : formData,
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const authenticate = (data,next) =>{
    if(window !== undefined){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if(window === undefined){
        return false
    }
    if(localStorage.getItem("jwt")){

        return JSON.parse(localStorage.getItem("jwt"))
        //TODO: compare jwt with database token
    }
    else{
        return false
    }
}


export const signout = async  next => {
    const userId = isAuthenticated() && isAuthenticated().user.id
    if(window !== undefined){
        cartEmpty(()=>{})
        //next()

        return await fetch(`${API}/user/logout/${userId}`,{
            method : "GET",
        })
        .then(response => {
            localStorage.removeItem("jwt")
            next()
        })
        .catch(err => console.log(err))
    }
}


