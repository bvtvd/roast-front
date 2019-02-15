<template>
    <div class="page">
        <form>
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
                    <div class="large-12 medium-12 small-12 cell">
                        <label>名称
                            <input type="text" placeholder="咖啡店名" v-model="name">
                        </label>
                        <span class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}</span>
                    </div>
                    <div class="large-12 medium-12 small-12 cell">
                        <label>网址
                            <input type="text" placeholder="网址" v-model="website">
                        </label>
                        <span class="validation" v-show="!validations.website.is_valid">{{ validations.website.text }}</span>
                    </div>
                    <div class="large-12 medium-12 small-12 cell">
                        <label>简介
                            <input type="text" placeholder="简介" v-model="description">
                        </label>
                    </div>
                    <div class="grid-x grid-padding-x" v-for="(location, key) in locations">
                        <div class="large-12 medium-12 small-12 cell">
                            <h3>位置</h3>
                        </div>
                        <div class="large-6 medium-6 small-12 cell">
                            <label>位置名称
                                <input type="text" placeholder="位置名称" v-model="locations[key].name">
                            </label>
                        </div>
                        <div class="large-6 medium-6 small-12 cell">
                            <label>详细地址
                                <input type="text" placeholder="详细地址" v-model="locations[key].address">
                            </label>
                            <span class="validation" v-show="!validations.locations[key].address.is_valid">{{ validations.locations[key].address.text }}</span>
                        </div>
                        <div class="large-6 medium-6 small-12 cell">
                            <label>城市
                                <input type="text" placeholder="城市" v-model="locations[key].city">
                            </label>
                            <span class="validation" v-show="!validations.locations[key].city.is_valid">{{ validations.locations[key].city.text }}</span>
                        </div>
                        <div class="large-6 medium-6 small-12 cell">
                            <label>省份
                                <input type="text" placeholder="省份" v-model="locations[key].state">
                            </label>
                            <span class="validation" v-show="!validations.locations[key].state.is_valid">{{ validations.locations[key].state.text }}</span>
                        </div>
                        <div class="large-6 medium-6 small-12 cell">
                            <label>邮编
                                <input type="text" placeholder="邮编" v-model="locations[key].zip">
                            </label>
                            <span class="validation" v-show="!validations.locations[key].zip.is_valid">{{ validations.locations[key].zip.text }}</span>
                        </div>
                        <div class="large-12 medium-12 small-12 cell">
                            <label>支持冲泡的方法</label>
                            <span class="brew-method" v-for="brewMethod in brewMethods">
                                <input :id="'brew-method-'+ brewMethod.id + '-' + key" type="checkbox" :value="brewMethod.id" v-model="locations[key].methodsAvailable">
                                <label :for="'brew-method-'+ brewMethod.id + '-' + key">{{ brewMethod.method }}</label>
                            </span>
                        </div>
                        <div class="large-12 medium-12 small-12 cell">
                            <tags-input :unique="key"></tags-input>
                        </div>
                        <div class="large-12 medium-12 small-12 cell">
                            <a class="button" @click="removeLocation(key)">移除位置</a>
                        </div>
                    </div>
                    <div class="grid-x grid-padding-x">
                        <div class="large-12 medium-12 small-12 cell">
                            <a class="button" @click="addLocation">新增位置</a>
                        </div>
                        <div class="large-12 medium-12 small-12 cell">
                            <a class="button" @click="submitNewCafe">提交</a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import TagsInput from '../components/global/forms/TagsInput'
    import {EventBus} from "../event-bus";

    export default {
        name: "NewCafe",
        components: {
            TagsInput,
        },
        data() {
            return {
                name: "",
                locations: [],
                website: '',
                description: '',
                roaster: false,
                validations: {
                    name: {
                        is_valid: true,
                        text: ''
                    },
                    locations: [],
                    oneLocation: {
                        is_valid: true,
                        text: ''
                    },
                    website: {
                        is_valid: true,
                        text: ''
                    }
                }
            }
        },
        computed: {
            brewMethods() {
                return this.$store.getters.getBrewMethods;
            },
            addCafeStatus() {
                return this.$store.getters.getCafeAddStatus
            }
        },
        created() {
            this.addLocation()
        },
        mounted() {
            EventBus.$on('tags-edited', function(tagsAdd){
                this.locations[tagsAdd.unique].tags = tagsAdd.tags;
            }.bind(this))
        },
        methods: {
            /**
             * 表单验证
             * @returns {boolean}
             */
            validateNewCafe(){
                let validateNewCafeForm = true;

                // 手写验证是麻烦
                if (this.name.trim() === ''){
                    validateNewCafeForm = false;
                    this.validations.name.is_valid = false;
                    this.validations.name.text = '请输入咖啡店的名字';
                }else{
                    this.validations.name.is_valid = true;
                    this.validations.name.text = '';
                }

                // 验证网址是否是有效信息
                if(this.website.trim() !== '' && !this.website.match(/^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/)){
                    validateNewCafeForm = false;
                    this.validations.website.is_valid = false;
                    this.validations.website.text = '请输入咖啡店网址';
                }else{
                    this.validations.website.is_valid = true;
                    this.validations.website.text = '';
                }

                // 验证位置相关数据
                for(var index in this.locations){
                    if(this.locations.hasOwnProperty(index)){


                        if(this.locations[index].address.trim() === ''){
                            validateNewCafeForm = false;
                            this.validations.locations[index].address.is_valid = false;
                            this.validations.locations[index].address.text = '请输入地址信息';
                        }else{
                            this.validations.locations[index].address.is_valid = true;
                            this.validations.locations[index].address.text = '';
                        }

                        if(this.locations[index].city.trim() === ''){
                            validateNewCafeForm = false;
                            this.validations.locations[index].city.is_valid = false;
                            this.validations.locations[index].city.text = '请输入城市';
                        }else{
                            this.validations.locations[index].city.is_valid = true;
                            this.validations.locations[index].city.text = '';
                        }

                        if(this.locations[index].state.trim() === ''){
                            validateNewCafeForm = false;
                            this.validations.locations[index].state.is_valid = false;
                            this.validations.locations[index].state.text = '请输入省份';
                        }else{
                            this.validations.locations[index].state.is_valid = true;
                            this.validations.locations[index].state.text = '';
                        }

                        if(this.locations[index].zip.trim() === '' || !this.locations[index].zip.match(/(^\d{6}$)/)){
                            validateNewCafeForm = false;
                            this.validations.locations[index].zip.is_valid = false;
                            this.validations.locations[index].zip.text = '请输入邮编';
                        }else{
                            this.validations.locations[index].zip.is_valid = true;
                            this.validations.locations[index].zip.text = '';
                        }
                    }
                }

                return validateNewCafeForm;
            },
            /**
             * 提交表单
             */
            submitNewCafe() {

                if(this.validateNewCafe()){
                    this.$store.dispatch('addCafe', {
                        name: this.name,
                        locations: this.locations,
                        website: this.website,
                        description: this.description,
                        roaster: this.roaster
                    })
                }

            },
            addLocation(){
                this.locations.push({
                    name: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                    methodsAvailable: [],
                    tags: []
                })

                this.validations.locations.push({
                    address: {
                        is_valid: true,
                        text: ''
                    },
                    city: {
                        is_valid: true,
                        text: ''
                    },
                    state: {
                        is_valid: true,
                        text: ''
                    },
                    zip: {
                        is_valid: true,
                        text: ''
                    }
                })
            },
            removeLocation(key){
                this.locations.splice(key, 1);
                this.validations.locations.splice(key, 1);
            },
            clearForm() {
                this.name = '';
                this.locations = []
                this.website = ''
                this.description = ''
                this.roaster = false;
                this.validations = {
                    name: {
                        is_valid: true,
                        text: ''
                    },
                    locations: [],
                    oneLocation: {
                        is_valid: true,
                        text: ''
                    },
                    website: {
                        is_valid: true,
                        text: ''
                    }
                }

                this.addLocation()
                EventBus.$emit('clear-tags')
            }
        },
        watch: {
            addCafeStatus: function() {
                if(this.addCafeStatus === 2){
                    this.clearForm()
                    $('#cafe-added-successfully').show().delay(5000).fadeOut();
                }
                if(this.addCafeStatus === 3) {
                    $('#cafe-added-unsuccessfully').show().delay(5000).fadeOut();
                }
            }
        }
    }
</script>

<style scoped>

</style>