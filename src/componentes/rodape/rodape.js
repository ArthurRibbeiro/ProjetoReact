import { useEffect } from 'react';
import './rodape.css'

function Rodape(){

    
    useEffect( () => {
        const isScrollable = document.body.scrollHeight > window.innerHeight - (84 + document.querySelector('.rodape').style.height);
    
        if (isScrollable){
            
            document.querySelector(".rodape").style.position = "relative";
            console.log("Scrollable");
        }
        
    }, [])




    return(
        <div className="rodape">
            <div>
                <h4>© 2023 Copyright - Todos os direitos reservados</h4>
            </div>
            <h4>Arthur - React</h4>

        </div>
    )
}

export default Rodape;