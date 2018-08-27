<template>
    <transition name="search">
        <div class="music-search" v-show="animateFlag">
                 <search-sub :mod="'musicSearch'"></search-sub>
            <div class="main">
                <div class="hotSearch">
                    <div class="title">热门搜索</div>
                    <ul class="hotSearch-list">
                        <li class="hotSearch-item" v-for="item in hotMusicList" :key="item">{{item}}</li>
                    </ul>
                </div>
                <ul class="search-history" v-if="historyList">
                    <li class="hisroty-item" v-for="item,index in historyList" :key="item">
                        <span class="glyphicon glyphicon-time"></span>
                        <div>
                            <span>{{item}}</span>
                            <span class="glyphicon glyphicon-remove" @click="removeHistroy(index)"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios'
import searchSub from './searchSub/searchSub'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      hotMusicList: [],
    }
  },
  created() {
    this.historyListInit()
    axios.get('/music/hotMusic').then(res => {
      if (res.data.code === 0) {
        this.hotMusicList = res.data.data
      }
    })
  },
  components: {
    'search-sub': searchSub
  },
  computed: {
    ...mapState(['historyList']),
    animateFlag() {
      return this.$store.state.searchAnimateFlag
    }
  },
  methods: {
    ...mapMutations(['historyListInit']),
    removeHistroy(index) {
      this.historyList.splice(index, 1)
      if (this.historyList.length === 0) {
        localStorage.removeItem('history')
      } else {
        localStorage.setItem('history', JSON.stringify(this.historyList))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.music-search {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;

  .main {
    margin: 0 10px;
    .hotSearch {
      .title {
        width: 100%;
        margin-top: 15px;
        font-size: 10px;
        color: rgb(90, 90, 90);
      }
      .hotSearch-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        .hotSearch-item {
          margin: 0 4px;
          padding: 0 8px;
          border: 1px solid #ccc;
          border-radius: 10px;
          margin-bottom: 5px;
        }
      }
    }
    .search-history {
      .hisroty-item {
        display: flex;
        height: 40px;
        div {
          flex: 1;
          border-bottom: 1px solid rgba(204, 204, 204, 0.26);
          display: flex;
          span:first-of-type {
            flex: 1;
            line-height: 40px;
          }
        }
      }
      .glyphicon-time,
      .glyphicon-remove {
        width: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        color: rgb(128, 128, 128);
      }
    }
  }
}
.search-enter {
  transform: translateY(100%);
}
.search-enter-to {
  transform: translateY(0);
}
.search-leave {
  transform: translateY(0);
}
.search-leave-to {
  transform: translateY(100%);
}

.search-leave-active,
.search-enter-active {
  transition: all 0.1s ease-out;
}
</style>
