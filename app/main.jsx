'use strict'
//import '../assets/index/stylesheets/style.scss';

import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
//import Root from './components/Root'

import Main from './components/Main'


render (
  <div>
    <Main />
    {/*
  <Provider store={store}>
    
    
   
  </Provider>
  */}
  </div>,
  document.getElementById('main')
)