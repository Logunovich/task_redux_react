const initialState = {
    users: [],
    usersLoadingStatus: 'idle',
    lastId: 10,
    userCreate: false,
    curEditUserId: '',
    fetched: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_FETCHING':
            return {
                ...state,
                usersLoadingStatus: 'loading'
            }
        case 'USERS_FETCHED':
            return {
                ...state,
                users: action.payload,
                usersLoadingStatus: 'idle'
            }
        case 'USERS_FETCHING_ERROR':
            return {
                ...state,
                usersLoadingStatus: 'error'
            }
        case 'USER_CREATE': 
            return {
                ...state,
                userCreate: !state.userCreate
            }
        case 'USER_CREATED':
            let newUserList = [...state.users, action.payload]
            return {
                ...state,
                users: newUserList,
                lastId: action.payload.id
            }
        case 'USER_EDIT_NUM':
            const index = state.users.findIndex(user => user.id === action.payload);
            const idEd = state.users[index].id 
            return {
                ...state,
                curEditUserId: idEd 
            }
        case 'CLEAR_NUM':
            return {
                ...state,
                curEditUserId: 0
            }
        case 'USER_EDIT':
            const indexForEdit = state.users.findIndex(user => user.id === action.payload.id);
            const newUserListEdit = [...state.users.slice(0, indexForEdit), action.payload, ...state.users.slice(indexForEdit+1)]
            return {
                ...state,
                users: newUserListEdit
            }
        case 'USER_DELETE': 
            const newUserListDel = state.users.filter(item => item.id !== action.payload);
            return {
                ...state,
                users: newUserListDel
            }
        case 'FETCH':
            return {
                ...state,
                fetched: true
            }
        default: return state
    }
}

export default reducer;