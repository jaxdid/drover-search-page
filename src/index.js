import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import Search from './components/Search'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Search />, document.getElementById('root'))
registerServiceWorker()
