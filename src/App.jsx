import Header from './components/Header'

import initialEmails from './data/emails'
import './App.css'
import { useState } from 'react'


function App() {

  const [emails, setEmails] = useState(initialEmails)
  const [hideReads, setHideReads] = useState(false)
  const [inbox, setInbox] = useState(false)
  const [starred, setStarred] = useState(false)

  function toggleRead(email) {
    let item = [...emails]
    email.read = !email.read
    setEmails(item)
  }

  function countTotalInbox() {
    return emails.filter(function (email) {
      return !email.read
    }).length
  }

  function toggleStar(email) {
    let item = [...emails]
    email.starred = !email.starred
    setEmails(item)
  }

  function countTotalStarred() {
    return emails.filter(function (email) {
      return email.starred
    }).length
  }


  function getUnReadEmails() {
    return emails.filter(function (email) {
      return !email.read
    })
  }

  function getInbox() {
    return emails.filter(function (email) {
      return email.id
    })
  }


  function getStarredEmails() {
    return emails.filter(function (email) {
      return email.starred
    })
  }


  function toggleHide() {
    setHideReads(!hideReads)
  }

  function toogleStarred() {
    setStarred(!starred)
  }

  function toogleInbox() {
    setInbox(!inbox)
  }


  function displayEmails() {
    let emailsToDisplay = emails

    if (hideReads === true) {
      emailsToDisplay = getUnReadEmails()
    }

    if (starred === true) {
      emailsToDisplay = getStarredEmails()
    }

    if (inbox === true) {
      emailsToDisplay = getInbox()
    }

    return emailsToDisplay
  }



  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => { toogleInbox() }}
          >
            <span className="label">Inbox</span>
            <span className="count">{countTotalInbox()}</span>
          </li>
          <li
            className="item"
            onClick={() => { toogleStarred() }}
          >
            <span className="label">Starred</span>
            <span className="count">{countTotalStarred()}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideReads}
              onChange={() => { toggleHide() }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {
            displayEmails().map(function (email) {
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
