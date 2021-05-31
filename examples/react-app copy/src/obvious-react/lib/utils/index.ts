import { Socket } from 'obvious-core'; // eslint-disable-line
import { StateType } from '../high-order-component/with-obvious-state'; // eslint-disable-line

type FormatedStateType = { name: string, socket: Socket }

type FormatedStatesType = Record<string, FormatedStateType>

export const Errors = {
    socketIsRequired: () => '[obvious-react] socket is not provided',
    busIsRequired: () => '[obvious-react] bus is not provided',
    stateNotInitialized: (stateName: string) => `[obvious-react] the state '${stateName}' is not initialized, maybe you should indicate the initialValue in the option of useObviousState`,
    initDeepState: (stateName: string) => `[obvious-react] you are not allowed to initialize the state ${stateName} deeply, you should initialize the root state instead`
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

export const getStateNameLink = (stateName: string): Array<string | number> => {
    const tempLink = stateName.split('.');
    const resultLink: Array<string | number> = [];
    tempLink.forEach((item: string) => {
        const arrayPattern = /(.+)\[(\d+)\]$/;
        const matchedResult = arrayPattern.exec(item);
        if (matchedResult !== null) {
            const arrayName = matchedResult[1];
            const arrayIndex = matchedResult[2];
            getStateNameLink(arrayName).forEach((item) => {
                resultLink.push(item);
            });
            resultLink.push(Number(arrayIndex));
        } else {
            resultLink.push(item);
        }
    });
    return resultLink;
};

