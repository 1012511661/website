/*
* @Author: yongwenhao
* @Date: 2020/03/22 10:11:46
* @instraction: 添加，编辑弹框
*/
<template>
    <Modal v-model="showModal" :mask-closable="false" :width="width">
        <p slot="header" class="title">{{title}}</p>
        <slot></slot>
        <div slot="footer">
            <Button @click="cancelModal">取消</Button>
            <Button type="primary" @click="saveModal">保存</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "admin-modal",
        props: {
            width: {
                type: String,
                default: '740'
            },
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                showModal: this.value,
            }
        },
        methods: {
            cancelModal() {
                this.showModal = false;
                this.$emit('on-cancel')
            },
            saveModal() {
                this.$emit('on-ok')
            }
        },
        watch: {
            value(n, o) {
                this.showModal = n;
            },
            showModal(n, o) {
                this.$emit("input", n)
            }
        }
    }
</script>