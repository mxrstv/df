import { useEffect, useState } from "react"
import { useLocation } from 'react-router';
import { Link } from "react-router";
import logo from './assets/logo.png'

const ipcr = window.electron.ipcRenderer;

export default function CreatePartner() {
  const location = useLocation();
  const [partner, setPartner] = useState(location.state.partner);
  const [orgTypes] = useState(location.state.orgTypes);

  useEffect(() => { document.title = 'Создать запись' }, [])
  async function submitHandler(e) {
    e.preventDefault()
    const partner = {
      orgTypeId: e.target.type.value,
      name: e.target.name.value,
      director: e.target.director.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      inn: e.target.inn.value,
      address: e.target.address.value,
      rating: e.target.rating.value
    }
    await ipcr.invoke('createPartner', partner);
    setPartner(partner)
    // document.querySelector('form').reset()
  }


  return <div className="form">
    <div className="page-heading">
      <img className="page-logo" src={logo} alt="" />
      <h1>Создать партнера</h1>
    </div>
    
    <form onSubmit={(e) => submitHandler(e)}>
      <div className="form-buttons">
        <Link to={'/'}>
          <button type="button">
            {"<-- Назад"}
          </button>
        </Link>
        <button type="submit">Создать</button>
      </div>
      
      <label htmlFor="name">Наименование:</label>
      <input id="name" type="text" required />
      <label htmlFor="type">Тип партнера:</label>
      <select name="" id="type" required>
        {orgTypes.map(orgType => <option key={orgType.id} value={orgType.id}>{orgType.name}</option>)}
      </select>
      <label htmlFor="rating">Рейтинг:</label>
      <input id="rating" type="number" step="1" min='0' max='100' required defaultValue='0'/>
      <label htmlFor="address">Адрес:</label>
      <input id="address" type="text" required />
      <label htmlFor="director">ФИО директора:</label>
      <input id="director" type="text" required />
      <label htmlFor="phone">Телефон:</label>
      <input id="phone" type="tel" required />
      <label htmlFor="inn">ИНН:</label>
      <input id="inn" type="text" required />
      <label htmlFor="email">Email компании:</label>
      <input id="email" type="email" required />
    </form>
  </div>
}