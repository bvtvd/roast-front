<template>
    <nav class="top-navigation">
        <router-link :to="{name: 'home'}">
            <span class="logo">Roast</span>
        </router-link>

        <ul class="links">
            <li>
                <router-link :to="{name: 'cafes'}">
                    Cafes
                </router-link>
            </li>
        </ul>

        <div class="right">
            <img class="avatar" :src="user.avatar" v-show="userLoadStatus === 2" v-if="user != '' && userLoadStatus === 2">

            <span class="logout" v-if="user != '' && userLoadStatus === 2" @click="logout()">退出</span>

            <span class="login" v-if="user == ''" @click="login()">登录</span>
        </div>
    </nav>
</template>

<script>
    import {EventBus} from "../../event-bus";

    export default {
        computed: {
            userLoadStatus(){
                return 0;
                return this.$store.getters.getUserLoadStatus;
            },
            user(){
                return this.$store.getters.getUser;
            }
        },
        methods: {
            login() {
                EventBus.$emit('prompt-login');
            },
            logout() {
                this.$store.dispatch('logoutUser');
                window.location = '/logout';
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/sass/abstracts/_variables.scss';

    nav.top-navigation{
        background-color: $white;
        height: 50px;
        border-bottom: 2px solid $dark-color;

        span.logo{
            border-right: 1px solid $dark-color;
            display: block;
            float: left;
            height: 50px;
            line-height: 50px;
            padding: 0px 20px 0px 20px;
            font-family: 'Josefin Sans', sans-serif;
            font-weight: bold;
            color: $dark-color;

            &:hover{
                color: white;
                background-color: $dark-color;
            }
        }

        ul.links{
            display: block;
            float: left;

            li{
                display: inline-block;
                list-style-type: none;
                line-height: 50px;

                a{
                    font-family: 'Lato', sans-serif;
                    font-weight: bold;
                    color: $black;

                    &:hover{
                        color: $dark-color;
                    }
                }
            }
        }

        div.right{
            float: right;

            img.avatar{
                width: 40px;
                height: 40px;
                border-radius: 40px;
                margin-top: 5px;
                margin-right: 10px;
            }
            &:after {
                content: "";
                display: table;
                clear: both;
            }
            span.login {
                font-family: "Lato", sans-serif;
                font-size: 16px;
                text-transform: uppercase;
                color: black;
                font-weight: bold;
                float: right;
                margin-top: 27px;
                margin-right: 15px;
                cursor: pointer;
            }
        }

    }
</style>