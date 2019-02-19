<template>
    <div id="login-modal" v-show="show">
        <div class="login-box">
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
                    <div class="large-12 medium-12 small-12 cell">
                        <label>用户名
                            <input type="text" placeholder="用户名" v-model="username">
                        </label>

                    </div>
                    <div class="large-12 medium-12 small-12 cell">
                        <label>密码
                            <input type="text" placeholder="密码" v-model="password">
                        </label>

                    </div>
                    <div class="grid-x grid-padding-x">
                        <div class="large-4 medium-4 small-4 cell">
                            <a class="button" @click="login">登录</a>
                        </div>
                    </div>
                    <div class="grid-x grid-padding-x">
                        <div class="large-4 medium-4 small-4 cell">
                            <a class="button" @click="show = false">取消</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {EventBus} from "../../event-bus";

    export default {
        name: "LoginModal",
        data() {
            return {
                show: false,
                username: '',
                password: '',
            }
        },
        mounted() {
            EventBus.$on('prompt-login', function(){
                this.show = true;
            }.bind(this))
        },
        methods: {
            login() {
                this.$store.dispatch("login", {
                    username: this.username,
                    password: this.password,
                }).then(response => {
                    console.log('then')
                    this.$store.dispatch("loadUser");
                    this.show = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    div#login-modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .6);

        div.login-box {
            max-width: 370px;
            min-width: 320px;
            padding: 0 10px;
            background-color: #fff;
            border: 1px solid #ddd;
            -webkit-box-shadow: 0 1px 3px rgba(50, 50, 50, 0.08);
            box-shadow: 0 1px 3px rgba(50, 50, 50, 0.08);
            -webkit-border-radius: 4px;
            border-radius: 4px;
            font-size: 16px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            a {
                display: block;
                margin: auto;
                width: 230px;
                margin-top: 10px;
                margin-bottom: 10px;
            }
        }
    }
</style>