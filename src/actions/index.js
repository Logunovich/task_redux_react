export const fetchUsers = (request) => (dispatch) => {
    dispatch(usersFetching());
    dispatch(fetchSwitch());
    request("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data")
        .then(data => dispatch(usersFetched(data)))
        .catch(() => dispatch(usersFetchingError()))
}

export const usersFetching = () => {
    return {
        type: 'USERS_FETCHING'
    }
}

export const usersFetched = (users) => {
    return {
        type: 'USERS_FETCHED',
        payload: users
    }
}

export const usersFetchingError = () => {
    return {
        type: 'USERS_FETCHING_ERROR'
    }
}

export const userCreate = () => {
    return {
        type: 'USER_CREATE',
    }
}

export const userCreated = (user) => {
    return {
        type: 'USER_CREATED',
        payload: user
    }
}

export const userEditNum = (user) => {
    return {
        type: 'USER_EDIT_NUM',
        payload: user
    }
}

export const clearNum = () => {
    return {
        type: 'CLEAR_NUM'
    }
}

export const userEdit = (user) => {
    return {
        type: 'USER_EDIT',
        payload: user
    }
}

export const userDelete = (user) => {
    return {
        type: 'USER_DELETE',
        payload: user
    }
}

export const fetchSwitch = () => {
    return {
        type: 'FETCH'
    }
}