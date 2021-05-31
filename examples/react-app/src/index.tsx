import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BusProvider, SocketProvider } from 'obvious-react';
import reportWebVitals from './reportWebVitals';

const bus = window.__Bus__.host;
const socket = bus.createSocket();

class ErrorBoundry extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

bus.createApp('react-app')
  .bootstrap(async (config) => {
    ReactDOM.render(
      <ErrorBoundry>
        <BusProvider bus={bus}>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </BusProvider>
      </ErrorBoundry>,
      config.mountPoint
    );
  })
  .destroy(async (config) => {
    ReactDOM.unmountComponentAtNode(config.mountPoint)
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
