import { useSocket } from '../hooks/use-socket';
import { useEffect } from 'react';
import { Socket } from 'obvious-core'; // eslint-disable-line
import { Errors } from '../utils';

export function useBroadcast(eventName: string, callback: (...args: any) => void, indicatedSocket?: Socket) {
    const defaultSocket = useSocket();
    const socket = indicatedSocket ?? defaultSocket;
    if (!socket) {
        throw new Error(Errors.socketIsRequired());
    }
    useEffect(() => {
        socket.onBroadcast(eventName, callback);
        return () => {
            socket.offBroadcast(eventName, callback);
        };
    }, [callback, eventName, socket]);
}
