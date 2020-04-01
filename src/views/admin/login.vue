<template>
    <div class='login'>
        <div class="login-center">
            <!--左边图片-->
            <img class="login-l-img" src="../../assets/login_bg.jpg">
            <!--右边登录-->
            <div class="login-r-div">
                <h1>登录</h1>
                <br/>
                <br/>
                <Form ref="loginForm" :model="loginForm" :rules="loginRule">
                    <FormItem label="账号" prop="email">
                        <Input v-model.trim="loginForm.email" class="input"/>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input type="password" v-model="loginForm.password" class="input"/>
                    </FormItem>
                </Form>
                <div>
                    <Button @click="onLogin" class="login-bnt" type="primary">登录</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {TOKEN} from "../../js/storage";

    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    email: "",
                    password: ""
                },
                loginRule: {
                    email: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            onLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        let _math = Math.random() * 10;
                        TOKEN.set(_math);
                        this.$router.replace("/admin");
                    }
                })
            }
        }
    }
</script>

<style lang='less' scoped>
    @import "../../styles/mixin.less";
    @import "../../styles/custom.less";

    .login {
        .center();
        height: 100vh;
        position: relative;
    }

    .login-center {
        border-radius: 2px;
        background-color: beige;
        width: 760px;
        height: 460px;
        display: flex;
        overflow: hidden;

        .login-l-img {
            width: 50%;
        }

        .login-r-div {
            flex: 1;
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 60px;

            .input {
                width: 270px;
            }

            .login-footer {
                display: flex;
                justify-content: space-around;
                width: 100%;
                margin-top: 35px;

                .login-language {
                    cursor: pointer;
                }
            }
        }

        .forget-pwd {
            font-size: 14px;
            margin-left: 10px;
            cursor: pointer;
        }

        .auth-code {
            position: relative;

            .verify {
                position: absolute;
                margin: auto;
                font-size: 12px;
                right: 5px;
                bottom: 0;
                cursor: pointer;
            }
        }

        .login-bnt {
            width: 110px;
        }
    }
</style>