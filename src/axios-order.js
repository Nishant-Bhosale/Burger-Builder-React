import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-eb89e-default-rtdb.firebaseio.com/'
})

export default instance;