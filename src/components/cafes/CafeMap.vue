<template>
    <div id="cafe-map-container">
        <div id="cafe-map">

        </div>
        <cafe-map-filter></cafe-map-filter>
    </div>
</template>

<script>
    import {CONFIG} from "../../config";
    import CafeMapFilter from "./CafeMapFilter"
    import {EventBus} from "../../event-bus";
    import {CafeIsRoasterFilter} from "../../mixins/filters/CafeIsRoasterFilter";
    import {CafeBrewMethodsFilter} from "../../mixins/filters/CafeBrewMethodFilter";
    import {CafeTextFilter} from "../../mixins/filters/CafeTextFilter";


    export default {
        name: "CafeMap",
        components: {
            CafeMapFilter,
        },
        mixins: [
            CafeIsRoasterFilter,
            CafeBrewMethodsFilter,
            CafeTextFilter
        ],
        props: {
            latitude: {
                type: Number,
                default: 120.21
            },
            longitude: {
                type: Number,
                default: 30.29
            },
            zoom: {
                type: Number,
                default: 5
            }
        },
        data(){
            return {
                map: null,
                markers: [],
                infoWindows: []
            }
        },
        mounted() {
            this.map = new AMap.Map('cafe-map', {
                // center: [this.latitude, this.longitude],
                zoom: this.zoom
            })
            // 清除并重构点标记
            this.clearMarkers()
            this.buildMarkers()

            // 监听 filters-updated 时间过滤点标记
            EventBus.$on('filters-updated', function (filters){
                console.log('------------------------')
                this.processFilters(filters)
            }.bind(this))
        },
        computed: {
            cafes() {
                return this.$store.getters.getCafes;
            }
        },
        methods: {
            buildMarkers() {
                this.markers = []

                // 自定义点标记
                var image = CONFIG.APP_URL + 'public/img/coffee-marker.png';
                var icon = new AMap.Icon({
                    image: image,
                    imageSize: new AMap.Size(19, 33)
                })

                let infoWindow = new AMap.InfoWindow();
                for (var i = 0; i < this.cafes.length; i++) {
                    // console.log('lat lng')
                    console.log(this.cafes[i].latitude, this.cafes[i].longitude)

                    let marker = new AMap.Marker({
                        position: AMap.LngLat(parseFloat(this.cafes[i].longitude), parseFloat(this.cafes[i].latitude)),
                        title: this.cafes[i].location_name,
                        icon: icon,
                        extData: {
                            'cafe': this.cafes[i]
                        }
                    })

                    // 自定义信息窗体
                    let contentString = '<div class="cafe-info-window">' +
                        '<div class="cafe-name">' + this.cafes[i].name + this.cafes[i].location_name + '</div>' +
                        '<div class="cafe-address">' +
                        '<span class="street">' + this.cafes[i].address + '</span>' +
                        '<span class="city">' + this.cafes[i].city + '</span> ' +
                        '<span class="state">' + this.cafes[i].state + '</span>' +
                        '<span class="zip">' + this.cafes[i].zip + '</span>' +
                        '<a href="/#/cafes/' + this.cafes[i].id + '">Visit</a>' +
                        '</div>' +
                        '</div>';

                    marker.content = contentString;

                    this.infoWindows.push(infoWindow);

                    marker.on('click', mapEvent => {
                        infoWindow.setContent(mapEvent.target.content);
                        infoWindow.open(marker.getMap(), marker.getPosition())
                    })
                    console.debug(marker);
                    this.markers.push(marker);
                }

                console.debug(this.markers);

                this.map.add(this.markers);
            },
            clearMarkers() {
                this.markers.forEach((item, index) => {
                    this.markers[index].setMap(null)
                })
            },
            processFilters(filters) {
                for (let i = 0; i < this.markers.length; i++){
                    if(filters.text === '' &&
                            filters.roaster === false &&
                            filters.brew_methods.length === 0
                    ){
                        this.markers[i].setMap(this.map);
                    }else{
                        let textPassed = false;
                        let brewMethodsPassed = false;
                        let roasterPassed = false;

                        if(filters.roaster && this.processCafeIsRoasterFilter(this.markers[i].getExtData().cafe)){
                            roasterPassed = true;
                        }else if(!filters.roaster) {
                            roasterPassed = true;
                        }

                        if(filters.text !== '' && this.processCafeTextFilter(this.marker[i].getExtData().cafe, filters.text)) {
                            textPassed = true;
                        }else if(filters.text === ''){
                            textPassed = true;
                        }

                        if(filters.brew_methods.length !== 0 && this.processCafeBrewMethodsFilter(this.markers[i].getExtData().cafe, filters.brew_methods)){
                            brewMethodsPassed = true;
                        }else if(filters.brew_methods.length === 0){
                            brewMethodsPassed = true;
                        }


                        if(roasterPassed && textPassed && brewMethodsPassed){
                            this.markers[i].setMap(this.map)
                        }else{
                            this.markers[i].setMap(null)
                        }
                    }
                }
            }
        },
        watch:{
            cafes() {
                this.clearMarkers()
                this.buildMarkers()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/sass/abstracts/_variables.scss';

    div#cafe-map-container {
        position: absolute;
        top: 50px;
        left: 0px;
        right: 0px;
        bottom: 50px;

        div#cafe-map {
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
        }

        div.cafe-info-window {
            div.cafe-name {
                display: block;
                text-align: center;
                color: $dark-color;
                font-family: 'Josefin Sans', sans-serif;
            }
            div.cafe-address {
                display: block;
                text-align: center;
                margin-top: 5px;
                color: $grey;
                font-family: 'Lato', sans-serif;
                span.street {
                    font-size: 14px;
                    display: block;
                }
                span.city {
                    font-size: 12px;
                }
                span.state {
                    font-size: 12px;
                }
                span.zip {
                    font-size: 12px;
                    display: block;
                }
                a {
                    color: $secondary-color;
                    font-weight: bold;
                }
            }
        }
    }
</style>