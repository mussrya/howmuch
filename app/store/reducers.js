import Uid from '../helpers/Uid';

export default (state = [], action) =>
{
    switch (action.type) {
        case 'ADDAPP':
            const addState = [
                ...state, {
                    id: action.id,
                    name: action.name,
                    title: action.name,
                    cost: action.cost,
                    icon: action.icon,
                    active: false
                }
            ];
            localStorage.setItem('howmuch', JSON.stringify(addState));
            return addState;
        case 'REMOVEAPP':
            const removedState = state.filter(
                function (obj)
                {
                    return obj.id !== action.id;
                }
            );
            localStorage.setItem('howmuch', JSON.stringify(removedState));
            return removedState;
        case 'UPDATEAPP':
            let updatedApps = state.filter(
                function (obj)
                {
                    return obj.id !== action.id;
                }
            );
            updatedApps = [
                ...updatedApps, {
                    id: action.id,
                    name: action.name,
                    title: action.name,
                    cost: action.cost,
                    icon: action.icon,
                    active: false
                }
            ];
            localStorage.setItem('howmuch', JSON.stringify(updatedApps));
            return updatedApps;
            break;
        case 'EDTIAPP':

            let editingApp = state.filter(
                function (obj)
                {
                    return obj.id === action.id;
                }
            );

            if(typeof(action.id)){
                action.id = Uid();
            }

            const removeAppForUpdate = state.filter(
                function (obj)
                {
                    return obj.id !== action.id;
                }
            );

            let editApp = [
                ...removeAppForUpdate,
                {
                    id: action.id,
                    name: action.name,
                    title: action.name,
                    cost: action.cost,
                    icon: action.icon,
                    active: true
                }
            ];
            localStorage.setItem('howmuch', JSON.stringify(editApp));
            return editApp;
            break;
        default:
            return state
    }
} 
