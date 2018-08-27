<template>
  <div id="app">
    <div class="mask" v-if="maskShowFlag">
      <div class="box">
        <div class="title">
          <span class="glyphicon glyphicon-home"></span>
        </div>
        <div class="confirm">
          <button @click="maskShow">go home</button>
        </div>
      </div>
    </div>
    <v-header></v-header>
    <router-view></router-view>
    <div class="myMsg" v-if="myMsgFlag">
      <v-myMsg></v-myMsg>
    </div>
    <div class="music-search" v-show="searchModFlag">
      <v-musicSearch ></v-musicSearch>
    </div>
    <div v-if="musicListFlag" class="musicList">
      <v-musicList></v-musicList>
    </div>
    <div>
      <playing-page></playing-page>
    </div>
    <div>
      <bottomPlayer></bottomPlayer>
    </div>
  </div>
</template>

<script>
import nav from './components/navigation'
import myMsg from './components/myMsg'
import musicSearch from './components/musicSearch'
import musicList from './components/musicList'
import playingPage from './components/playingPage'
import bottomPlayer from './components/bottomPlayer'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    'v-header': nav,
    'v-myMsg': myMsg,
    'v-musicSearch': musicSearch,
    'v-musicList': musicList,
    'playing-page': playingPage,
    'bottomPlayer': bottomPlayer
  },
  data() {
    return {
      // searchModFlag: false
    }
  },
  computed: {
    ...mapState(['myMsgFlag', 'maskShowFlag', 'searchModFlag', 'musicListFlag']),
  },
  methods: {
    ...mapMutations(['maskShow'])
  }
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  max-width: 414px;
  height: 100vh;
  max-height: 812px;
  overflow: hidden;
  position: fixed;
  left: 50%;
  top: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
  .myMsg {
    width: 100%;
    height: 100%;
  }
  .mask {
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.521);
    position: fixed;
    z-index: 99;
    .box {
      width: 60%;
      height: 20%;
      background: #fd0c0c;
      border-radius: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 2px 2px 8px rgba(29, 29, 29, 0.342);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .title {
        flex: 1;
        position: relative;
        span {
          font-size: 30px;
          color: #fff;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .confirm {
        width: 100%;
        height: 40px;
        background: #fff;
        button {
          outline: none;
          border: none;
          background: transparent;
          width: 100%;
          height: 100%;
          color: #fd0c0c;
          font-size: 18px;
        }
      }
    }
  }
}
</style>



