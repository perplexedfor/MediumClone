import { Link, useNavigate } from "react-router-dom"
import { SignupType } from "@perplexedfor/medium";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../config";
export const Form = ({type}:{type:"signup"|"signin"}) =>{
    const navigate = useNavigate()
    const [postInputs,setPostInputs] = useState<SignupType>({
        name:"",
        email:"",
        password:""
    })
    async function sendRequest (){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup" : "signin"}`,postInputs)
            const jwt = response.data;
            localStorage.setItem("token",jwt)
            navigate("/blogs")
        }catch (e){
            //alert that the request has failed
        }
        
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-center text-slate-500 ">
                        {type == "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link to={type=== "signin" ? "/signup" : "/signin"} className="underline-offset-1 px-1">
                            {
                                type == "signin" ?"Sign up" : "Sign in"
                            }
                        </Link>
                    </div>
                    <div className="pt-2">
                        {
                            type === "signup" ? <LabelledInput onChange={(e) => {
                                setPostInputs(c => ({
                                    ...c,
                                    name: e.target.value
                                }))
                            }} label="Username" placeholder="Abhinav" /> : null
                        }
                        
                        <LabelledInput onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                email: e.target.value
                            }))
                        }} label="email" placeholder="abhinav@gmail.com" />
                        <LabelledInput onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                password: e.target.value
                            }))
                        }} label="Password" type={"password"} placeholder="123456" />
                        <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" >{type === "signup"? "Sign up" : "Sign in"}</button>
                    </div>
                </div>
            </a>
        </div>
    </div>

}
function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}
interface LabelledInputType {
    label: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}