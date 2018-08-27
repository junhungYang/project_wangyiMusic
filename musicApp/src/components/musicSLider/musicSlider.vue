<template>
    <div class="schedule">
        <div class="momentTime">{{momentTime}}</div>
        <div class="slider-wrap" @click.stop="changeTime"  ref="sliderWrap">
            <div class="slider-base" ref="sliderBase">
                <div class="slider" :style="{'left': sliderPercent, 'position': 'absolute'}">
                <div class="point"></div>
            </div>
        </div>
        </div>
        <div class="allTime">{{songMinutes}}</div>
    </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import BScroll from 'better-scroll'
import { drag } from '../moveEvent/moveEvent'
export default {
    data() {
        return {
        }
    },
    mounted() {
        // drag(this.$refs.point, this.$refs.sliderWrap)
        drag(this)
    },
    computed: {
        ...mapState(['songTime', 'song', 'momentTime', 'sliderPercent']),
        // ...mapGetters(['moment']),
        songMinutes() {
            let seconds = this.songTime % 60;
            seconds === 0 ? seconds = '00' : '';
            let minutes = parseInt(this.songTime / 60)
            minutes < 10 ? minutes = '0' + minutes : '';
            return minutes + ':' + seconds
        },
        percent() {
            return `translateX(${this.sliderPercent})`
        }
    },
    methods: {
        changeTime(e) {
            let l = this.$refs.sliderWrap.offsetLeft
            let w = this.$refs.sliderWrap.offsetWidth
            let app = document.getElementById('app')
            let appLeft = app.offsetLeft - app.offsetWidth / 2
            let newPercent = (e.clientX - appLeft - l) / w
            newPercent = newPercent.toFixed(2)
            this.$store.commit('timeRefresh', newPercent)
        },
    }
}
</script>

<style lang="less" scoped>
.schedule {
  display: flex;
  height: 14px;
  .momentTime,
  .allTime {
    width: 50px;
    text-align: center;
    color: #fff;
    height: 14px;
    line-height: 14px;
  }
  .slider-wrap {
    flex: 1;
    height: 14px;
    position: relative;
    overflow: hidden;
    .slider-base {
      height: 2px;
      margin: 6px 0;
      background: rgba(255, 255, 255, 0.308);
      position: absolute;
      width: 100%;
      transform: translateY(-50%);
      .slider {
        width: 100%;
        height: 2px;
        background: #fff;
        position: absolute;
        left: -100%;
        .point {
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: -8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
        }
      }
    }
  }
}
</style>
