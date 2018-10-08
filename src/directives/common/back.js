/**
 * 作者：yeshengqiang
 * 时间：2018-03-21
 * 描述：back
 */
const install = Vue => {
	Vue.directive('goBack', {
		bind: (el) => {
			el.__vueClickOutside__ = () => {
				window.history.back(-1);
			};
			el.addEventListener('click', el.__vueClickOutside__, false);
		},
		unbind: (el) => {
			el.removeEventListener('click', el.__vueClickOutside__, false);
			delete el.__vueClickOutside__;
		}
	});
};

export default install;