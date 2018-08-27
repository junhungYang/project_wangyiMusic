<template>
    <transition mode="in-out" name="musicList">
        <div class="musicList" v-show="animateFlag" >
              <search-sub :mod="'musicList'" @dataRefresh="dataRefresh"></search-sub>
            <div ref="scrollWrap" class="songWrap">
              <div class="scroller">
                <div class="interest">
                  <div class="title">
                  <span>你可能感兴趣</span>
                  </div>
                  <ul>
                      <li v-for="item,index in ablumList" :key="index" @click.stop="musicPlay(index)">
                          <img :src="item.picture" alt="">
                          <div class="desc">{{item.ablumName}}</div>
                      </li>
                  </ul>
                </div>
                <div class="songList">
                  <ul>
                      <li v-for="item,index in songData" @click.stop="musicPlay(index)">
                          <div class="song-cont">
                              <div class="song">{{item.songname}}</div>
                              <div class="artist">{{item.artistname}}</div>
                          </div>
                          <div class="operation glyphicon glyphicon-option-vertical">
                          </div>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>    
    </transition>
</template>

<script>
import searchSub from './searchSub/searchSub'
import BScroll from 'better-scroll'
import Vue from 'vue'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      ablumList: []
    }
  },
  created() {
    axios.get('/music/ablum').then(res => {
      if (res.data.code === 0) {
        this.ablumList = res.data.data
      }
    })
  },
  mounted() {
    this.listScroll = new BScroll(this.$refs.scrollWrap, {
      click: true,
      probeType: 3
    })
    console.log(this.listScroll)
  },
  components: {
    'search-sub': searchSub
  },
  computed: {
    ...mapState(['songData', 'musicListAnimateFlag']),
    animateFlag() {
      Vue.nextTick(() => {
        this.listScroll.refresh()
      })
      return this.musicListAnimateFlag
    }
  },
  methods: {
    dataRefresh(data) {
      this.songData = data
    },
    musicPlay(index) {
      index > 4 ? index = 0 : '';
      this.$store.state.bottomSlider.goToPage(index)
    }
  },
  watch: {
    songData() {
      Vue.nextTick(() => {
        this.listScroll.refresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 50px;
  overflow: hidden;
  .interest {
    margin: 0 5px;
    .title {
      padding-top: 10px;
      font-size: 10px;
      span {
        display: block;
        transform: scale(0.9);
        transform-origin: left top;
      }
    }
    ul {
      margin-top: 5px;
      margin-bottom: 0;
      li {
        padding: 4px 0;
        border-bottom: 1px solid rgba(228, 228, 228, 0.39);
        display: flex;
        img {
          width: 50px;
          height: 50px;
          border-radius: 5px;
        }
        .desc {
          margin-left: 10px;
          height: 50px;
          line-height: 50px;
        }
      }
      li:first-of-type {
        padding-top: 0;
      }
    }
  }
  .songWrap {
    position: absolute;
    top: 50px;
    bottom: 0;
    overflow: hidden;
    width: 100%;
    .songList {
      margin: 0 5px;
      ul {
        li {
          height: 50px;
          border-bottom: 1px solid rgba(204, 204, 204, 0.315);
          position: relative;
          .operation {
            height: 100%;
            width: 40px;
            line-height: 50px;
            float: right;
            color: rgb(109, 109, 109);
            text-align: center;
          }
          .song-cont {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            .artist {
              font-size: 10px;
              transform-origin: left top;
              transform: scale(0.8);
              color: rgb(109, 109, 109);
            }
          }
        }
      }
    }
  }
}
.musicList-enter {
  transform: translateY(100%);
}
.musicList-enter-to {
  transform: translateY(0);
}
.musicList-leave {
  transform: translateY(0);
}
.musicList-leave-to {
  transform: translateY(100%);
}

.musicList-leave-active,
.musicList-enter-active {
  transition: all 0.1s ease-out;
}
</style>
