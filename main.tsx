import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' 

// This looks for <div id="root"></div> in your index.html
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)