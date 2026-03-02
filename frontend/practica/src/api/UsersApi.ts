import type { ResponseCrud } from "./types"

type Response = {
    status: number;
    error?: string;
    message?: string;
}
export async function LoginApi(email: string, password: string): Promise<Response> {
    try{
        const data_user = {
            "email": email,
            "password": password
        }

        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_user)
        })

        if(response.status == 401){
            alert("Usuario no autorizado")
        }

        const data = await response.json()
        return data
    }catch(err: any){
        console.log(err)
        throw Error(err)
    }
}

export async function RegisterApi(name: string, email: string, password: string): Promise<Response> {
    try{
        const data_user = {
            "username": name,
            "email": email,
            "password": password
        }

        const response = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_user)
        })

        const data = await response.json()
        
        if(response.status == 400){
            alert(data.error)
        }
        
        return data
    }catch(err: any){
        console.log(err)
        throw Error(err)
    }
}

export async function GetUsers() {
    const response = await fetch("http://localhost:5000/api/users", {
        method: "GET"
    })

    if(response.status !== 200){
        return false
    }

    const data = await response.json()

    return data;
}

export async function UpdateUser(id: number, name: string, email: string, password: string) {
    try {
        const payload = {
            username: name,
            email: email,
            password: password
        }

        const response = await fetch(`http://localhost:5000/api/update-users/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()
        return data
    } catch (err: any) {
        console.log(err)
        throw Error(err)
    }
}

export async function DeleteUser(id: number) {
    try {
        const response = await fetch(`http://localhost:5000/api/delete-users/${id}`, {
            method: "DELETE"
        })

        const data = await response.json()
        return data
    } catch (err: any) {
        console.log(err)
        throw Error(err)
    }
}
