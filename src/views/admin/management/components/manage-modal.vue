<template>
    <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
        <div class="manage-content">
            <AdminTabs class="tabs" :current="activeId"
                       :tabs="['栏目信息', '栏目图片']"
                       @on-change="onClick"></AdminTabs>
            <div style="margin-top: 20px"></div>
            <template v-if="!activeId">
                <Form ref="manageFrom" :model="manageFrom" :rules="manageRuleValidate" :label-width="80">
                    <FormItem label="栏目名" prop="menuName">
                        <Input v-model="manageFrom.menuName" placeholder="请输入名称" :maxlength="32" class="input"/>
                    </FormItem>
                    <FormItem label="排序" prop="menuNumber">
                        <InputNumber v-model="manageFrom.menuNumber" :max="6" :min="1"/>
                    </FormItem>
                    <FormItem label="是否显示" prop="menuShow">
                        <RadioGroup v-model="manageFrom.menuShow">
                            <Radio :label=1>
                                <span>是</span>
                            </Radio>
                            <Radio :label=0>
                                <span>否</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </template>
            <template v-else>
                <AdminUpload :multiple="false" :defaultList="[manageFrom.menuPicture]" :widthImg="400" :heightImg="185"
                             footTitle="图片尺寸 1920*300" ref="AdminUpload"></AdminUpload>
            </template>
        </div>
    </AdminModal>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'
    import AdminUpload from '../../components/admin-upload'
    import {PutMenuUpdate, PostMenuImport} from '../../../../api/web'
    import AdminTabs from '../../components/admin-tabs'

    export default {
        name: "manage-moadl",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "修改"
            },
            id: {
                type: Number,
                default: 1
            }
        },
        components: {AdminModal, AdminUpload, AdminTabs},
        data() {
            return {
                showModal: this.value,
                activeId: 0,
                manageFrom: {
                    menuName: '',
                    menuNumber: this.len + 1,
                    menuShow: 1,
                    menuPicture: ''
                },
                manageRuleValidate: {
                    menuName: [
                        {required: true, message: '名称不能为空', trigger: 'blur'}
                    ],
                    menuNumber: [
                        {required: true, message: '', trigger: 'blur', type: 'number',},
                    ],
                    menuShow: [
                        {required: true, message: ' ', trigger: 'blur', type: "number"}
                    ],
                },
                uploadList: [ //上传返回的列表
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    }]
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
                    if (!this.activeId) {
                        this.$refs.manageFrom.resetFields()
                        this.manageFrom = {
                            menuName: '',
                            menuNumber: this.len + 1,
                            menuShow: 1
                        }
                    }
                    this.activeId = 0
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
                if (!this.activeId) {
                    this.$refs.manageFrom.validate((valid) => {
                        if (valid) {
                            PutMenuUpdate(this.manageFrom).then(res => {
                                if (res.status) {
                                    this.$Notice.success({title: '成功', desc: '修改信息'})
                                    this.showModal = false;
                                    this.$emit('upload-manage')
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
                    formData.append('menuId', this.manageFrom.menuId);
                    for (var i = 0; i < _arr.length; i++) {
                        formData.append(`files`, _arr[i]); // 文件对象
                    }
                    PostMenuImport(formData).then(res => {
                        if (res.status) {
                            this.$Notice.success({title: '成功', desc: '上传图片成功'})
                            this.showModal = false;
                            this.$emit('upload-manage')
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

    .manage-content {
        .modalContent();

    }
</style>