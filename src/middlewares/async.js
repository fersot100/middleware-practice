//This is the signature for writing middleware 
export default function ({ dispatch }) {
    return next => action => {
        console.log(action.payload)
        //If no promise, send to the next middleware in stack 
        if (!action.payload || !action.payload.then){
            return next(action);
        }

       

        //Make sure the action's promise resolves
        action.payload
            .then(response => {
               const newAction = {...action, payload: response}
               dispatch(newAction);
            });
    }
}