import Uid from '../helpers/Uid';

export default (state = [], action) =>
{
    switch (action.type) {
        case 'ADDAPP':
            const addState = [
                ...state, {
                    id: action.id,
                    name: action.name,
                    title: action.title,
                    cost: action.cost,
                    icon: action.icon,
                    active: false,
                    viewingApp: false
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
                    title: action.title,
                    cost: action.cost,
                    icon: action.icon,
                    active: false,
                    viewingApp: true
                }
            ];
            localStorage.setItem('howmuch', JSON.stringify(updatedApps));
            return updatedApps;
            break;
        case 'EDTIAPP':
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
                    title: action.title,
                    cost: action.cost,
                    icon: action.icon,
                    active: true,
                    viewingApp: true
                }
            ];
            localStorage.setItem('howmuch', JSON.stringify(editApp));
            return editApp;
            break;
        case 'VIEWAPP':
            if(typeof(action.id)){
                action.id = Uid();
            }

            const removalAppUpdate = state.filter(
                function (obj)
                {
                    return obj.id !== action.id;
                }
            );

            let viewApp = [
                ...removalAppUpdate,
                {
                    id: action.id,
                    name: action.name,
                    title: action.title,
                    cost: action.cost,
                    icon: action.icon,
                    viewingApp: true
                }
            ];

            localStorage.setItem('howmuch', JSON.stringify(viewApp));
            return viewApp;
            break;
        case 'VIEWALL':
            const allApps = state.map(function(item, index){
                if(typeof(item.active) !== 'undefined'){
                    item.active = false;
                }

                if(typeof(item.viewingApp) !== 'undefned'){
                    item.viewingApp = false;
                }

                return item;
            });
            return allApps;
            break;
        default:
            return state
    }
} 
