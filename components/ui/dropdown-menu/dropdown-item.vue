<template>
    <div class="tj-dropdown-item" v-show="showWrapper" :style="style">
        <div class="tj-overlay" @click.stop="close"></div>
        <div class="tj-dropdown-item-options" @click.stop="">
            <div class="tj-dropdown-item-option" v-for="(item, index) in options" :key="'dropdown-item'+item.text+index" 
            @click="sel(index, item)" :style="{ color: item.value == value ? activeColor : '' }">
                <div class="tj-dropdown-item-title">{{item.text}}</div>
                <div class="tj-dropdown-item-value" v-if="item.value == value">
                    <tj-icon name="yes" :color="activeColor"></tj-icon>
                </div>
            </div>
        </div>
        <div class="tj-dropdown-item-slot">
            <slot></slot>
        </div>
    </div>
</template>
<script>
/**
 * 下拉菜单项组件
 * @author yuguang.guo
 * @date 2019-08-15
 */
import Icon from "@/components/ui/icon";
export default {
    name:'tj-dropdown-item',
    props:{
        value: null,
        title: String,
        disabled: Boolean,
        titleClass: String,
        options: {
        type: Array,
        default: () => []
        },
        active:{
            type:Boolean,
            default:false
        },
    },
    components:{
        [Icon.name]: Icon
    },
    beforeCreate() {
        this.$parent.children.push(this);
    },
    destroyed() {
        this.$parent.children.splice(this.$parent.children.indexOf(this), 1);
    },
    data() {
        return {
        offset: 0,
        show:false,
        showWrapper:false
        };
    },
    computed:{
        style(){
            let {direction, offset} = this.$parent;
            let style_ = {};
            if (direction === 'down') {
                style_.top = `${offset}px`;
            } else {
                style_.bottom = `${offset}px`;
            }
            return style_;
        },
        activeColor(){
            return this.$parent.activeColor;
        },
        displayTitle(){
            for (let index = 0; index < this.options.length; index++) {
                if(this.options[index].value === this.value){
                    if(this.title){
                        if(index !== 0)
                            return this.options[index].text;
                        else{
                           return this.title; 
                        }
                    }else{
                        return this.options[index].text;
                    }
                }
            }
            return this.title;
        },
        selColor(){
            let active_ = false;
            for (let index = 0; index < this.options.length; index++) {
                if(this.options[index].value === this.value){
                    if(this.title){
                        if(index !== 0)
                            active_ = true;
                    }else{
                        active_ = true;
                    }
                    break;
                }
            }
            console.log("this.active=", this.active);
            return this.active || active_ || this.showWrapper ?{color:this.activeColor}:{}; 
        },
        selClass(){
            return this.showWrapper; 
        }
    },
    methods: {
        toggle(show = !this.show){
            if (show === this.show) {
                return;
            }
            this.show = show;
            if (show) {
                this.$parent.updateOffset();
                this.showWrapper = true;
                document.body.classList.add('tj-overflow-hidden');
            }else{
                this.showWrapper = false;
                document.body.classList.remove('tj-overflow-hidden');
            }
        },
        sel(active, item){
            this.$emit("input", item.value);
            this.$emit("change", item.value);
            this.close();
        },
        close(){
          this.show = false;
          this.showWrapper = false;  
          document.body.classList.remove('tj-overflow-hidden');
        }
    },
}
</script>
<style>
.tj-dropdown-item{
    position: fixed;
    right: 0;
    left: 0;
    overflow: hidden;
    height: 100%;
    transition-duration: 0.2s;
    transition: 0.3s ease-out;
    z-index: 9999;
}
.tj-overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 99;
}
.tj-dropdown-item-options, .tj-dropdown-item-slot{
    z-index: 100;
    max-height: 60vh;
    width: 100%;
    overflow-y: auto;
    background-color: #fff;
    position: absolute;
}
.tj-dropdown-item-option{
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}
.tj-dropdown-item-title, .tj-dropdown-item-value{
    flex: 1;
}
.tj-dropdown-item-option:not(:last-child)::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #ebedf0;
    transform: scaleY(0.5);
}
.tj-dropdown-item-value{
    text-align: right;
}
</style>


