import axios from "axios";

let refresh = false

axios.interceptors.response.use(resp => resp, async err => {
     if(err.response.status === 401 && !refresh){
          refresh = true
          const response = await axios.post("http://localhost:8000/v1/auth/refresh", {})

          if(response.status === 200){
               axios.defaults.headers.common['Authorization'] = `Bearer ${response['token']}`;

               return axios(err.config)
          }
     }
     refresh = false
     return err
})