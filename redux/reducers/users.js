const initializeState = {
    currentUser: null
}

export const user = (state = initializeState, action) = {
    return {
        ...state,
        currentUser: action.currentUser
    }
}