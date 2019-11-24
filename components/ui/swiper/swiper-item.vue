<template>
    <div class="tj-swiper-item" :style="itemStyle" :class="{'tj-swiper-item-select':isSelect}">
        <slot></slot>
    </div>
</template>
<script>
/**
 * 轮播项组件
 * @author yuguang.guo
 * @date 2019-08-15
 */
export default {
    name:'tj-swiper-item',
    beforeCreate() {
        this.$parent.swipes.push(this);
    },
    destroyed() {
        this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1);
    },
    data() {
        return {
        offset: 0
        };
    },
    computed:{
        isSelect(){
            return this.$parent.swipes.indexOf(this) == this.$parent.activeIndicator;
        },
        show(){
            return this.$parent.show;
        },
        itemStyle(){
            const { vertical, computedWidth, computedHeight, format } = this.$parent;
            let margin = '';
            let redius = '';
            let wSpece = 0;
            if(format=='style-01'){
                margin = '0 5px';
                redius = '6px';
                wSpece = 10;
            }
            return {
                width: (computedWidth - wSpece) + 'px',
                height: vertical ? computedHeight + 'px' : '',
                transform: `translate${vertical ? 'Y' : 'X'}(${this.offset}px)`,
                margin: margin,
                // transitionDuration:format == "style-01"?'300ms':'0ms',
                borderRadius: redius
            };
        }
    }
}
</script>
<style scoped>
.tj-swiper-item{
    overflow: hidden;
    width: 100%;
    display: flex;
    
}
.tj-swiper-item img{
    width: 100%;
    height: 100%;
}
</style>


