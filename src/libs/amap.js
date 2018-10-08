import AMapAPILoader from './lazy-amap-api-loader.js';

const amapload = new AMapAPILoader({
    key: 'd4185194dce99b57dc470ceeaf0b5885',
    v: '1.4.2',
    uiVersion: '1.0.11',
    plugin: ['Autocomplete', 'PlaceSearch', 'Geolocation', 'Geocoder']
});
amapload.load();
export default amapload;
