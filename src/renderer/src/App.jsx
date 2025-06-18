import { useEffect, useState } from 'react'
import logo from './assets/logo.png'
import { Link, useNavigate } from 'react-router'

const ipcr = window.electron.ipcRenderer


function App() {
  const navigate = useNavigate()
  const [partners, setPArtners] = useState([])
  const [orgTypes, setOrgTypes] = useState([])

  useEffect(() => { document.title = 'Список' }, [])

  useEffect(() => {
    (async () => {
      const res = await ipcr.invoke('getPartners')
      setPArtners(res)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const res = await ipcr.invoke('getOrgTypes')
      setOrgTypes(res)
    })()
  }, [])


  return (
    <>
      <div className="page-heading">
        <img className="page-logo" src={logo} alt="" />
        <h1>Партнеры</h1>
      </div>
      <Link to="/create" state={{ orgTypes }}>
        <button>Создать партнера</button>
      </Link>
      <ul className="partners-list">
        {partners.map((partner) => {
          return <li className="partner-card" key={partner.id} onClick={() => { navigate('/update', { state: {partner, orgTypes}}) } }>
            <div className="partner-data">
              <p className="card-heading">{partner.org_type} | {partner.name}</p>
              <div className="partner-data-info">
                <p>{partner.director}</p>
                <p>{partner.phone}</p>
                <p>Рейтинг: {partner.rating}</p>
              </div>
            </div>
            <div className="partner-sale partner-data card-heading">{partner.discount}</div>
          </li>
        })}
      </ul>
    </>
  )
}

export default App

