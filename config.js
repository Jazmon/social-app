/* eslint-disable quote-props, quotes, comma-dangle */
module.exports = {
  // "relayUrl": "http://localhost:3000/graphql"
  relayUrl: (os = 'android') => `http://${os === 'ios' ? 'localhost' : '192.168.1.101'}:3000/graphql`,
  // "relayUrl": "http://192.168.1.101:3000/graphql"
};
