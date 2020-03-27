import React, { useState, useEffect } from 'react'; // * useEffect.
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

	const history = useHistory();

  const ongId = localStorage.getItem('ongId'); // Recuperará o id da ONG.
  const ongName = localStorage.getItem('ongName'); // Recuperará o nome da ONG.

  useEffect(() => {
    api.get('profile', { // * Recuperação dos dados vindo da rota /profile.
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, { // * Deletará o incident.
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id)); // * Filter.
    } catch (err) {
      alert('Erro ao deleter caso, tente novamente.');
    }
  }

	function handleLogout() {
    localStorage.clear(); // Limpa o localStorage.

    history.push('/'); // Volta para a página de login.
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>
      
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button"> {/*// Chama a função de logout.*/}
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
							.format(incident.value)}</p> {/* Formato de moeda brasileira.*/}

            <button 
							onClick={() => handleDeleteIncident(incident.id)} // * Botão delete.
							type="button"
						>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        
        ))}
      </ul>
    </div>
  );
}