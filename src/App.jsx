import Header from './components/Header'

import initialEmails from './data/emails'
import './App.css'
import { useState } from 'react'


function App() {

  const [emails, setEmails] = useState(initialEmails)

  function toggleRead(email) {
    let item = [...emails]
    email.read = !email.read
    setEmails(item)
  }

  function toggleStar(email) {
    let item = [...emails]
    email.starred = !email.starred
    setEmails(item)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
          // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
          // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
            // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {
            emails.map(function (email) {
              return <li className={`email ${email.read ? 'read' : 'unread'}`}>
                <input type="checkbox" onClick={() => toggleRead(email)} checked={email.read} />
                <input className='star-checkbox' type="checkbox" onClick={() => toggleStar(email)} checked={email.starred} />
                <div>{email.sender}</div>
                <div className='title'>{email.title}</div>
              </li>
            })
          }
        </ul>
      </main>
    </div>
  )
}

export default App
