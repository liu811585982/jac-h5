/**
 * 作者：yeshengqiang
 * 时间：2018-03-23
 * 描述：plusBack.js  物理按键返回
 */
 import { plusready } from '@/libs/plus';

 export default {
    bind (el, _, { context }) {
        plusready((plus) => {
            let first = null;
            el.__vueClickOutside__ = () => {
                let root = false;
				let hash = context.$route.path;
                let plusBackList = context.$store.state.plusBackList;
				for (let i = 0; i < plusBackList.length; i++) {
					let src = `/${plusBackList[i]}`;
					if (src.toLowerCase() === hash) {
						root = true;
						break;
					}
                }
                if (root) {
                    if (!first) {
                        first = new Date().getTime();
                        plus.nativeUI.toast('再按一次退出应用');
                        setTimeout(function () {
                            first = null;
                        }, 1000);
                    } else {
                        plus.nativeUI.toast('退出');
                        if (new Date().getTime() - first < 1000) {
                            plus.runtime.quit();
                        }
                    }
				} else {
					window.history.back(-1);
				}
            };
            plus.key.addEventListener('backbutton', el.__vueClickOutside__, false);
        });
    },
    unbind (el) {
        plusready((plus) => {
            plus.key.removeEventListener('backbutton', el.__vueClickOutside__, false);
            delete el.__vueClickOutside__;
        });
    }
 };