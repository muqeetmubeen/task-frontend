import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export function RegisterForm({ ...props }) {
    const [name,SetName] = useState("")
    const [email,SetEmail] = useState("")
    const [password,SetPassword] = useState("")
    const [response,SetResponse] = useState(null)
   
    const API_URL = import.meta.env.VITE_API_URL;
    
   const handleRegister = async(e) =>{
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/register`,{
        name,email,password
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })

      const data = res.data;
      SetResponse(data.message);
      console.log(data.message);
      
   

    } catch (error) {
      console.error("Registration Faild",error)
    }

   }
    function registerd (){
    alert('Registerd')
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Card className="flex flex-col justify-center w-md " {...props}>
      <CardHeader >
        <CardTitle className='text-center'>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} onSubmit={registerd} >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name"> Name</FieldLabel>
              <Input  value={name} onChange={(e)=>SetName(e.target.value)} id="name" type="text" placeholder="Enter your name" required/>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
               value={email} onChange={(e)=>SetEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input  value={password} onChange={(e)=>SetPassword(e.target.value)} id="password" type="password"  />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Submit</Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
        <div className="text-center mt-3 ">
         <p>Already Registered ?<Link to={'/login'} className="underline">Login</Link></p>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
