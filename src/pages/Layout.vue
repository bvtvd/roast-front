<template>
    <div id="app-layout">
        <navigation></navigation>
        <router-view></router-view>
        <login-modal></login-modal>
    </div>
</template>

<script>
    import Navigation from '../components/global/Navigation';
    import LoginModal from '../components/global/LoginModal'

    export default {
        components: {
            Navigation,
            LoginModal
        },
        created(){
            this.$store.dispatch('loadCafes');
            this.$store.dispatch('loadBrewMethods');
        }
    }
</script>

<style lang="scss" scoped>

    div#app-layout {
        div.show-filters {
            height: 90px;
            width: 23px;
            position: absolute;
            left: 0px;
            background-color: white;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            line-height: 90px;
            top: 50%;
            cursor: pointer;
            margin-top: -45px;
            z-index: 9;
            text-align: center;
        }
    }
</style>