<template>
    <div id="cafe-map">

    </div>
</template>

<script>
    import {CONFIG} from "../../config";

    export default {
        name: "CafeMap",
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
                default: 4
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
                center: [this.latitude, this.longitude],
                zoom: this.zoom
            })
            // 清除并重构点标记
            this.clearMarkers()
            this.buildMarkers()
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

                this.cafes.forEach((item) => {
                    console.log('lat lng')
                    console.log(item.latitude)
                    console.log(item.longtitude)

                    let marker = new AMap.Marker({
                        position: AMap.LngLat(parseFloat(item.latitude), parseFloat(item.longtitude)),
                        title: item.name,
                        icon: icon,
                    })

                    let infoWindow = new AMap.InfoWindow({
                        content: item.name
                    })

                    this.infoWindows.push(infoWindow);

                    marker.on('click', () => {
                        infoWindow.open(marker.getMap(), marker.getPosition())
                    })

                    this.markers.push(marker);
                })

                this.map.add(this.markers);
            },
            clearMarkers() {
                this.markers.forEach((item, index) => {
                    this.markers[index].setMap(null)
                })
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
    div#cafe-map{
        width: 100%;
        height: 400px;
    }
</style>