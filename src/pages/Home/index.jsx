import './style.css'
import 'bootstrap'
import { useEffect, useState, useRef } from 'react'
import api from '../../services/api'

function Home() {
const [users, setUsers] = useState([]);

const inputName = useRef();
const inputAge = useRef();
const inputEmail = useRef();

async function getUsers() {
 const usersFromApi = await api.get('/usuarios');
  setUsers(usersFromApi.data);
};

async function createUsers() {
  await api.post('/usuarios', {
    name: inputName.current.value,
    age: inputAge.current.value,
    email: inputEmail.current.value
  })
};

async function deleteUsers(id) {
  await api.delete(`/usuarios/${id}`);
  getUsers();
 };

useEffect(() => {
  getUsers();
}, []);

  return (

    <div className='container'>
      <form className='col-lg-6' >
        <h1>Cadastro de Usuários</h1>
        <label htmlFor="nome">Nome:
        <input type="text" name='nome' id='nome' placeholder=' Digite seu nome' required ref={inputName} />
        </label>
        <label htmlFor="idade">Idade: 
        <input type="number" name='idade' id='idade' placeholder=' Digite sua idade' required ref={inputAge} />
        </label>
        <label htmlFor="email">Email: 
        <input type="email" name='email' id='email' placeholder=' Digite seu email' required ref={inputEmail} />
        </label>
        <button className='btn btn-outline-danger btn-lg rounded-5' type='submit' onClick={createUsers} >Cadastrar</button>
      </form>

{users.map((user) => (
  <div key={user.id} on={inputAge.toString()} className='caixa'>
    <div className='usuarios'>
  <div className='texto'>
    <p><span>Nome: </span>{user.name}</p>
    <p><span>Idade: </span>{user.age}</p>
    <p><span>Email: </span>{user.email}</p>
  </div>
  <div className='botao'>
    <button onClick={() => deleteUsers(user.id)} type='button'><i className='fa-solid fa-trash'></i></button>
  </div>
  </div>
</div>
))}
      
    </div>
  )
}

export default Home
