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
import { useNavigate } from "react-router-dom"

export function Login({ ...props }) {
    const navigate = useNavigate();
    const [email,SetEmail] = useState("")
    const [password,SetPassword] = useState("")
    const [response,SetResponse] = useState(null)

    
   const handlelogin = async(e) =>{
    e.preventDefault();
    console.log('login api hit');
    
    
    try {
      
      const res = await axios.post('http://localhost:4000/api/auth/login',{
        email,password
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })
       

      const data = res.data;
      SetResponse(data.message);
      console.log(data.message);
      const token = data.token;
      localStorage.setItem("auth-token",token)
      navigate('/task')
     
    } catch (error) {
      console.log(error);
      
      console.error("Login Faild",error)
    }

   }

  


  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Card className="flex flex-col justify-center w-md " {...props}>
      <CardHeader >
        <CardTitle className='text-center'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlelogin}   >
          <FieldGroup>

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
                <Button type="submit">Login</Button>
                

              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
        <div className="text-center mt-3 ">
         <p>Go to Register ?<Link to={'/'} className="underline">Register</Link></p>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

