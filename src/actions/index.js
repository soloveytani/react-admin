import { AUTH } from '../constants';

export const login = token => ({
    type: AUTH,
    token: token
});