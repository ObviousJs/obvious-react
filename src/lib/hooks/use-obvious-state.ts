import { useSocket } from '../hooks/use-socket';
import { useState, useEffect } from 'react';
import { Socket } from 'obvious-core'; // eslint-disable-line
import { Errors } from '../utils';

type OptionsType = {
    socket?: Socket,
    initialValue?: any
}

/**
 * the hook to get and set state of obvious
 * @param {string} stateName the stateName of the obvious state
 * @param {OptionsType} options the option to indicate socket and the state value to init
 * @return {[any, Function]} [value, setValue] corresponding to the value of obvious' state and the method to set the value
 */
export function useObviousState<T>(stateName: string, options: OptionsType = {}): [T, (newValue: T | ((oldValue: T) => T)) => void] {
    const rootState: string = stateName.split('.')[0];
    const defaultSocket = useSocket();
    // init
    const socket: Socket = options.socket ?? defaultSocket;
    if (!socket) {
        throw new Error(Errors.socketIsRequired());
    }
    let initialValue: any = null;
    if (socket.existState(rootState)) {
        initialValue = socket.getState(initialValue);
    } else if (options.initialValue !== undefined) {
        initialValue = options.initialValue;
    } else {
        initialValue = null;
    }

    const [obviousState, setObviousState] = useState<T>(initialValue);

    // update React state when obvious state change
    useEffect(() => {
        const callback = (newValue: any) => {
            setObviousState(newValue);
        };
        socket.waitState([rootState]).then(() => {
            socket.watchState(stateName, callback);
        });
        return () => {
            socket.waitState([rootState]).then(() => {
                socket.unwatchState(stateName, callback);
            });
        };
    }, [stateName, socket, rootState]);

    const value:T = obviousState;
    const setValue = (newValue: T | ((oldValue: T) => T)) => {
        socket.setState(stateName, newValue);
    };

    return [value, setValue];
};

export default useObviousState;
