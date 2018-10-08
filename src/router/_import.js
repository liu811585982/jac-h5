/**
 * 作者：yeshengqiang
 * 时间：2018-04-28
 * 描述：_import.js
 */

 const _import = (file) => {
    return process.env.NODE_ENV === 'production'
                    ? () => import('@/page/' + file + '.vue')
                    // ? require('@/page/' + file + '.vue').default
                    : require('@/page/' + file + '.vue').default;
 };

 export default _import;
