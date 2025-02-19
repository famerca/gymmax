import { redirect } from "react-router-dom";

interface clientResponse 
{
    message?: string;
    data?: Object;
    status: boolean;
}


class Client
{
    private token : string
    private baseUrl : string
    public user : boolean

    constructor ()
    {
        this.token = "";
        this.user = true;
        this.baseUrl = "http://localhost:5050";
        if (localStorage.getItem('sessionToken') !== null) {
            console.log("usando localstorage");
            this.token = localStorage.getItem('sessionToken') as string;
        } 
    }

    async login(data) : Promise<clientResponse>
    {
        const res = await fetch(`${this.baseUrl}/login`,
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                method: 'POST',
                body: JSON.stringify(data)
            }
        );

        if(res.status == 200)
        {
            const json = await res.json();
            this.token = json.token as string;
            this.user = json.user;
            localStorage.setItem("sessionToken", this.token);
            return {status: true};
        }
        if(res.status == 400)
        {
            const json = await res.json();
            return {message : json.message, status: false};
        }

        return {message : "Error Error", status: false};
    }

    get(endpoint : string) : Promise<Response>
    {
        return fetch(`${this.baseUrl}/${endpoint}`,
        {
            method: "GET",
            headers: 
            {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${this.token}`
            }
        })
    }

    post(endpoint : string, body : any) : Promise<Response>
    {
        return fetch(`${this.baseUrl}/${endpoint}`,
        {
            method: "POST",
            headers: 
            {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }

    async userRegister (data) : Promise<clientResponse>
    {
        const res = await this.post("user", data);

        if(res.status == 200)
        {
            const json = await res.json();
            return {status : true, data: json};
        }

        if(res.status == 400)
        {
            const json = await res.json();
            return {status : false, message: json.message};
        }

        return {status: false};
    }

    async deleteUser(id: number) : Promise<Boolean>
    {
        const res = await fetch(`${this.baseUrl}/user/${id}`,
        {
            method: "DELETE",
            headers: 
            {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${this.token}`
            }
        });

        if(res.status == 200)
            return true;

        return false;
    }

    async updateUser(data) : Promise<Boolean>
    {
        const res = await fetch(`${this.baseUrl}/user/${data.id}`,
        {
            method: "PUT",
            headers: 
            {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        });

        if(res.status == 200)
            return true;

        return false;
    }

    async getUser(id : number) : Promise<clientResponse>
    {
        const res = await this.get(`user/${id}`);
        if(res.status == 200)
        {
            const json = await res.json();
            if(json.length == 0)
                return {status : false};
            else
                return {status: true, data: json[0]};
        }

        return {status: false}
    }

    async getMiembros() : Promise<clientResponse>
    {
        const res = await this.get("miembros");

        if(res.status == 200)
        {
            const json = await res.json();
            return {status: true, data :  json}
        }
        if(res.status == 403)
        {
            //const json = await res.json();
            throw redirect("/");
            return {status: false}
        }

        return {status : false};
    }

    async  getMembresias() : Promise<clientResponse>
    {
        const res = await this.get("membresias");

        if(res.status == 200)
        {
            const json = await res.json();
            return {status: true, data :  json}
        }

        return {status : false};
    }

    
}

const client = new Client();

export default client;