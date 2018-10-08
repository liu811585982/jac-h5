/**
 * 作者：yeshengqiang
 * 时间：2018-07-03
 * 描述：lazy-amap-api-loader.js
 */

const DEFAULT_AMP_CONFIG = {
    key: null,
    v: '1.4.2',
    protocol: 'https',
    hostAndPath: 'webapi.amap.com/maps',
    plugin: [],
    callback: 'amapInitComponent'
};

export default class AMapAPILoader {
  /**
   * @param config required 初始化参数
   */
    constructor (config) {
        this._config = {
            ...DEFAULT_AMP_CONFIG,
            ...config
        };
        this._document = document;
        this._window = window;
        this._scriptLoaded = false;
    }

    load () {
        if (this._window.AMap && this._window.AMap.Map) {
            return this.loadUIAMap();
        }
        if (this._scriptLoadingPromise) return this._scriptLoadingPromise;
        const script = this._document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.src = this._getScriptSrc();

        const UIPromise = this._config.uiVersion ? this.loadUIAMap() : null;
        this._scriptLoadingPromise = new Promise((resolve, reject) => {
            this._window['amapInitComponent'] = () => {
                if (UIPromise) {
                    UIPromise.then(() => {
                        window.initAMapUI();
                        setTimeout(resolve);
                    });
                } else {
                    return resolve();
                }
            };
            script.onerror = error => {
                this._document.head.removeChild(script);
                this._scriptLoadingPromise = null;
                reject(error);
            };
        });
        this._document.head.appendChild(script);
        return this._scriptLoadingPromise;
    }

    loadUIAMap () {
        if (!this._config.uiVersion || window.AMapUI) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const UIScript = document.createElement('script');
            const [versionMain, versionSub, versionDetail] = this._config.uiVersion.split('.');
            if (versionMain === undefined || versionSub === undefined) {
                console.error('amap ui version is not correct, please check! version: ', this._config.uiVersion);
                return;
            }
            let src = `${this._config.protocol}://webapi.amap.com/ui/${versionMain}.${versionSub}/main-async.js`;
            if (versionDetail) src += `?v=${versionMain}.${versionSub}.${versionDetail}`;
            UIScript.src = src;
            UIScript.type = 'text/javascript';
            UIScript.async = true;
            this._document.head.appendChild(UIScript);
            UIScript.onload = () => {
                setTimeout(resolve, 0);
            };
            UIScript.onerror = error => {
                this._document.head.removeChild(UIScript);
                reject(error);
            };
        });
    }

    _getScriptSrc () {
        // amap plugin prefix reg
        const amapPrefixReg = /^AMap./;

        const config = this._config;
        const paramKeys = ['v', 'key', 'plugin', 'callback'];

        // check 'AMap.' prefix
        if (config.plugin && config.plugin.length > 0) {
            config.plugin = config.plugin.map(item => {
                return (amapPrefixReg.test(item)) ? item : 'AMap.' + item;
            });
        }

        const params = Object.keys(config)
                            .filter(k => ~paramKeys.indexOf(k))
                            .filter(k => config[k] != null)
                            .filter(k => {
                            return !Array.isArray(config[k]) ||
                                    (Array.isArray(config[k]) && config[k].length > 0);
                            })
                            .map(k => {
                                let v = config[k];
                                if (Array.isArray(v)) return {key: k, value: v.join(',')};
                                return {key: k, value: v};
                            })
                            .map(entry => `${entry.key}=${entry.value}`)
                            .join('&');
        return `${this._config.protocol}://${this._config.hostAndPath}?${params}`;
    }
}
