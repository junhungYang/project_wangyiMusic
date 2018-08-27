<template>
    <div class="search">
        <span class="glyphicon glyphicon-menu-left" @click="toHome"></span>
        <div class="search-wrap">
            <input ref="input" type="text" placeholder="给你推荐 parties" @input="getData" @keyup.enter="redirectEnter">
            <div class="listWrap" ref="searchMod" @click="searchListShow" v-show="searchResult">
                <ul class="searchList" ref="searchList">
                    <li v-for="item,index in searchList" :key="index" @click="redirectClick(index)">
                    <span class="glyphicon glyphicon-search"></span>
                    <span class="song">{{item.song}}</span>
                    <span class="artist">{{item.artist}}</span>
                    </li>
                </ul>
            </div>
            <div v-if="noData" class="noData">so sorry,haven't Data...(┬.┬)</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
export default {
    props: {
        mod: {
            type: String
        }
    },
    data() {
        return {
            searchList: [],
            searchResult: false,
            noData: false,
            historyList: [''],
        }
    },
    mounted() {
        this.searchScroll = new BScroll(this.$refs.searchMod, {
            click: true,
            probeType: 3
        })
    },
    computed: {
        ...mapState(['musicListFlag', 'songData', 'songIndex'])
    },
    methods: {
        ...mapMutations([
            'searchAnimate',
            'showSearchMod',
            'musicListAnimate',
            'musicListMod',
            'showPlayPage',
            'historyListRefresh'
        ]),
        getData(e) {
            clearTimeout(this.timer)
            setTimeout(() => {
                let valueURI = encodeURIComponent(this.$refs.input.value)
                axios.get(`${this.HOST}?word=${valueURI}`)  //跨域请求
                // axios.get('/music/songData')
                    .then(res => {
                        if (res.data.data) {
                            let songArr = res.data.data.song
                            if (songArr) {
                                console.log(this.searchList)
                                this.$store.commit('songList', songArr)
                                let inputValue = this.$refs.input.value
                                this.searchList = []
                                this.searchList.push({
                                    song: inputValue,
                                    artist: '所有歌手'
                                })
                                songArr.forEach((item, index) => {
                                    this.searchList.push({
                                        song: item.songname,
                                        artist: item.artistname
                                    })
                                })

                                this.noData = false
                                this.searchResult = true
                                this.scrollRefresh()
                            } else {
                                this.noData = false
                                this.searchResult = false
                            }
                        } else {
                            this.noData = true
                            this.searchResult = false
                        }
                    })
            }, 500);
        },
        scrollRefresh() {
            Vue.nextTick(() => {
                this.searchScroll.refresh()
            })
        },
        searchListShow(e) {
            if (e.target === this.$refs.searchMod) {
                this.searchResult = false
                this.noData = false
                this.searchList = []
            }
        },
        toHome() {
            if (this.mod === "musicSearch") {
                this.searchAnimate()
                setTimeout(() => {
                    this.searchList = []
                    this.searchResult = false
                    this.showSearchMod()
                }, 500);
            } else if (this.mod === 'musicList') {
                this.musicListAnimate()
                setTimeout(() => {
                    this.musicListMod()
                }, 500);
            }
        },
        redirectEnter() {
            this.historyListRefresh(this.$refs.input.value)
            this.closeList()
            this.$refs.input.value = ''
            this.searchList = [];
            this.searchResult = false;
            if (!this.musicListFlag) {
                this.musicListAnimate()
                setTimeout(() => {
                    this.musicListMod()
                }, 300);
            } else {
                this.$emit('dataRefresh', this.songData)
            }
        },
        redirectClick(index) {
            if (index === 0) {
                this.redirectEnter()
            } else {

                this.historyListRefresh(this.$refs.input.value)
                this.$refs.input.value = ''
                // this.$store.commit('whichSong', index)  //用于具有真实数据时
                // 以下逻辑只用于模拟数据，具有真实数据时应作相应改动
                index > 4 ? index = 4 : ''
                this.$store.state.bottomSlider.goToPage(index)
                this.showPlayPage()
                this.closeList()
            }
            this.searchList = [];
            this.searchResult = false;
        },
        closeList() {
            this.searchResult = false;
            this.$refs.input.value = ''
            if (this.$store.state.searchModFlag) {
                this.showSearchMod()
                this.searchAnimate()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 50px;
  background: #fd0c0c;
  display: flex;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  .glyphicon {
    width: 50px;
    height: 100%;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 50px;
  }
  .search-wrap {
    flex-grow: 1;
    margin: 8px 8px 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.377);
    input {
      border: none;
      outline: none;
      width: 100%;
      background: transparent;
      height: 100%;
      font-size: 14px;
      line-height: 34px;
      color: #fff;
      &::-webkit-input-placeholder {
        color: rgb(255, 255, 255);
      }
    }
    .listWrap,
    .noData {
      position: absolute;
      width: 92%;
      left: 4%;
      top: 50px;
      z-index: 1;
      box-shadow: 0 3px 8px rgba(15, 15, 15, 0.26);
      border-radius: 5px;
      background: #fff;
    }
    .listWrap {
      min-height: 100px;
      max-height: 400px;
      overflow: hidden;
      .searchList {
        li {
          height: 45px;
          border-bottom: 1px solid rgb(238, 238, 238);
          line-height: 45px;
          font-size: 16px;
          color: rgb(78, 78, 78);
          span {
            height: 100%;
            line-height: 45px;
            vertical-align: middle;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .glyphicon {
            color: #ccc;
            width: 30px;
          }
          &:first-of-type {
            span {
              color: #fd0c0c;
            }
          }
          .artist {
            display: inline-block;
            margin-left: 5px;
            font-size: 12px;
            padding-top: 1px;
            max-width: 20%;
          }
          .song {
            display: inline-block;
            max-width: 65%;
          }
        }
      }
    }
    .noData {
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
  }
}
</style>
