<template>
    <div class=''>
        <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
            <div class="footer-content">
                <Form ref="infoFrom" :model="infoFrom" :rules="infoRules" :label-width="80"
                      class="from-content">
                    <FormItem label="公司名" prop="projectName">
                        <Input v-model="infoFrom.projectName" placeholder="请输入公司名" :maxlength="15" class="input"/>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="infoFrom.email" placeholder="请输入邮箱" type="email" class="input"/>
                    </FormItem>
                    <FormItem label="电话" prop="projectPhone">
                        <Input v-model="infoFrom.projectPhone" placeholder="请输入电话" class="input"/>
                    </FormItem>
                    <FormItem label="地址" prop="address">
                        <Input v-model="infoFrom.address" placeholder="请输入地址" type="textarea" :maxlength="500"
                               class="input"
                               :autosize="{minRows: 2,maxRows: 10}"/>
                    </FormItem>
                    <FormItem label=" ">
                        <Form ref="infoFrom" :model="infoFrom" :label-width="80" class="people-list">
                            <template v-for="(item,index) in infoFrom.people">
                                <FormItem label="联系人" :key="index">
                                    <Input v-model="item.userName" placeholder="请输入姓名" class="input"/>
                                    <Input v-model="item.userPhone" placeholder="请输入姓名" class="input"/>
                                </FormItem>
                            </template>
                        </Form>
                    </FormItem>
                    <FormItem label="二维码" prop="projectPhone">
                        <AdminUpload :defaultList="[infoFrom.picSrc]" footTitle="图片尺寸 150*210"></AdminUpload>
                    </FormItem>
                </Form>
            </div>
        </AdminModal>
    </div>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'
    import AdminUpload from '../../components/admin-upload'

    export default {
        name: "home-footer",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "新建"
            },
        },
        components: {AdminModal, AdminUpload},
        data() {
            return {
                showModal: this.value,
                infoFrom: {
                    projectName: '',
                    email: '',
                    projectPhone: '',
                    address: '',
                    people: [
                        {
                            userName: '',
                            userPhone: ''
                        },
                        {
                            userName: '',
                            userPhone: ''
                        },
                        {
                            userName: '',
                            userPhone: ''
                        },
                        {
                            userName: '',
                            userPhone: ''
                        }
                    ]
                },
                infoRules: {
                    projectName: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    projectPhone: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                }
            }
        },
//监听属性 类似于data概念
        computed: {},
//监控data中的数据变化
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
            },
            value(newV) {
                this.showModal = newV;
            },
        },
//方法集合
        methods: {
            onSave() {
                window.console.log('footer 请求接口')
                this.showModal = false;
                this.$emit('upload-footer')
            }
        },
//生命周期 - 创建之前
        beforeCreate() {
        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {
        },
//生命周期 - 挂载之前
        beforeMount() {
        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
        },
//生命周期 - 更新之前
        beforeUpdate() {
        },
        //生命周期 - 更新之后
        updated() {
        },
//生命周期 - 销毁之前
        beforeDestroy() {
        },
        //生命周期 - 销毁完成
        destroyed() {
        },
//如果页面有keep-alive缓存功能，这个函数会触发
        activated() {
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../../styles/mixin";

    .footer-content {
        .modalContent();

        .from-content {
            margin-left: 20%;
        }

        /deep/ .ivu-form-item-content {
            margin-left: 0 !important;
        }

        .people-list {
            /deep/ .ivu-form-item {
                margin-bottom: 24px;
            }

            /deep/ .ivu-form-item:nth-child(1) {
                .ivu-form-item-label {
                    margin-left: -79px;
                }
            }
        }
    }
</style>