import { useContext } from 'react';
import { Socket } from 'obvious-core'; // eslint-disable-line
import SocketContext from '../context/socket-context';

/**
 * the hook to get the socket from context
 * @return {Function} the context which store the socket
 */
export function useSocket():Socket {
    return useContext(SocketContext);
};
