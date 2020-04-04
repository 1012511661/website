/**
* author: duxin
* date: 2019/11/6
* describe:
*/

<template>
    <div class="tabs-wrap">
        <span :class="leftClass" @click="onLeftClick">{{tabs[0]}}</span>
        <span :class="rightClass" @click="onRightClick">{{tabs[1]}}</span>
    </div>
</template>

<script>
    export default {
        name: "scc-tabs",
        props: {
            tabs: {
                type: Array,
                default: () => {
                    return ["", ""]
                }
            },
            current: Number
        },
        data() {
            return {
                currentTabs: this.current
            }
        },
        computed: {
            leftClass() {
                return `tab left ${this.currentTabs === 0 ? "active" : ""}`
            },
            rightClass() {
                return `tab right ${this.currentTabs === 0 ? "" : "active"}`
            }
        },
        methods: {
            onLeftClick() {
                this.currentTabs = 0;
                this.$emit("on-change", 0)
            },
            onRightClick() {
                this.currentTabs = 1;
                this.$emit("on-change", 1)
            },
        },
        watch: {
            current(n,o){
                this.currentTabs = n
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../styles/custom.less";
    @import "../../../styles/mixin.less";

    @tab-border-size: 4px;
    .tabs-wrap {
        display: flex;

        .tab {
            width: 120px;
            height: 32px;
            border: 1px solid #E1E4E5;
            color: @content-dark-color;
            font-weight: bold;
            .center();
            cursor: pointer;
        }

        .left {
            border-top-left-radius: @tab-border-size;
            border-bottom-left-radius: @tab-border-size;
        }

        .right {
            border-top-right-radius: @tab-border-size;
            border-bottom-right-radius: @tab-border-size;
        }

        .active {
            border-color: @primary-color;
            color: @primary-color;
        }
    }
</style>