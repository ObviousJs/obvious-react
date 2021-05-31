import React from 'react';
import { useBus } from '../hooks/use-bus';
import { Bus } from 'obvious-core'; // eslint-disable-line
import { Errors } from '../utils/index';

type Props = {
    name: string,
    bus?: Bus,
    activateConfig?: Record<string, any>,
    destroyConifg?: Record<string, any>,
    onActivate?: (name: string) => any,
    onDestroy?: (name: string) => any,
    style?: React.CSSProperties,
    className?: string
}

const InnerObviousApp: React.RefForwardingComponent<any, Props> = (props, ref) => {
    const defaultBus = useBus();
    const { 
        bus = defaultBus, 
        name, 
        activateConfig = {}, 
        destroyConifg = {}, 
        className = '', 
        style = {}, 
        onActivate, 
        onDestroy 
    } = props;
    if (!bus) {
        throw new Error(Errors.busIsRequired());
    }
    const vueAppRef = React.useRef(null);
    const activateApp = React.useCallback(() => {
        const mountPoint = vueAppRef.current;
        bus.activateApp(name, { ...activateConfig, mountPoint }).then(() => {
            onActivate && onActivate(name);
        });
    }, [name, bus]);
    const destroyApp = React.useCallback(() => {
        const mountPoint = vueAppRef.current;
        bus.destroyApp(name, { ...destroyConifg, mountPoint }).then(() => {
            onDestroy && onDestroy(name);
        });
    }, [name, bus]);

    React.useImperativeHandle(ref, () => ({
        activateApp,
        destroyApp
    }), [bus]);

    React.useEffect(() => {
        activateApp();
        return () => {
            destroyApp();
        };
    }, [activateApp, destroyApp]);

    return (
        <div className={className} style={style}>
            <div ref={vueAppRef}></div>
        </div>
    );
};

export const ObviousApp = React.forwardRef(InnerObviousApp);
