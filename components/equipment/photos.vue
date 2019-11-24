<template>
  <div class="tj-photos" id="tj-photos-03">
    <div class="comm-title m-t-b">
      <div class="app-p-title">设备实拍</div>
    </div>
    <div class="tj-photo" v-if="images">
      <template v-for="(image, index) in images">
          <img v-lazy="image.imgPathDto.pathMid" :key="'photo-i-'+index" :alt="eqTitle+'-'+image.photoDotDesc+'实拍图-'+image.photoPosition"/>
          <div
            class="tj-photo-"
            :key="'photo-t-'+index"
          >{{image.photoDotDesc?image.photoDotDesc:images[index+1]?images[index+1].photoImgDesc:''}}</div>
        </template>
    </div>
    <div class="tj-photo-more" @click="close()">{{show?'收起':'查看更多'}}</div>
  </div>
</template>
<script>
export default {
  name: "tj-eq-photos",
  props: {
    images: Array,
    eqTitle:String,
    eqId:String,
  },
  computed: {
    
  },
  methods: {
    close() {
      // this.show = !this.show;
      // if(this.show){
      //     this.md(null, '查看更多设备实拍');
      // }
      this.md(null, '查看更多设备实拍');
    },
    md(event, val) {
      this.$emit("md", event, val, ()=>{
        //this.$router.push(`/ue/preview/${this.eqId}`);
        window.location.href = `/ue/preview/${this.eqId}`;
      });
    },
    down(i, image) {
        if(!image.videoUrl){
          this.num = this.num+1;
        }
        return this.num < 3;
    }
  },
  data() {
    return {
      show: false,
      num:0
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>
<style scoped>
.tj-photos {
  margin-top: 10px;
  background: #fff;
}
.tj-photo {
  padding: 10px 15px;
  text-align: center;
}
.tj-photo img {
  width: 100%;
}
.tj-photo- {
  padding: 5px 0 12px;
}
.tj-photo-more {
  font-size: 13px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  border-top: solid 1px #f9f9f9;
  padding: 15px 0 12px;
  text-align: center;
}
.tj-photo-more::after {
  content: "";
  display: inline-block;
  width: 5px;
  height: 10px;
  margin-left: 4px;
  background: url(../../assets/images/v19-10/xiayiji.png) no-repeat;
  background-size: 100% 100%;
}
</style>

