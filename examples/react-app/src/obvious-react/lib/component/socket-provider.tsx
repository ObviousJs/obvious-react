import React from 'react';
import SocketContext from '../context/socket-context';
import { Socket } from 'obvious-core'; // eslint-disable-line

type PropsType = {
    socket: Socket
}

/**
 * the root component which store the context of socket
 * @param {PropsType} props props of component
 * @return {React.Component} the Context Provider
 */
export const SocketProvider: React.FunctionComponent<PropsType> = (props) => {
    return (
        <SocketContext.Provider value={props.socket}>
            {props.children}
        </SocketContext.Provider>
    );
};
