import React from 'react';
import { Bus } from 'obvious-core';

const BusContext = React.createContext<Bus>(null as any);
BusContext.displayName = 'BusContext';

export default BusContext;
