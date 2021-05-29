import { useSocket } from './use-socket';
import { useEffect } from 'react';
import { Socket } from 'obvious-core'; // eslint-disable-line
import { Errors } from '../utils/index';

export function useUnicast(eventName: string, callback: (...args: any) => any, indicatedSocket?: Socket) {
    const defaultSocket = useSocket();
    const socket = indicatedSocket ?? defaultSocket;
    if (!socket) {
        throw new Error(Errors.socketIsRequired());
    }
    useEffect(() => {
        socket.onUnicast(eventName, callback);
        return () => {
            socket.offUnicast(eventName, callback);
        };
    }, [callback, eventName, socket]);
}
