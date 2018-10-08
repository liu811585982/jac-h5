/**
 * 作者：yeshengqiang
 * 时间：2018-03-20
 * 描述：userInfo.js
 */
 import { mapState, mapActions } from 'vuex';

 export default {
    computed: mapState([
        'userInfo'
    ]),
    mounted () {
        if (!this.userInfo.id) {
            this.getUserInfo();
        }
    },
    methods: {
        ...mapActions([
            'getUserInfo'
        ])
    }
 };
