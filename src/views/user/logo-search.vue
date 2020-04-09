<template>
    <div class='logo-search'>
        <img alt="logo" src="../../assets/logo.jpg" class="logo-img"/>
        <Input class="search-input" search enter-button placeholder="请输入文字关键字" v-model="searchInfo"
               @on-search="onSearch"/>
    </div>
</template>

<script>
    import {GetMenuArticle} from '../../api/web'
    export default {
        name: "logo-search",
        props: {},
        components: {},
        data() {
            return {
                searchInfo: ''
            }
        },
        computed: {},
        watch: {},
        methods: {
            onSearch() {
                if (!this.searchInfo) return;
                GetMenuArticle().then(res=>{
                    if(res.status){
                        // this.$router.push({
                        //     name: "SEARCH",
                        //     params: {
                        //         item:
                        //         searchInfo: this.searchInfo
                        //     }
                        // });
                        window.console.log(res,'ssssss')
                    }
                })
                // this.$router.push({
                //     name: "SEARCH",
                //     query: {
                //         searchInfo: this.searchInfo
                //     }
                // });
            }
        }
    }
</script>

<style lang='less' scoped>
    .logo-search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-height: 100px;
        line-height: 100px;
        max-width: 1200px;
        margin: 0 auto;

        .logo-img {
            width: 50vw;
            max-width: 340px;
            object-fit: cover;
        }

        .search-input {
            width: 200px;
            margin-right: 5px;
        }
    }
</style>