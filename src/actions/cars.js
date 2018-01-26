import axios from 'axios';

export function getCars(token){
    return function(dispatch){
        axios.get("/cars",{
            headers: { "x-auth": token }
        })
        .then(function(response){
            dispatch({
                type: "GET_CARS",
                data: response.data
            });
        }).catch(function(err){
            console.log(err);
            // dispatch
        });
    }
}

export function patchCar(token, _id, car){
    return function(dispatch){
        axios.patch("/cars/"+_id, car, { headers: { "x-auth": token, "Content-Type": "application/json" } })
        .then(function(response){
            dispatch({
                type: "PATCH_CAR",
                data: response.data
            });
        })
        .catch(function(err){
            console.log(err);
        });
    }
}

export function postCar(token, car){
    return function(dispatch){
        axios.post("/cars", car, { headers: { "x-auth": token, "Content-Type": "application/json" } })
        .then(function(response){
            dispatch({
                type: "POST_CAR",
                data: response.data
            });
        }).catch(function(err){
            console.log(err);
            // dispatch
        });
    }
}

export function deleteCar(token, _id){
    return function(dispatch){
        axios.delete("/cars/"+_id, { headers: { "x-auth": token, "Content-Type": "application/json" } })
        .then(function(response){
            dispatch({
                type: "DELETE_CAR",
                data: response.data
            });
        })
        .catch(function(err){
            console.log(err);
        });
    }
}

