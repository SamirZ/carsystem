import axios from 'axios';

export const startLogin = (user) =>{
    return function(dispatch){
        console.log(user);
        axios.post("/users/login", user)
            .then(function(response){
                console.log(response);
                dispatch({
                    type: "LOGIN",
                    token: response.headers["x-auth"]
                });
                localStorage.setItem("token", response.headers["x-auth"]);
            }).catch(function(err){
                console.log(err);
                // dispatch({type: "LOGIN_REJECTED", payload:err})
            });
    }
}

export const startRegister = (user) =>{
    return function(dispatch){
        axios.post("/users", user)
            .then(function(response){
                dispatch({
                    type: "REGISTER",
                    token: response.headers["x-auth"]
                });
                localStorage.setItem("token", response.headers["x-auth"]);
            }).catch(function(err){
                console.log(err);
                // dispatch({type: "LOGIN_REJECTED", payload:err})
            });
    }
}

export const setToken = (token) =>{
    return function(dispatch){
        dispatch({
            type: "SET_TOKEN",
            token: token
        });
    }
}

export function getUserData(token){
    return function(dispatch){
        axios.get("/users/me",{
            headers: { "x-auth": token }
        })
            .then(function(response){
                console.log(response);
                // dispatch
            }).catch(function(err){
                console.log(err);
                // dispatch
            });
    }
}

export function startLogout(token){
    return function(dispatch){
        axios.delete("/users/me/token",{
            headers: { "x-auth": token }
        })
            .then(function(response){
                dispatch({
                    type: "LOGOUT"
                });
            }).catch(function(err){
                console.log(err);
                // dispatch
            });
    }
}