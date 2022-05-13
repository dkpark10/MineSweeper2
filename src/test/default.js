import React from 'react';
import App from '../app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

const DefaultComponents = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App>
              {children}
            </App>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default DefaultComponents;