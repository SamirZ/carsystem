export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.token
      };
    case 'SET_TOKEN':
      return {
        token: action.token
      };
    case 'LOGOUT':
      return {
        token: ""
      };
    default:
      return state;
  }
};
