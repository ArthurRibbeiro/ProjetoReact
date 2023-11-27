import "./cadastro.css" 
import { Outlet } from "react-router-dom";

function Cadastro(){
    return(
        <div className='cadBody'>
            <Outlet />
        </div>
    )
}

export default {Cadastro}