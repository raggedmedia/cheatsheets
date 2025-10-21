import { createAuth0Client } from '@auth0/auth0-spa-js';

let auth0 = null;

//Function to initialize Auth0 client
export const initAuth0 = async () => {
  if (!auth0) {
    auth0 = await createAuth0Client({
      domain: 'dev-4rbsjnxqivrki82z.us.auth0.com',
      clientId: 'MxIKn0kjcz0ir9PEqCfGZkTgc6qLdOCy',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
  }
  return auth0;
};

// AUTH0_DOMAIN=
// AUTH0_CLIENT_ID=
// MY_CALLBACK_URL=

// //or, you can just instantiate the client on its own
// import { Auth0Client } from '@auth0/auth0-spa-js';

// const auth0 = new Auth0Client({
//   domain: '<AUTH0_DOMAIN>',
//   clientId: '<AUTH0_CLIENT_ID>',
//   authorizationParams: {
//     redirect_uri: '<MY_CALLBACK_URL>'
//   }
// });

// //if you do this, you'll need to check the session yourself
// try {
//   await auth0.getTokenSilently();
// } catch (error) {
//   if (error.error !== 'login_required') {
//     throw error;
//   }
// }
