export default (state = {}, action) => {
    switch (action.type) {
      case 'GET_CARS':
        return {
          cars: action.data
        };
      case 'POST_CAR':
        return {
          cars: state.cars.concat(action.data)
        };
      case "PATCH_CAR":
        let currentCarsToUpdate = state.cars;
        const newCarsToUpdate = currentCarsToUpdate
        .map((car) => {
            if(car._id === action.data._id){
              return action.data;
            } 
            return car;
          });
        return {
          cars: newCarsToUpdate
        };
      case "DELETE_CAR":
       let currentCarsToDelete = state.cars;
       const newCarsToDelete = currentCarsToDelete
        .filter((car) => car._id !== action.data._id);
        return {
          cars: newCarsToDelete
        }
      default:
        return state;
    }
  };

  