/**
* author: duxin
* date: 2019/10/30
* describe: 文字显示组件
*/

<template>
    <span :class="classes" @click="onClick"><slot></slot></span>
</template>

<script>
    function oneOf(value, validList) {
        for (let i = 0; i < validList.length; i++) {
            if (value === validList[i]) {
                return true;
            }
        }
        return false;
    }

    export default {
        props: {
            size: {
                validator(value) {
                    return oneOf(value, ['big', 'title', "default", 'small']);
                },
                default: "default"
            },
            color: {
                validator(value) {
                    return oneOf(value, ['primary', 'dark', 'white',"light"]);
                },
                default: "dark"
            }
        },
        computed: {
            classes() {
                return `font-size-${this.size} font-color-${this.color} font`
            }
        },
        methods: {
            onClick(ev) {
                this.$emit("click",ev)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../custom.less";

    @prefix-size: font-size-;
    @prefix-color: font-color-;
    .font {
        display: inline-block;
    }

    .@{prefix-size} {
        &big {
            font-size: 18px;
            font-weight: 600;
        }

        &title {
            font-size: 16px;
        }

        &default {
            font-size: 14px;
        }

        &small {
            font-size: 12px;
        }
    }

    .@{prefix-color} {
        &primary {
            color: @primary-color;
        }

        &dark {
            color: @content-dark-color;
        }

        &white {
            color: white;
        }

        &light{
            color: @nav-default-color;
        }
    }

</style>