import React from 'react';
import { useBus } from '../hooks/use-bus';
import { Bus } from 'obvious-core'; // eslint-disable-line
import { Errors } from '../utils';

type Props = {
    name: string,
    bus?: Bus,
    activateConfig?: Record<string, any>,
    destroyConifg?: Record<string, any>,
    onActivate?: (name: string) => any,
    onDestroy?: (name: string) => any,
}

export const ObviousApp: React.FunctionComponent<Props> = (props) => {
    const defaultBus = useBus();
    const { bus = defaultBus, name, activateConfig = {}, destroyConifg = {}, onActivate, onDestroy } = props;
    if (!bus) {
        throw new Error(Errors.busIsRequired());
    }
    const ref = React.useRef(null);
    React.useEffect(() => {
        const mountPoint = ref.current;
        bus.activateApp(name, { ...activateConfig, mountPoint }).then(() => {
            onActivate && onActivate(name);
        });
        return () => {
            bus.destroyApp(name, { ...destroyConifg, mountPoint }).then(() => {
                onDestroy && onDestroy(name);
            });
        };
    }, [name, bus, activateConfig, destroyConifg, onActivate, onDestroy]);
    return (
        <div ref={ref}></div>
    );
};
