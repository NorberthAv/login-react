import LoginForm from "./LoginForm";
import logo from './../logo.svg';
import RegistroForm from './RegistroForm';

export function Card() {
    return  <div className="card-body">
            <div className='img-conten'>
            <img src={logo} className="App-logo" alt="logo" />
            </div>
            <h5 className="card-title">Login</h5>
            <br/>
            <LoginForm />
        </div>
    
}
export function CardRegister() {
    return <div className="card-body">
            <div className='img-conten'>
            <img src={logo} className="App-logo" alt="logo" />
            </div>
            <h5 className="card-title">Registro</h5>
            <br/>
            <RegistroForm/>
        </div>  
}