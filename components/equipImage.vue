<template>
  <section class="equipImages" id="equipImages">
                    <header class='title' id='jump3'>设备实拍</header>
                    <div class="equipImageList equipImageMaxHeight">
                        <div class="listOne" v-for="item in listData" :key="'listone_'+item.id">
                            <div class="subtitle" v-if="item.photoImgDesc">{{item.photoImgDesc}}</div>
                            <div class="list">
                                <img :src="item.imgPathDto.pathBig" />
                            </div>
                        </div>
                        <div class="showMoerPic">查看更多
                            <i class="icon-uniE6FD"></i>
                        </div>
                    </div>
            </section>
</template>

<script>
export default {
    name: 'equipImage',
    props:{
        listData: Array,
    },
  components: {},
  data(){
    return {
      a:'abc'
    }
  }
}
</script>

<style>

.equipImages {
    background: #FFFFFF;
    margin-top: 0.53333rem;
    position: relative;
    /* margin-bottom: 2rem; */
}
 .equipImages .equipImageList.equipImageMaxHeight {
    max-height: 48rem;
}
 .equipImages .equipImageList {
    padding: 0 0.53333rem 2.66667rem;
    overflow-y: hidden;
}
.showMoerPic {
    height: 2.66667rem;
    font-size: 0.69333rem;
    line-height: 2.66667rem;
    color: #486CDC;
    width: 100%;
    text-align: center;
    clear: both;
    position: absolute;
    bottom: 0;
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.5), white 60%, white);
}
.showMoerPic i {
    font-size: 0.69333rem;
    padding-left: 0.26667rem;
}
</style>