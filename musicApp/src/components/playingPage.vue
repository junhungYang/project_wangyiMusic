<template>
  <transition  mode="in-out" name="playingPage">
    <div class="playingPage" v-show="playPageShow">
        <div class="background">
            <img :src="musicLink[songIndex1].poster" alt="">
        </div>
        <div class="header">
            <div class="glyphicon glyphicon-menu-left" @click="showPlayPage"></div>
            <div class="songMsg">
                <p>{{musicLink[songIndex1].songname}}</p>
                <p>{{musicLink[songIndex1].artist}}</p>
            </div>
            <div class="share">
                <div class="glyphicon glyphicon-stats"></div>
                <div class="glyphicon glyphicon-share"></div>
            </div>
        </div>
        <div class="boder"></div>
        <div class="animate">
            <div class="indicator" :class="animateState">
                <img src="/static/img/indicator.png" alt="">
            </div>
            <div class="record" :style="{'animation-play-state':animateState}">
                <img class="recordBg" src="/static/img/record.png" alt="">
                <img class="recordPic" :src="musicLink[songIndex1].poster" alt="">
            </div>
        </div>
        <div class="operation">
              <ul class="func">
                  <li class="glyphicon glyphicon-heart-empty"></li>
                  <li class="glyphicon glyphicon-download-alt"></li>
                  <li class="glyphicon glyphicon-list-alt"></li>
                  <li class="glyphicon glyphicon-option-vertical"></li>
              </ul>
            <musicSlider></musicSlider>
            <div class="play">
                <div class="glyphicon glyphicon-repeat"></div>
                <div class="glyphicon glyphicon-step-backward" @click="prevMusic"></div>
                <div class="glyphicon" :class="playState ? 'glyphicon-pause' : 'glyphicon-play'" @click="changePlayState"></div>
                <div class="glyphicon glyphicon-step-forward" @click="nextMusic"></div>
                <div class="glyphicon glyphicon-menu-hamburger"></div>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import musicSlider from './musicSlider/musicSlider'

export default {
  data() {
    return {
      animateState: 'paused',
    }
  },
  components: {
    musicSlider: musicSlider
  },
  computed: {
    ...mapState(['playState', 'playPageShow', 'songIndex1', 'musicLink']),
    ...mapGetters(['whichSong'])
  },
  methods: {
    ...mapMutations(['changePlayState', 'showPlayPage', 'musicPlay', 'prevMusic', 'nextMusic']),
  },
  watch: {
    playState() {
      if (this.playState) {
        this.animateState = 'running'
      } else {
        this.animateState = 'paused'
      }
    }
  },
}
</script>

<style lang="less" scoped>
.playingPage {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 2;
  .header {
    height: 50px;
    color: #fff;
    display: flex;
    z-index: 1;
    .glyphicon-menu-left {
      width: 50px;
      height: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
    }
    .share {
      width: 100px;
      height: 50px;
      display: flex;
      .glyphicon-stats,
      .glyphicon-share {
        flex: 1;
        height: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
      }
    }
    .songMsg {
      flex: 1;
      overflow: hidden;
      p {
        margin: 0;
      }
      p:first-of-type {
        padding-top: 5px;
        font-size: 16px;
        font-weight: 500;
      }
      p:last-of-type {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.534);
      }
    }
  }
  .boder {
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.678),
      rgba(255, 255, 255, 0)
    );
    z-index: 1;
  }
  .animate {
    position: relative;
    flex: 1;
    width: 100%;
    overflow: hidden;
    .indicator {
      position: absolute;
      top: -8px;
      left: 50%;
      transform-origin: left top;
      transition: all 0.25s linear;
      z-index: 1;
      width: 40%;
      img {
        width: 100%;
      }
    }
    .running {
      transform: rotate(33deg);
    }
    .paused {
      transform: rotate(0deg);
    }
    .record {
      animation: recordRotate 10s linear infinite;
      position: absolute;
      left: 50%;

      transform: translate(-50%, -50%);
      width: 100%;
      .recordBg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 75%;
      }
      .recordPic {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 53%;
        border-radius: 50%;
      }
    }
    @media screen and (min-height: 568px) {
      .record {
        top: 45%;
      }
    }
    @media screen and (min-height: 667px) {
      .record {
        top: 42%;
      }
    }
    @media screen and (min-height: 800px) {
      .record {
        top: 33%;
      }
    }
    @media screen and (max-height: 568px) {
      .record {
        top: 42%;
      }
    }
    @keyframes recordRotate {
      0% {
        transform: translate(-50%, -50%) rotate(0);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  }
  .operation {
    height: 150px;
    display: flex;
    flex-direction: column;
    z-index: 1;
    .func {
      height: 50px;
      display: flex;
      margin: 0 50px;
      li {
        flex: 1;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 50px;
      }
    }
    .play {
      flex: 1;
      display: flex;
      margin: 0 10px;
      div {
        text-align: center;
        color: #fff;
        line-height: 86px;
      }
      div:first-of-type,
      div:last-of-type {
        flex: 2;
        font-size: 20px;
      }
      div:nth-of-type(2),
      div:nth-of-type(4) {
        flex: 2;
        font-size: 23px;
      }
      div:nth-of-type(3) {
        flex: 3;
        font-size: 34px;
        // border: 1px solid #fff;
      }
    }
  }
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(73, 73, 73);
    img {
      height: 110%;
      position: absolute;
      left: 50%;
      top: -5%;
      transform: translateX(-50%);
      filter: blur(5px);
      opacity: 0.7;
    }
  }
}
.playingPage-enter {
  transform: translateY(100%);
}
.playingPage-enter-to {
  transform: translateY(0);
}
.playingPage-leave {
  transform: translateY(0);
}
.playingPage-leave-to {
  transform: translateY(100%);
}

.playingPage-leave-active,
.playingPage-enter-active {
  transition: all 0.1s ease-out;
}
</style>
