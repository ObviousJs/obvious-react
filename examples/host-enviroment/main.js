import { createBus } from 'obvious-core';

const bus = createBus('host', {
    'react-app': {
        js: [
            'http://localhost:3000/static/js/bundle.js',
            'http://localhost:3000/static/js/vendors~main.chunk.js',
            'http://localhost:3000/static/js/main.chunk.js'
        ]
    },
    'vue-app': {
        js: [
            'http://localhost:8080/js/app.js',
            'http://localhost:8080/js/chunk-vendors.js'
        ]
    }
});

bus.activateApp('react-app', { mountPoint: document.getElementById('react-app') });