<template>
    <!-- slider容器 -->
  <div class="slider" ref="slider">
      <!-- 滚动条 -->
    <div class="slider-group" ref="sliderGroup">
        <!-- 插槽:用于插入内容 -->
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { addClass } from './dom'
import { mapMutations, mapState } from 'vuex'
import BScroll from 'better-scroll'
export default {
    name: 'slider',
    // 从父级模块传入规定是否loop,autoplay,以及每一页所呈现的时间
    props: {
        loop: {
            type: Boolean,
            default: false
        },
        interval: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {
            dots: [],
            currentPageIndex: 0,
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth()
            this._initDots()
            this._initSlider()
        }, 20)
        window.addEventListener('resize', () => {
            if (!this.slider) {
                return;
            }
            this._setSliderWidth(true)
            this.slider.refresh()
        })
    },
    methods: {
        ...mapMutations(['musicPlay', 'bottomSliderInit', 'hasPlayed']),
        _setSliderWidth(isResize) {
            // 获取sliderGroup的子元素
            this.children = this.$refs.sliderGroup.children;

            //获取容器长度
            let sliderWidth = this.$refs.slider.clientWidth

            // 遍历sliderGrop的每一个子元素获取总长度
            let width = 0
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                //通过addClass组件，给每一页动态添加类名'slider-item'
                addClass(child, 'slider-item')
                //设置每一页的宽度应该是容器的宽度
                child.style.width = sliderWidth + 'px'
                //把每一页的宽度加进width内获取总宽度
                width += sliderWidth
            }
            if (!isResize) {
                //判断是否存在自动播放，假如存在自动播放应该给总宽再加上两个容器宽度
                //原因：在1页前面加上最后一页，在最后一页加上1页才能实现无缝切换
                width += 2 * sliderWidth
            }
            //把总宽赋值给sliderGroup
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: true,//针对轮播图所使用的属性
                snap: {
                    loop: true,
                    threshold: 0.3,
                    speed: 400
                },
                click: true
            })
            this.slider.on('scrollEnd', (e) => {
                this.hasPlayed()
                let pageIndex = this.slider.getCurrentPage().pageX
                if (this.currentPageIndex !== pageIndex) {
                    this.currentPageIndex = pageIndex
                    this.musicPlay(pageIndex)
                }
            })
            this.bottomSliderInit(this.slider)
        },
        _initDots() {
            this.dots = new Array(this.children.length)
        },
        // _play() {
        //     console.log(123456)
        //     clearTimeout(this.timer)
        //     this.timer = setTimeout(() => {
        //         this.slider.next()
        //     }, this.interval)
        // }
    }
}
</script>
<style lang="less" scoped>
.slider {
  min-height: 1px;
  position: relative;
  height: 100%;
}
.slider-group {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  height: 100%;
}
</style>

