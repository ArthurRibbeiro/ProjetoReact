import logo from './logo.svg';
import './App.css';
import Cabecalho from './componentes/cabecalho/cabecalho';

import Rodape from './componentes/rodape/rodape';

import Cadastro from './paginas/cadastro';

import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom';
import CadCurso from './paginas/cadastroCurso/cadastroCurso';
import CadPeriodo from './paginas/cadastroPeriodo/cadastroPeriodo';
import CadProfessor from './paginas/cadastroProfessor/cadastroProfessor';
import CadSala from './paginas/cadastroSalas/cadastroSalas';
import CadDesafio from './paginas/cadastroDesafio/cadastroDesafio';

const router = createBrowserRouter([
  {
  path: "cadastro",
  element: <Cadastro.Cadastro />,
  children:[
    {
      path: "curso",
      element: <CadCurso/>,
    },
    {
      path: "periodo",
      element: <CadPeriodo />,
    },
    {
      path: "professor",
      element: <CadProfessor />,
    },
    {
      path: "sala",
      element: <CadSala />,
    },
    {
      path: "desafio",
      element: <CadDesafio />,
    },
  ],
  },
])


function App() {
  return (
    <div className="App">
      <Cabecalho />
      <RouterProvider router={router} />
      <Rodape />
    </div>
  );
}

export default App;
