/**
 *  作者：yeshengqiang
 *  时间：2017-06-04
 *  描述：混合类
 */

export default {
    data () {
        return {
            list: [], // 列表展示
            searchData: { // 搜索条件
                pageNo: this.$store.state.pageNo, // 当前页码
                pageSize: this.$store.state.pageSize // 分页大小
            }
        };
    },
    mounted () {
        this.$nextTick(() => {
            this.$refs.scroller.reset({top: 0});
        });
        this.loadMore();
    },
    methods: {
        // 下拉加载
        async loadMore () {
            try {
                this.searchData.pageNo = parseInt(this.list.length / this.searchData.pageSize) + 1;
                if (this.searchData.pageNo === 1) {
                    this.$nextTick(() => {
                        this.$refs.scroller && this.$refs.scroller.reset({top: 0});
                    });
                }
                this.$indicator.open();
                const result = await this._getList();
                this.$indicator.close();
                if (!result) {
                    this.$refs.scroller && this.$refs.scroller.disablePullup();
                    return;
                }
                if (result.currentPage >= result.totalPage) {
                    this.$refs.scroller && this.$refs.scroller.disablePullup();
                } else {
                    this.$refs.scroller && this.$refs.scroller.enablePullup();
                }
                this.searchData.pageNo = result.currentPage || 1; // 数据为空时 currentPage 为 0
                this.list = this.list.concat(result.dataList);
                this.$refs.scroller && this.$refs.scroller.donePullup();
            } catch (e) {
                this.$indicator.close();
                this.$toast({
                    message: e.message,
                    position: 'bottom'
                });
            }
        },
        // 刷新
        async refresh () {
            try {
                let pageNo = this.searchData.pageNo + 1;
                let i = 1;
                let tempList = [];
                while (i < pageNo) {
                    this.searchData.pageNo = i++;
                    const result = await this._getList();
                    tempList = tempList.concat(result.dataList);
                }
                this.list = tempList;
                this.$refs.scroller && this.$refs.scroller.donePulldown();
            } catch (e) {
                this.$toast({
                    message: e.message,
                    position: 'bottom'
                });
            }
        },
        reset () {
            this.list = [];
            this.searchData = {
                pageNo: this.$store.state.pageNo, // 当前页码
                pageSize: this.$store.state.pageSize // 分页大小
            };
        }
    }
};
