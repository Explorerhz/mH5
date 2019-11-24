<template>
  <section class="bid-list">
                <!-- 竞拍列表页数据start -->
                <div class="bidlist-title">其他合适车源</div>
                <div id="carList" class="car-bidding-list car-list-maidian"><ul>
                        
                        <li class="car-item-li" v-for="item in listData" v-bind:key="'num_'+item.id">
                            <div class="car-pic">
                                
                                <div class="car-down-time"></div>
                                
                                <img src="https://upimg.tiebaobei.com/img/20190127/3u95rg6iazxcjwv425aaky34mjcfuw5k.jpg!320x240" class="img-lazyload pd-img">
                            </div>
                            <div class="pd-info newPd_info_31">
                                <h3>{{item.auctionGoodName}}</h3>
                                <div class="car-detail">
                            <span class="pd-time">
                                    {{item.outDate}}年 | {{item.hours}}小时 | {{item.provinceName}}-{{item.cityName}}
                            </span>
                                </div>
                                
                                <div class="tjb" v-if="item.tjInsurance==2"><img src="../assets/images/tjb-icon.png" alt=""></div>
                                
                                <div class="jp-price">
                                    <span class="gold-offer">起拍价 <i>{{item.startPriceStr}}</i> </span>
                                    <span class="quoted-price-times">
                                    
                            </span>
                                </div>
                                
                            </div>
                        </li>
                        
                    </ul></div>
                
                <!-- 竞拍列表页数据end -->
            </section>
</template>

<script>
export default {
    name: 'jingPaiList',
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
.bid-list {
    padding-bottom: 2.4rem;
}
.bidlist-title {
    color: #6A6A77;
    font-size: 0.85rem;
    font-weight: 600;
    height: 2.533rem;
    line-height: 2.533rem;
    text-align: center;
    margin: 0.64rem 0;
    background: #FFF;
}
.bid-list .bid-bar, .bid-list #carList {
    overflow: auto;
    text-align: center;
    font-size: .8rem;
    line-height: 1.6rem;
    color: #9EA4AF;
    background-size: 100%;
    background: #FFF;
}
.car-bidding-list li {
    padding-bottom: 0.53333rem;
    position: relative;
    padding-top: 0.53333rem;
    overflow: hidden;
    border-width: 0 0 1px;
    display: flex;
    border-bottom: 1px solid rgba(220, 226, 238, 0.8);
}
.car-pic {
    width: 33%;
    max-width: 6.66667rem;
    margin-right: 0.53333rem;
    height: 5rem;
    overflow: hidden;
    position: relative;
}
.car-pic img {
    padding-left: 0.64rem;
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    position: relative;
    height: 100%;
}
.car-bidding-list li .pd-info {
    width: 66%;
    height: auto;
    -webkit-box-flex: 1;
    text-align: left;
    position: relative;
    padding-right: 0.5333rem;
}
.pd-info h3 {
    /* padding-top: .1rem; */
    color: #4A4A53;
    font-size: .8rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 400;
    width: 11.2rem;
}
.newPd_info_31 .car-detail {
    display: -webkit-box;
    /* margin-top: .12rem; */
    height: 0.93333rem;
    line-height: 0.93333rem;
}
.pd-info .pd-time {
    color: #9EA4AF;
    font-size: .64rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
}
.tjb {
    height: .93333rem;
}
.tjb img {
    height: 1.027rem;
    width: 2.03rem;
}
.jp-price {
    line-height: 1.33333rem;
    margin-top: 0.266667rem;
}
.jp-price span {
    position: absolute;
    display: inline-block;
    height: 1.4rem;
    line-height: 1.4rem;
    color: #FF4757;
    /* bottom: -.8rem; */
    font-size: 0.7rem;
}
.gold-offer i {
    font-size: .85rem;
}
.bid-list .jp-price .quoted-price-times {
    /* color: #9EA4AF; */
    position: absolute;
    width: 8.53333rem;
    text-align: right;
    right: 0.5333rem;
}
.jp-price span {
    position: absolute;
    display: inline-block;
    height: 1.4rem;
    line-height: 1.4rem;
    color: #FF4757;
    /* bottom: -.8rem; */
    font-size: 0.7rem;
}
.offerInput, .phoneNumber {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 1024px;
    height: 2.56rem;
    line-height: 2.56rem;
    background-image: linear-gradient(135deg, #ff6844 0%, #ff4544 100%);
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #fff;
    z-index: 999;
}
.offerInput span{
    font-size: 0.907rem;
}
</style>