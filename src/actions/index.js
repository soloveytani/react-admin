import { AUTH } from '../constants';

export const auth = token => ({
    type: AUTH,
    token: token
});