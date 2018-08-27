<template>
  <div class="bottom-player" >
        <div class="progress-bar" :style="{'left': sliderPercent}"></div>
        <div class="content" @click="showPlayPage">
                <ul class="slider">
                  <slider>
                    <li v-for="item,index in 5" :key="index"  class="slider-item">
                        <div class="poster">
                            <img :src="musicLink[index].poster" alt="">
                        </div>
                        <div class="songData">
                            <p class="song-name">{{musicLink[index].songname}}</p>
                            <p class="artist" v-if="hasPlayedFlag">{{musicLink[index].artist}}</p>
                            <p class="artist" v-else>滑动可实现音乐切换</p>
                        </div>
                    </li>
                  </slider>
                </ul>
            <div class="playBtn">
                <span  class="glyphicon" :class="playState ? 'glyphicon-pause' : 'glyphicon-play-circle'" @click.stop="changePlayState"></span>
            </div>
            <div class="songListBtn">
                <span class="glyphicon glyphicon-align-left" @click.stop="showList" ref="showBtn"></span>
            </div>     
        </div>
        <div class="songListWrap" v-show="listFlag" @click.stop="showList" ref="list">
                <ul class="songList">
                    <li v-for="item,index in musicLink" @click.stop="chooseMusic(index)">
                        <div class="songMsg" :style="index === songIndex1 ? color: ''">
                            <span v-if="index === songIndex1" class="glyphicon glyphicon-volume-up" ></span>
                            <span class="song-name">{{item.songname}}</span>
                            <span class="artist">{{item.artist}}</span>
                        </div>
                        <span class="glyphicon glyphicon-remove remove" ></span>
                    </li>
                </ul>  
        </div>     
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import slider from './sliderSub/sliderBottom'
export default {
  data() {
    return {
      color: {
        'color': '#fd0c0c'
      },
      listFlag: false,
    }
  },
  components: {
    slider
  },
  created() {
    this.musicPlay()
  },
  computed: {
    ...mapState(['sliderPercent', 'playState', 'musicLink', 'songIndex1', 'hasPlayedFlag']),

  },
  methods: {
    ...mapMutations(['changePlayState', 'showPlayPage', 'musicPlay']),
    showList(e) {
      if (e.target === this.$refs.list || e.target === this.$refs.showBtn) {
        this.listFlag = !this.listFlag
      }
    },
    chooseMusic(index) {
      // this.$store.commit('musicPlay', index)
      this.$store.state.bottomSlider.goToPage(index)
    }
  }
}
</script>

<style lang="less" scoped>
.bottom-player {
  width: 100%;
  height: 52px;
  background: #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  .progress-bar {
    position: absolute;
    top: 0;
    left: -100%;
    height: 2px;
    width: 100%;
    background: rgba(255, 0, 0, 0.664);
  }
  .content {
    margin-top: 2px;
    display: flex;
    .slider {
      height: 50px;
      flex: 1;
      overflow: hidden;
      li {
        width: 100%;
        height: 50px;
        float: left;
        display: flex;
        .poster {
          width: 50px;
          img {
            margin-top: 5px;
            margin-left: 5px;
            width: 40px;
            height: 40px;
            border-radius: 5px;
          }
        }
        .songData {
          flex: 1;
          margin-top: 8px;
          margin-left: 5px;
          p {
            margin: 0;
          }
          p:first-of-type {
            font-size: 16px;
            line-height: 18px;
          }
          p:last-of-type {
            color: rgb(136, 136, 136);
          }
        }
      }
    }
    .playBtn,
    .songListBtn {
      width: 50px;
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      text-align: center;
    }
  }
  .songListWrap {
    position: fixed;
    bottom: 52px;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(3, 3, 3, 0.5);
    .songList {
      margin: 0;
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #fff;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      li {
        height: 40px;
        border-bottom: 1px solid rgb(236, 236, 236);
        margin: 0 10px;
        line-height: 40px;
        display: flex;
        .songMsg {
          flex: 1;
          span:last-of-type {
            font-size: 10px;
          }
        }
        .remove {
          width: 40px;
          text-align: center;
          line-height: 40px;
          color: #ccc;
        }
      }
    }
  }
}
</style>
