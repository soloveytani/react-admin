import { AUTH } from '../constants';

const auth = (state = { token: null }, action) => {
    switch (action.type) {
        case AUTH: 
            return { token: action.token }
        default: return state
    }
}

export default auth;