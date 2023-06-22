const inseeCode = require('./index');
const searchInseeCode = new inseeCode();

(async () => {
    console.log('--- ENDPOINT TESTING ---');
    try {
        console.log('#VILLE', await searchInseeCode.getCommune('Paris'), 'OK');
        console.log('#DEPARTEMENT', await searchInseeCode.getDepartement('Paris'), 'OK');
        console.log('#REGION', await searchInseeCode.getRegion('Île-de-France'), 'OK');
    } catch (err) {
        return console.log('--- FAIL ---\n\nError : ', err.message);
    }
    console.log('--- SUCCESS ---');
})();