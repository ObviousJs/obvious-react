import React from 'react';
import BusContext from '../context/bus-context';
import { Bus } from 'obvious-core';// eslint-disable-line

type PropsType = {
    bus: Bus
}

/**
 * the root component which store the context of bus
 * @param {PropsType} props props of component
 * @return {React.Component} the Context Provider
 */
export const BusProvider: React.FunctionComponent<PropsType> = (props) => {
    return (
        <BusContext.Provider value={props.bus}>
            {props.children}
        </BusContext.Provider>
    );
};
