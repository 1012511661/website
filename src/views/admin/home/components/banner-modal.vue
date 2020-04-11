<template>
    <AdminModal v-model="showModal" title="添加轮播图" @on-ok="onSave">
        <AdminUpload :multiple="true" :defaultList="[...srcList]" :widthImg="400" :heightImg="80"
                     footTitle="图片尺寸 1920*400" ref="AdminUpload" class="upload-banner"></AdminUpload>
    </AdminModal>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'
    import AdminUpload from '../../components/admin-upload'
    import {PostMenuImport} from "../../../../api/web";

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
                srcList: []
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (newV) {
                    this.srcList = this.defaultList;
                    window.console.log(this.defaultList, 'defaultList')
                }
            },
            value(newV) {
                this.showModal = newV;
            },
        },
        methods: {
            onSave() {
                let _arr = this.$refs.AdminUpload.fileArr;
                var formData = new FormData();
                formData.append('menuId', 'HOME');
                for (var i = 0; i < _arr.length; i++) {
                    formData.append(`files`, _arr[i]); // 文件对象
                }
                PostMenuImport(formData).then(res => {
                    if (res.status) {
                        this.$Notice.success({title: '成功', desc: '上传图片成功'})
                        this.showModal = false;
                        this.$emit('upload-order-list');
                    } else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            },

        },
        mounted() {
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../../styles/mixin";
    .upload-banner {
        .modalContent()
    }
</style>