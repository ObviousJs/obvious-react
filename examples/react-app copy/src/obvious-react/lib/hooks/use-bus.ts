import { useContext } from 'react';
import { Bus } from 'obvious-core'; // eslint-disable-line
import BusContext from '../context/bus-context';

/**
 * the hook to get the bus from context
 * @return {Function} the context which store the bus
 */
export function useBus():Bus {
    return useContext(BusContext);
};
