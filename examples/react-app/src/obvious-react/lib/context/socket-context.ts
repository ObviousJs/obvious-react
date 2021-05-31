import React from 'react';
import { Socket } from 'obvious-core';

const SocketContext = React.createContext<Socket>(null as any);
SocketContext.displayName = 'SocketContext';

export default SocketContext;
