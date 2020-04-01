<template>
    <div class='banner-modal'>
        <AdminModal v-model="showModal" title="添加轮播图" @on-ok="onSave">
            <AdminUpload :multiple="true" :defaultList="defaultList" footTitle="图片尺寸 1920*400"></AdminUpload>
        </AdminModal>
    </div>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'
    import AdminUpload from '../../components/admin-upload'

    export default {
        name: "home-banner",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            defaultList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        components: {AdminModal, AdminUpload},
        data() {
            return {
                showModal: this.value,
                formInfo: {},
                uploadList: [ //上传返回的列表
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    }, {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    },
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    },
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    },

                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    }
                ],
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
            },
            value(newV) {
                this.showModal = newV;
            },
        },
        methods: {
            onSave() {
                this.showModal = false;
                this.$emit('upload-order-list');
                window.console.log('请求数据')
            },

        },
        mounted() {
        }
    }
</script>

<style lang='less' scoped>

</style>