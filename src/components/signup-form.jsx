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
import { Link } from 'react-router-dom'

export function RegisterForm({
  ...props
  
}) {
  const [name,SetName] = useState("")
  const [email,SetEmail] = useState("")
  const [password,SetPassword] = useState("")
   const [response,SetResponse] = useState(null)

   const handleRegister = async(e) =>{
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/api/auth/register',{
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
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Resgister</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input value={name} onChange={(e)=>SetName(e.target.value)} id="name" type="text" placeholder="Enter your name" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input value={email} onChange={(e)=>SetEmail(e.target.value)} id="email" type="email" placeholder="Enter your email" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input value={password} onChange={(e)=>SetPassword(e.target.value)} id="password" type="password" required />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Submit</Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
        <div className="text-center">
         <p>Already Registered ?<Link to={'/login'}>Login</Link></p>
        </div>
      </CardContent>
    </Card>

  );

}
