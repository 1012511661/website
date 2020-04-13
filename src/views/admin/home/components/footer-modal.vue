<template>
    <div class=''>
        <AdminModal v-model="showModal" title="修改公司信息" @on-ok="onSave">
            <div class="footer-content">
                <AdminTabs class="tabs" :current="activeId"
                           :tabs="['基本信息', '二维码']"
                           @on-change="onClick"></AdminTabs>
                <template v-if="!activeId">
                    <Form ref="infoFrom" :model="infoFrom" :rules="infoRules" :label-width="80"
                          class="from-content">
                        <FormItem label="公司名" prop="companyName">
                            <Input v-model="infoFrom.companyName" placeholder="请输入公司名" :maxlength="15" class="input"/>
                        </FormItem>
                        <FormItem label="邮箱" prop="companyEmail">
                            <Input v-model="infoFrom.companyEmail" placeholder="请输入邮箱" type="email" class="input"/>
                        </FormItem>
                        <FormItem label="电话" prop="companyMobile">
                            <Input v-model="infoFrom.companyMobile" placeholder="请输入电话" class="input"/>
                        </FormItem>
                        <FormItem label="地址" prop="companyAddr">
                            <Input v-model="infoFrom.companyAddr" placeholder="请输入地址" type="textarea" :maxlength="500"
                                   class="input"
                                   :autosize="{minRows: 2,maxRows: 10}"/>
                        </FormItem>
                        <FormItem label="视频地址" prop="companyVideoUrl">
                            <Input v-model="infoFrom.companyVideoUrl" placeholder="请输入电话" class="input"/>
                        </FormItem>
                        <FormItem label=" ">
                            <Form ref="infoFrom" :model="infoFrom" :label-width="80" class="people-list">
                                <template v-for="(item,index) in infoFrom.userPos">
                                    <FormItem label="联系人" :key="index">
                                        <Input v-model="item.userName" placeholder="请输入姓名" class="input"/>
                                        <Input v-model="item.mobile" placeholder="请输入电话" class="input"/>
                                    </FormItem>
                                </template>
                            </Form>
                        </FormItem>
                    </Form>
                </template>
                <template v-else>
                    <AdminUpload :multiple="false" :defaultList="[infoFrom.companyPicture]" :widthImg="150"
                                 :heightImg="210" footTitle="图片尺寸 150*210" ref="AdminUpload"></AdminUpload>
                </template>
            </div>
        </AdminModal>
    </div>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'
    import AdminUpload from '../../components/admin-upload'
    import {PutCompany, PostCompanyImport} from '../../../../api/web'
    import AdminTabs from '../../components/admin-tabs'

    export default {
        name: "home-footer",
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        components: {AdminModal, AdminTabs, AdminUpload},
        data() {
            return {
                showModal: this.value,
                activeId: 0,
                infoFrom: {
                    companyName: '',
                    companyEmail: '',
                    companyMobile: '',
                    companyAddr: '',
                    companyVideoUrl: '',
                    userPos: [
                        {
                            userName: '',
                            mobile: ''
                        },
                        {
                            userName: '',
                            mobile: ''
                        },
                        {
                            userName: '',
                            mobile: ''
                        }
                    ]
                },
                infoRules: {
                    companyName: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    companyEmail: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    companyMobile: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    companyAddr: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    companyVideoUrl: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                }
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
                    this.$refs.infoFrom.resetFields();
                }
            },
            value(newV) {
                this.showModal = newV;
            },
        },
        methods: {
            onClick(index) {
                this.activeId = index;
            },
            onSave() {
                window.console.log(this.activeId, 'this.activeId')
                if (!this.activeId) {
                    this.$refs.infoFrom.validate(valid => {
                        if (valid) {
                            PutCompany(this.infoFrom).then(res => {
                                if (res.status) {
                                    // this.showModal = false;
                                    this.$Notice.success({title: '成功', desc: '基本信息修改成功'})
                                    this.$emit('upload-footer')
                                } else {
                                    this.$Notice.warning({title: '错误', desc: res.msg})
                                }
                            })
                        } else {
                            this.$Notice.warning({title: '错误', desc: '请填写正确信息'})
                        }
                    })
                } else {
                    let _arr = this.$refs.AdminUpload.fileArr;
                    var formData = new FormData();
                    if (_arr.length) {
                        formData.append(`file`, _arr[0]);
                    }
                    formData.append('companyId', this.infoFrom.companyId);
                    PostCompanyImport(formData).then(res => {
                        if (res.status) {
                            // this.showModal = false;
                            this.$Notice.success({title: '成功', desc: '二维码修改成功'})
                            this.$emit('upload-footer')
                        } else {
                            this.$Notice.warning({title: '错误', desc: res.msg})
                        }
                    })
                }

            }
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../../styles/mixin";
    @import "../../../../styles/custom.less";

    .footer-content {
        .modalContent();
        margin-top: 0;

        .tabs-wrap {
            display: flex;
            justify-content: center;

            .tab {
                width: 120px;
                height: 32px;
                border: 1px solid #E1E4E5;
                color: @content-dark-color;
                font-weight: bold;
                .center();
                cursor: pointer;
                margin-bottom: 20px;
            }

            .active {
                border-color: @primary-color;
                color: @primary-color;
            }
        }

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