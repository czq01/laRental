import axios from 'axios'

const API_URL = '/user'

const register = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem(
            'user', JSON.stringify(response.data.user)
            ) 
    }

    return response.data
}

const login = async(userData) => {
    const response = await axios.post(API_URL + '/login', userData)
    
    if(response.data){
        localStorage.setItem(
            'user', JSON.stringify(response.data.user)
            ) 
    }

    return response.data
}

const logout = () =>{
    console.log("remove user from localStorage...")
    localStorage.removeItem('user')
}

const getMe = async(token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    
    const response = await axios.get(
        API_URL + "/me",
        config)

    return response.data
}

const getUserById = async(user_id) => {
    const response = await axios.get(API_URL + `/${user_id}`)
    return response.data
}

const updateUserById = async(user_id, userData, token)=>{
    const config = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    const response = await axios.put(API_URL + `/${user_id}`, userData, config)

    if(response.data){
        const new_user = response.data.data;
        new_user.token = `${token}`;
        localStorage.setItem(
            'user', JSON.stringify(new_user)
            ) 
    }

    return response.data
}
const authService = {
    register,
    logout,
    login,
    getMe,
    getUserById,
    updateUserById,
}

export default authService