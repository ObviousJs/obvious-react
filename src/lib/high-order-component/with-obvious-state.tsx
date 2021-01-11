import React from 'react';
import SocketContext from '../context/bus-context';
import { Socket } from 'obvious-core'; // eslint-disable-line
import { Errors, formatStates } from '../utils';

export type StateType = Record<string, {
    name: string,
    socket?: Socket
} | string>

type StateWatcherType = {
    handler: (newValue: any) => void,
    socket: Socket
}

/**
 * the HOC to genertate a component which can get the state of obvious
 * @param {StateType} rawState the states of obvious which you need to use
 * @param {Socket} componentSocket the socket to handle the states
 * @param {React.Component} component the compoent to be wrapped
 * @return {React.Component} wrapped component
 */
export const withObviousState = <P extends object>(rawState: StateType, componentSocket?: Socket) => ( Component: React.ComponentType<P> ) => {
    return class Wrapper extends React.Component<P> {
        stateWatchers: Record<string, StateWatcherType>;

        static contextType = SocketContext;

        constructor(props: P, context: Socket) {
            super(props, context);
            // format
            const appSocket = context;
            if (!appSocket && !componentSocket) {
                throw new Error(Errors.socketIsRequired());
            }
            const state = formatStates(rawState, componentSocket ?? appSocket);
            // init state
            const initialState = {};
            const stateWatchers = {};
            for (const reactStateName of Object.keys(state)) {
                const obviousStateName = state[reactStateName].name;
                const socket = state[reactStateName].socket;
                const initialValue = socket.getState(obviousStateName);
                initialState[reactStateName] = initialValue === undefined ? null : initialValue;
                stateWatchers[obviousStateName] = {
                    socket,
                    handler: (newValue: any) => {
                        this.setState({
                            [reactStateName]: newValue
                        });
                    }
                };
            }
            this.state = initialState;
            this.stateWatchers = stateWatchers;
        };

        componentDidMount() {
            for (const obviousStateName of Object.keys(this.stateWatchers)) {
                const rootStateName = obviousStateName.split('.')[0];
                const { socket, handler } = this.stateWatchers[obviousStateName];
                socket.waitState([rootStateName]).then(() => {
                    socket.watchState(obviousStateName, handler);
                });
            }
        }

        componentWillUnmount() {
            for (const obviousStateName of Object.keys(this.stateWatchers)) {
                const rootStateName = obviousStateName.split('.')[0];
                const { socket, handler } = this.stateWatchers[obviousStateName];
                if (socket.existState(rootStateName)) {
                    socket.unwatchState(obviousStateName, handler);
                };
            }
        }

        render() {
            return <Component {...this.state} {...this.props} />;
        }
    };
};

