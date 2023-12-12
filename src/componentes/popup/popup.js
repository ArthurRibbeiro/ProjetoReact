import { useEffect } from 'react'
import './popup.css'

function PopUp( { interruptor }){

    useEffect(() => {
        document.querySelector('.background').style.height = document.body.scrollHeight-84 +"px"
    })
    return(
        <div className="background">
            <div className='popUp'>
                <h3>Alerta</h3>
                <span>Preencha todos os campos</span>
                <button onClick={interruptor}> Fechar </button>

            </div>
        </div>
    )
}

export default PopUp