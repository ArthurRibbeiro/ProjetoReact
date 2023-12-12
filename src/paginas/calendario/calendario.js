import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'; // Importa o local pt-BR
import './calendario.css';
import data from '../../componentes/recursos/data';

function Calendario({ mes1, ano1 }) {

  const [mes, setMes] = useState(mes1)
  const [ano, setAno] = useState(ano1)

  function anterior(){
    setMes(mes - 1)
  }

  function proximo(){
    setMes(mes + 1)
  }
  
  const primeiroDiaDoMes = startOfMonth(new Date(ano, mes - 1, 1));
  const ultimoDiaDoMes = endOfMonth(new Date(ano, mes - 1));

  const numeros = eachDayOfInterval({ start: primeiroDiaDoMes, end: ultimoDiaDoMes }).map((date) =>
    format(date, 'dd', { locale: ptBR }) // Adiciona o local pt-BR
  );

  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const chunkArray = (array, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const rows = chunkArray(numeros, 7);

  const [desafios, setDesafios] = useState(() => {
    const lista = localStorage.getItem('desafios');
    return lista ? JSON.parse(lista)[0] : [];
  });

  return (
    <>
      <h2 className='tituloCalendario'>Calendário</h2>
      <div className='calendario'>
        <button className='setaBtn' onClick={anterior}>&lt;</button>

        <div >
        <h3>{format(primeiroDiaDoMes, 'MMMM yyyy', { locale: ptBR })}</h3> {/* Adiciona o local pt-BR */}
        <div>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="numero-grid-row">
              {row.map((numero, columnIndex) => (
                <div key={columnIndex} className="numero-card">
                  <div className='cardHead'>
                    <span className='numero'>{numero} {diasDaSemana[columnIndex]}</span>
                  </div>
                  <div className='cardContent'>
                    {desafios.map((element, index) => {
                      const inicio = data.formatarParaAnoMesDia(element.dtInicioDesafio);
                      const fim = data.formatarParaAnoMesDia(element.dtFimDesafio);
                      const dia = `${ano}-${mes.toString().padStart(2, '0')}-${numero}`;
                      if (data.estaEntre(dia, inicio, fim) && element.diaSemana.indexOf(diasDaSemana[columnIndex]) >= 0) {
                        return (
                          <div className='topico' key={index}>
                            {`
                            ${element.sala}
                            ${element.horario}
                            ${element.nomeDesafio}
                            ${element.professor}
                            `}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button  className='setaBtn' onClick={proximo}>&gt;</button>

      </div>
      
    </>
  );
}

export default Calendario;
