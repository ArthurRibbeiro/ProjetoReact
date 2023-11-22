

import { useState, useEffect } from 'react';
import './cadastroCurso.css'

function carrega(){
        const cursos = localStorage.getItem('cursos')
        return cursos ? JSON.parse(cursos) : [[], 1];
}

function editar(){

} 

function excluir(evt){
    const elemID = evt.target.parentElement.parentElement.firstChild.innerText
    console.log(elemID);
    const cursos = carrega()
    let index = 0
    cursos[0].map(i => {
        if (i.idCurso == elemID) {
            cursos[0].splice(index, 1);
        }else{
            index ++
        }
        localStorage.setItem("cursos", JSON.stringify([cursos[0], cursos[1]]));
    
    })


}


function Form(){
    const [cursos, setCursos] = useState(carrega());


    const [idCurso, setIdCurso] = useState(cursos[1])
    const [nomeCurso, setNomeCurso] = useState('')
    const [dtInicioCurso, setDtInicioCurso] = useState('')
    const [nomeCoordCurso, setNomeCoordCurso] = useState('')

    function onClick() {
        setCursos((prevCursos) => {
          // Carrega o estado mais recente
          const cursosAtualizados = carrega();
      
          // Cria uma cópia do array de cursos e adiciona o novo curso
          const novaListaCursos = [...cursosAtualizados[0], {
            idCurso: idCurso,
            nomeCurso: nomeCurso,
            dtInicioCurso: dtInicioCurso,
            nomeCoordCurso: nomeCoordCurso,
          }];
      
          // Atualiza o localStorage com a nova lista de cursos
          localStorage.setItem("cursos", JSON.stringify([novaListaCursos, idCurso + 1]));
      
          // Atualiza o estado com a nova lista de cursos
          return [novaListaCursos, idCurso + 1];
        });
      
        // Atualiza o ID
        setIdCurso(idCurso + 1);
      }

    return(
        <>
            <div className="inputCombo">
                <label>ID</label>
                <input id="idCurso" readOnly  value={idCurso}></input>
            </div>
        
            <div className="inputCombo">
                <label>Nome do curso</label>
                <input id="nomeCurso" value={nomeCurso} onChange={evt => setNomeCurso(evt.target.value)}></input>
            </div>
            <div className="inputCombo">
                <label>Data de início</label>
                <input type='date' min='2023-01-01' max='2024-01-01' id="dtInicioCurso"
                value={dtInicioCurso} onChange={evt => setDtInicioCurso(evt.target.value)}
                ></input>
            </div>
            <div className="inputCombo">
                <label>Nome do Coordenador do curso</label>
                <input id="nomeCoordCurso"  value={nomeCoordCurso} onChange={evt => setNomeCoordCurso(evt.target.value)}></input>
            </div>

            <button id='btnCadastroCurso' onClick={onClick}>Cadastrar</button>

        </>
    )
}

function Tabela(){

    const [cursos, setCursos] = useState(carrega());
      
      useEffect(() => {
        const interval = setInterval(() => {
          const newCursos = carrega()
          setCursos(newCursos);
        }, 100); // Atualiza a cada 5 segundos (ajuste conforme necessário)
      
        return () => clearInterval(interval);
      }, []);

    return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Data inicio</th>
                    <th>Coordenador</th>
                    <th className='thHidden'>hidden</th>
                    <th className='thHidden'>hidden</th>
                </tr>
            </thead>

            <tbody className='dataSpace'>
                {cursos[0].map(i => {
                    return(
                        <tr>
                        <td>{i.idCurso}</td>
                        <td>{i.nomeCurso}</td>
                        <td>{i.dtInicioCurso}</td>
                        <td>{i.nomeCoordCurso}</td>
                        <td><button onClick={editar}>Editar</button></td>
                        <td><button onClick={excluir}>Excluir</button></td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}


 
export default {Form, Tabela};

