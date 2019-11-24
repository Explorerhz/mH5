<template>
  <div class="product-list" :iid="idd">
    <ul>
      <li v-for="item in listData" :key="'p-l'+item.eqId">
        <a
          class="boutiqueEqItem"
          :href="item.mDetailUrl"
          @click.prevent="goDetail(item.mDetailUrl)"
          :title="item.areaInfo +'二手'+item.eqTitle+'转让报价信息'"
        >
          <div class="list-lt">
            <img
              :src="item.midImageUrl"
              class="img-lazyload pd-img"
              :alt="item.areaInfo +'二手'+item.eqTitle+'实拍照片'"
            />
            <div v-if="item.showNewUpload" class="new-icon"></div>
            <em class="video-icon" v-if="item.showVideo"></em>
          </div>
          <div class="pd-info newPd_info_31">
            <div class="pd-info-title">{{item.eqTitle}}</div>
            <div class="taimAddrWrap">
              <span class="pd-time" v-html="parseTime(item)"></span>
            </div>
            <div class="index-icon" v-if="item.labelList.length">
              <template v-for="(tag, index) in item.labelList">
                <div class="pd-tag" :key="'p-tag'+tag+index" v-if="index < 3">
                  <p>{{tag}}</p>
                </div>
              </template>
            </div>
            <div class="price-icon">
              <div class="price">
                <div style="position:relative">
                  <span v-html="parsePrice(item.priceInfo)"></span>
                  <div class="payment-new">{{item.downPaymentStr}}</div>
                </div>
                <div class="pl-reduced" v-if="item.reducedPriceStr">
                  (
                  <span>已降{{item.reducedPriceStr}}</span>)
                </div>
              </div>
            </div>

            <div v-if="nocall!=0" class="zxs-btn" v-on:click.stop.prevent="call(item)">询底价</div>
          </div>
        </a>
        <div class="pl-bottom"></div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getRandomNum } from "@/util/common";
export default {
  name: "tj-product-list",
  props: {
    listData: Array,
    nocall: Number,
    idd: Number,
  },
  created(){
    // console.log("listData=", this.idd, this.listData[2].eqTitle);
  },
  mounted(){
  },
  computed: {
    parseTime() {
      return function(v) {
        return (
          v.eqTimeInfo.replace(/ /g, "").replace(/\|/g, "<i>|</i>") +
          "<i>|</i>" +
          v.areaInfo
        );
      };
    },
    parsePrice() {
      return function(v) {
        return v.replace(/万/g, "<i>万</i>");
      };
    }
  },
  methods: {
    call(item) {
      const a = getRandomNum(1e4, 99999) + "$" + sa.store.getDistinctId();
      let params = {
        channel: 6,
        eqId: item.eqId,
        distinctId: sa.store.getDistinctId(),
        uniqueSymbol: a,
        pageFromType: "L",
        channelCodeFlag: "m.tiebaobei.com",
        commitChannelCodeFlag: "m.tiebaobei.com"
      };

      this.$emit("call", params);
    },
    goDetail(url) {
      //this.$router.push(url);
      window.location.href = url;
    }
  },
  data() {
    return {
      show: true
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>
<style scoped>
.product-list li {
  padding: 11px 0 1px 11px;
  overflow: hidden;
  position: relative;
}
.boutiqueEqItem {
  display: flex;
  width: 100%;
}
.list-lt {
  width: 133px;
  margin-right: 8px;
  height: 104px;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}
.list-lt img {
  width: 133px;
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  z-index: 0;
}
.pd-info {
  min-height: 104px;
  flex: 1;
  text-align: left;
  position: relative;
}
.adr_t,
.pd-info-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 400;
  width: 198px;
  height: 20px;
  line-height: 17px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.taimAddrWrap {
  display: -webkit-box;
  margin-top: 2px;
  font-size: 0;
  height: 20px;
  line-height: 20px;
}
.pd-time {
  color: #9ea4af;
  font-size: 12px;
  width: 215px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.taimAddrWrap >>> i {
  color: #dce2ee;
  font-size: 11px;
  margin: 0 6px;
  position: relative;
  top: -1.3px;
}
.adr_t {
  font-size: 12px;
  color: #9ea4af;
  width: 70px;
  display: block;
}
.index-icon {
  display: flex;
  margin-top: 4px;
}
.pd-tag {
  margin-right: 8px;
  max-width: 70px;
  /* height: 16px;
  line-height: 16px; */
  border: 0.8px solid rgba(218, 209, 195, 1);
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pd-tag p {
  height: 15px;
  line-height: 15px;
  font-size: 12px;
  font-weight: 400;
  color: #d4a95d;
  display: block;
  transform: scale(0.8);
  white-space: nowrap;
}
.price-icon {
  margin-top: 6px;
  width: 100%;
}
.price {
  color: #ff4757;
  position: relative;
}
.price span {
  font-size: 16px;
  font-weight: 500;
  color: rgba(245, 0, 0, 1);
}
.price >>> i {
  font-size: 12px;
  color: #ff4757;
}
.payment-new {
  font-size: 12px;
  font-weight: 400;
  color: rgba(245, 0, 0, 1);
  position: relative;
  padding-left: 8px;
  display: inline-block;
  transform: scale(0.9);
}
.zxs-btn {
  position: absolute;
  right: 11px;
  bottom: 8px;
  line-height: 21px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(88, 119, 222, 1);
  width: 49px;
  height: 21px;
  background: rgba(241, 246, 254, 1);
  border-radius: 2px;
  text-align: center;
}
.down-icon {
  transform: translate3d(0, 0, 0);
  position: absolute;
  z-index: 1;
  text-align: center;
  color: #fff;
  top: 0;
  left: 0;
  min-width: 36px;
  padding: 0 11px 0 8px;
  height: 18px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALEAAAAwCAMAAABpG2uKAAAAclBMVEUAAAD/Slr/Slr/SVr/Slr/Slr/SVn/SVn/SVn/SVn/Slr/Slr/SVn/bXr/VmX/cHz/WWf/cn7/T17/ZHH/VGL/UWD/ZnP/Xmz/d4L/a3f/aHX/W2n/S1r/TVz/YG7/eYT/YnD/SFj/dYH/dID/XWv/eoa6H4UvAAAADXRSTlMA9LymO9plHA3pmnMtL5kv7QAAAWpJREFUaN7VmGlywjAMRj/b2YBuLCk0JVCX9P5XbFI7DGHqJh7XE+md4P3Rk0b46jj/cDB8tlxa1pbnnscrb5bK8GrZGj46Toa9pWmad8tLz9OVnaG0bCy15WjRHUHGlaUXjmR8nMO4+dN45218pmW8cRjre+PD0HgdwXgoHN/YZ/Cs8T7EuPYwDkhFgHE5q/EpnjG3HGtwy7EGtxxTNHbGzQBuOdaIleNw49phTCfHU4255ViDW441uOVYg1zcRowFPeORuKXglmMJbjleYixuxO55vQKZBTIxbgmY5VgAzHIsgdnj5mecETD2ipsoAF45VgD+OcfbuDlOALDKsUQLqxwnaOGUY4UORjkWuTHmk+MMJIynx03BwCbHaQEDlxwvcriMLyS/3YsH9PDI8Y0wWOQ4zRFsXEU2HgirAjfQz7HIAELG43FTOYbMkGMfY5ngHso5Fsr4DiGbYyGzAr9BL8elSOVylcDBNyfT6kH0L2lbAAAAAElFTkSuQmCC)
    no-repeat;
  background-size: auto;
  font-size: 12px;
  line-height: 18px;
  background-size: 100% 100%;
}
.new-icon {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 45px;
  height: 17px;
  background: url(../../assets/images/v19-10/xinshangjia.png) no-repeat;
  background-size: 100% 100%;
}
.pl-reduced {
  line-height: 18px;
}
.pl-reduced span {
  font-size: 12px;
  font-weight: 400;
  display: inline-block;
  color: rgba(245, 0, 0, 1);
  transform: scale(0.9);
  /* padding: 0 1px; */
}
.pl-reduced span::after {
  content: "";
  width: 4px;
  height: 9px;
  display: inline-block;
  background: url(../../assets/images/v19-10/jaintou.png) no-repeat;
  background-size: 100%;
  margin-left: 5px;
}
.pl-bottom {
  height: 1px;
  background: #f9f9f9;
  margin: 15px 15px 0 0;
}
.video-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  display: block;
  background: url(../../assets/images/v19-10/video-icon.png) no-repeat;
  background-size: contain;
  transform: translate3d(-50%, -50%, 0);
}
</style>

