import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RoutesApp } from './pages';

import { Provider } from "react-redux";
import initializeStore from "./Store/init";
import { ChakraProvider } from '@chakra-ui/react'

import './index.scss'
import './styletwofa.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={initializeStore}>
      <ChakraProvider>
        
        <RoutesApp />
        
      </ChakraProvider>
    </Provider>
  </>
);
