import { LoginApi } from "../api/UsersApi"
import { RegisterApi } from "../api/UsersApi";

export type Data = {
    username?: string;
    email: string;
    password: string;
}

export const AuthLogin = async (props: Data) => {
    const response = await LoginApi(props.email, props.password)
    

    if(response.status == 200){
        return response
    }
    return false;
} 

export const AuthRegister = async (props: Data) => {

    if(props.username){
        const response = await RegisterApi(props.username, props.email, props.password)
        
        /* usar el status code 201, ya que ese es el que devuelve el backend*/
        if(response.status == 201){
            console.log(response)
            return response
        }
        return false;
    }
} 

