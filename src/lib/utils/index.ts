import { Socket } from 'obvious-core'; // eslint-disable-line
import { StateType } from '../high-order-component/with-obvious-state'; // eslint-disable-line

type FormatedStateType = { name: string, socket: Socket }

type FormatedStatesType = Record<string, FormatedStateType>

export const Errors = {
    socketIsRequired: () => '[obvious-react] socket is not provided',
    busIsRequired: () => '[obvious-react] bus is not provided'
};

export const formatStates = (state: StateType, socket: Socket): FormatedStatesType => {
    const result: FormatedStatesType = {};
    Object.keys(state).forEach((key: string) => {
        if (typeof state[key] === 'string') {
            result[key] = {
                name: state[key] as string,
                socket
            };
        } else {
            const value = state[key] as FormatedStateType;
            result[key] = {
                name: value.name,
                socket: value.socket ?? socket
            };
        }
    });
    return result;
};

