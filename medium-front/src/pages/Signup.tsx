import { Quote } from "../components/Quote"
import { Form } from "../components/Input"
export const Signup = () =>{
    return <div className="md:grid-cols-2 grid grid-cols-1">
        <Form type="signup" />
        <div className="md:visible invisible">
            <Quote/>
        </div>

    </div>
}