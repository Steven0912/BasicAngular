// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    firebase: {
        apiKey: 'AIzaSyC8P4LE7x94gmcuxUHjx1rhI5TplRpKQU0',
        authDomain: 'angulartest-7067f.firebaseapp.com',
        databaseURL: 'https://angulartest-7067f.firebaseio.com',
        projectId: 'angulartest-7067f',
        storageBucket: 'angulartest-7067f.appspot.com',
        messagingSenderId: '85183771595'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
