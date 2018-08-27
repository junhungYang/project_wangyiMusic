<template>
  <div class="nav">
        <div class="myMsg" @click="showMessage">
            <div class="newMsg">{{userData.newMessage}}</div>
            <span class="glyphicon glyphicon-align-justify"></span>
        </div>
        <div class="content">
            <router-link to= "myMusicList" class="glyphicon glyphicon-music"></router-link>
            <router-link to="/" class="glyphicon glyphicon-user"></router-link>
            <router-link to="video" class="glyphicon glyphicon-facetime-video"></router-link>
        </div>
        <div class="search" @click="showSearch">
            <span class="glyphicon glyphicon-search"></span>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  created() {
    axios.get('/music/user').then(res => {
      if (res.data.code === 0) {
        this.$store.commit('getUserData', res.data.data)
      }
    })
  },
  methods: {
    ...mapMutations(['showMyMsg', 'showSearchMod', 'searchAnimate']),
    showMessage() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.showMyMsg()
      }, 50);
    },
    showSearch() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.showSearchMod()
        this.searchAnimate()
      }, 50);
    }
  },
}
</script>

<style lang="less" scoped>
.nav {
  width: 100%;
  height: 50px;
  background: rgb(253, 12, 12);
  display: flex;
  .myMsg,
  .search {
    width: 50px;
    text-align: center;
    span {
      font-size: 20px;
      color: rgb(255, 255, 255);
      line-height: 50px;
    }
  }
  .myMsg {
    position: relative;
    .newMsg {
      // z-index: 99;
      font-size: 10px;
      color: black;
      position: absolute;
      right: 0;
      top: 7px;
      padding: 0 5px;
      border-radius: 7px;
      color: #fd0c0c;
      background: #fff;
      font-weight: 600;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
  }
  .content {
    padding: 0 40px;
    flex-grow: 1;
    display: flex;
    text-align: center;
    .glyphicon {
      text-decoration: none;
      flex-grow: 1;
      font-size: 20px;
      color: rgb(255, 255, 255);
      line-height: 50px;
    }
  }
}
</style>

