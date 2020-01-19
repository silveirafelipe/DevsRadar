import React, { useEffect, useState } from 'react';
import api from './services/api'

import DevForm from './components/DevForm'
import DevItem from './components/DevItem'

import './global.css'
import './App.css'
import './sidebar.css'
import './Main.css'


//Componentes: Bloco isolado de HTML, CSS e JS, o qual  não interfere no restante da aplicação
//Estado: INformações mantidas pelo componente (Lembrar: Imutabilidade)
//Propriedade: Informações que um componente PAI passa para um componente FILHO

//Estudar API de contexto do React
//Criar função de deletar e atualizar desenv

function App() {
    const [devs, setDevs] = useState([]);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs');

            setDevs(response.data);
        }
        loadDevs();
    }, [])

    async function handleAddDev(data) {
        const response = await api.post('/devs', data);      

        setDevs([...devs, response.data])
    }
    async function handleRemoveDev(){

    }

    async function handleUpdateDev(){

    }

    return (
        <div id="App">
            <aside>
                <strong> Cadastrar </strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>

            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev} />
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;