// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/* In order to connect our Angular app with our new Firebase app we will copy
these credentials in the environment.ts file located in
src/environments/environment.ts from our Angular 6 project. */

export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOURE_FIREBASE_API_KEY',
    authDomain: 'YOURE_FIREBASE_API_KEY',
    databaseURL: 'YOURE_FIREBASE_API_KEY',
    projectId: 'YOURE_FIREBASE_API_KEY',
    storageBucket: 'YOURE_FIREBASE_API_KEY',
    messagingSenderId: 'YOURE_FIREBASE_API_KEY'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
