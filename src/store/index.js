import Vue from 'vue';
import Vuex from 'vuex';
import state from '@/store/src/state';
import getters from '@/store/src/getters';
import actions from '@/store/src/actions';
import mutations from '@/store/src/mutations';

const requireAll = requireContext => {
    let resource = {};
    requireContext.keys().forEach(item => {
        let src = item.replace(/(?:.*?)(\w+)\.js$/, '$1');
        const result = requireContext(item);
        resource[src] = ('default' in result)
                                    ? { namespaced: true, ...result.default }
                                    : { namespaced: true, ...result };
    });
    return resource;
};
const modules = requireAll(require.context('./src/modules', false, /\.js$/));

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules,
	strict: process.env.NODE_ENV !== 'production'
});
