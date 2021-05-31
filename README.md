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

获取Bus并创建Socket

```js
import { BusProvider, SocketProvider } from 'obvious-react';

const bus = window.__Bus__.host
const socket = $bus.createSocekt()

ReactDOM.render((
    <BusProvider bus={bus}>
        <SocketProvider socket={socket}>
            <App />
        </SocketProvider>
    </BusProvider>
))
```
### Hook

#### useBus和useSocket

#### useObviousState

#### useBroadcast和useUnicast

### HOC

#### withObviousState

### 激活App

#### ObviousApp

## License
obvious-react is MIT licensed







