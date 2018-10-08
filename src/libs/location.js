import initMap from '@/libs/amap.js';

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        const currentPosition = {};
        navigator.geolocation.getCurrentPosition((data) => {
            currentPosition.longitude = data.coords.longitude;
            currentPosition.latitude = data.coords.latitude;
            resolve(currentPosition);
        }, async (e) => {
            if (!window.AMap) {
                await initMap.load();
            }
            setTimeout(() => {
                const geolocation = new window.AMap.Geolocation();
                geolocation.getCurrentPosition((status, data) => {
                    if (status !== 'error') {
                        currentPosition.longitude = data.position.getLng();
                        currentPosition.latitude = data.position.getLat();
                        resolve(currentPosition);
                    } else {
                        reject(new Error('未连接网络，请检查网络！'));
                    }
                });
            });
        }, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 3000
        });
    });
};
