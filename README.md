

# obvious-react

在React应用中轻松使用[obvious](https://github.com/ObviousJs/obvious-core)的库

## 安装
npm:
```
npm install react obvious-react
```
umd:
```
<script src="https://unpkg.com/obvious-react@{version}/dist/index.umd.js"></script>
```

## 使用

### BusProvider和SocketProvider

获取Bus并创建Socket

```js
import { BusProvider, SocketProvider } from 'obvious-react';

const bus = window.__Bus__.host;
const socket = bus.createSocekt();

ReactDOM.render((
    <BusProvider bus={bus}>
        <SocketProvider socket={socket}>
            <App />
        </SocketProvider>
    </BusProvider>
), document.getElementById('app'));
```
### ObviousApp

ObviousApp是一个容器组件，它将在组件挂载时激活app，并在组件卸载时销毁app

```js
import React from 'react';
import { ObviousApp } from 'obvious-react';

function App() {
  return <ObviousApp name="vueApp" activateConfig={{ message: 'hello' }} />
}
```

| 属性           | 必须 | 类型       | 默认                   | 说明             |
| -------------- | ---- | ---------- | ---------------------- | ---------------- |
| name           | 是   | string     | -                      | app名            |
| bus            | 否   | Bus        | BusProvider中提供的bus | 用来激活app的bus |
| activateConfig | 否   | object     | {}                     | 激活参数         |
| destroyConfig  | 否   | object     | {}                     | 销毁参数         |
| onActivate     | 否   | () => void | -                      | 激活成功后的回调 |
| onDestroy      | 否   | () => void | -                      | 销毁成功后的回调 |

除了上述props外，组件还暴露了activateApp和destroyApp方法，用于手动激活和销毁app

### useBus和useSocket

在BusProvider和SocketProvider的子组件中，可以分别用useBus和useSocket获取bus和socket实例
```js
import React from 'react';
import { useBus, useSocket } from 'obvious-react';

function App() {
    const bus = useBus();
    const socket = useSocket();

    React.useEffect(() => {
        bus.loadApp('vueApp').then(() => {
            socket.broadcast('vueAppLoaded');
        })
    }, [])

    return (
        <div id="app"></div>
    );
}
```

### useObviousState

通过useObviousState，将obvious的state转为React组件内部的state
```js
import React from 'react';
import { useObviousState } from 'obvious-react';

function App() {
  const [text, setText] = useObviousState('text');
  
  return <input value={text} onChange={(e) => setText(e.target.value)} />
}
```

useObviousState的第一个参数是要绑定的obvious状态名，是必选的。同时可以将可选的配置对象作为第二个参数传入，配置项如下

| 属性         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| socket       | 操作obvious状态的socket，如果不传，则使用SocketProvider提供的socket |
| initialValue | 状态初始值。如果指定了该配置项，且状态没有被init时，将调用socket.initState初始化状态 |

### useBroadcast和useUnicast

通过useBroadcast和useUnicast监听广播和单播事件

```js
import React from 'react';
import { useBroadcast, useUnicast } from 'obvious-react';

function App() {
  const [count, setCount] = React.useState(0)
  useBroadcast('increase', () => {
    setCount((oldValue) => oldValue + 1)
  });
  
  useUnicast('getCount', () => {
    return count;
  });
  
  return <div>{count}</div>
}
```

useBroadcast和useUnicast接收3个参数，第一个参数是事件名，第二个参数是监听回调，前两个参数是必选的。第三个参数是监听事件的socket的实例，如果不传，则使用SocketProvider中提供的socket

### withObviousState

对于Class组件，obvious-react提供了withObviousState高阶组件，可以将obvious的状态映射为组件的props

```js
import React from 'react';
import { withObviousState } from 'obvious-react';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
    	<div style={{ backgroundColor: props.themeColor }}>{props.text}</div>
    );
  }
}

const themeBus = window.__Bus__.theme;
const themeSocket = themeBus.createSocket();

export default withObviousState({
  text: 'text', // 键为prop名，值为obvious状态名，操作状态的socket为SocketProvider提供的socket
  themeColor: { // 如果值是对象，则可以指定操作状态的socket
    state: 'themeColor',
    socket: themeSocket
  }
})(App);
```

除了对某个状态指定socket，也可以在第二个参数中传入操作所有状态的socket

```js
withObviousState({text: 'text', themeColor: 'themeColor'}, socket)(App)
```

## License
obvious-react is MIT licensed







