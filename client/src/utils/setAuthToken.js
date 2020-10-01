import axios from 'axios'

const setAuthToken = (token) => { // Token is stored in local storage, we just made it a global var here.
    if (token)
        axios.defaults.headers.common['x-auth-token'] = token;
    else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;