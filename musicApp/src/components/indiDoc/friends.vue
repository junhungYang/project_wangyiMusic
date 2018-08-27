<template>
  <div class="friends">
    <div class="scrollWrap" ref="allWrap">
      <div class="scroller">
          <div class="proPicList">
              <div class="title">
                  精彩别错过
                  <span class="glyphicon glyphicon-menu-right"></span>
              </div>
              <div ref="friendsWrap" class="friendsWrap">
                <ul class="friendsGroup">
                  <li v-for="item,index of proPicList" :key="index">
                          <div class="user-ProPic">
                              <img :src="item.picUrl" alt="">
                              <div class="level" v-if="item.isVip">v</div>
                              <div class="online" v-if="item.online"></div>
                          </div>
                          <div class="user-name">{{item.name}}</div>
                  </li>
                </ul>
              </div>
          </div>
          <div class="moments">
              <ul class="moments-wrap">
                  <li v-for="item,index in waterfullList" class="moments-item" :key="index">
                      <div class="user-proPic">
                          <img :src="item.propic" alt="">
                          <div class="level" v-if="item.isVip">v</div>
                      </div>
                      <div class="user-moment">
                              <div class="title">
                                  <div class="user-desc">
                                      <p class="user-name">
                                          <span>{{item.name}}</span>
                                          <span>分享单曲:</span>
                                      </p>
                                      <p class="release-date">{{item.publishDate}}</p>
                                  </div>
                                  <div class="addFriend">+ 关注</div>
                              </div>
                              <div class="moment-cont">
                                  <div class="moment-desc">{{item.contText}}</div>
                                  <ul class="moment-main">
                                          <li v-for="url in item.contPic" class="contList">
                                              <img :src="url" alt="">
                                          </li>
                                  </ul>
                              </div>
                      </div>
                  </li>
              </ul>
          </div>
          <v-load :flag="loadingFlag" :state="loadingState"></v-load>
      </div>
    </div>

    <div class="release">
        <div class="add" @click="releaseShow">+</div>
        <div v-show="releaseFlag" class="release-wrap">
              <div class="bgMask" @click="releaseShow"></div>
              <div class="release-cont">
                  <div class="moment">
                      <div class="icon">
                          <span class="glyphicon glyphicon-pencil"></span>
                      </div>
                      <div class="test">发动态</div>
                  </div>
                  <div class="video">
                      <div class="icon">
                          <span class="glyphicon glyphicon-film"></span>
                      </div>
                      <div class="test">发布视频</div>
                  </div>
              </div>
        </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import loading from '../loading'
import Vue from 'vue'
import waterfull from './waterfullApi'
export default {
  data() {
    return {
      proPicList: [],
      releaseFlag: false,
      loadingFlag: false,
    }
  },
  components: {
    'v-load': loading
  },
  created() {
    waterfull.propInit(this)
    axios.get('/music/friends#0').then(res => {
      if (res.data.code === 0) {
        let data = res.data.data
        this.waterfullList = data.waterfullList
        this.proPicList = data.proPicList
        let allScroll = this.allScroll
        this.scrollInit()
      }
    })
  },
  methods: {
    scrollInit() {
      this.friendsScroll = new BScroll(this.$refs.friendsWrap, {
        click: true,
        scrollY: false,
        scrollX: true
      })
      this.allScroll = new BScroll(this.$refs.allWrap, {
        click: true,
        probeType: 3
      })
      waterfull.scrollGetData(this, 'allWrap', 'allScroll', '/music/friends#')
    },
    releaseShow() {
      this.releaseFlag = !this.releaseFlag
    }
  }
}
</script>

<style lang="less" scoped>
.friends {
  width: 100%;
  position: absolute;
  top: 90px;
  bottom: 50px;
  .scrollWrap {
    width: 100%;
    overflow: hidden;
    height: 100%;
    .scroller {
      .proPicList {
        .title {
          padding: 10px;
          font-weight: 800;
          span {
            font-size: 10px;
          }
        }
        .friendsWrap {
          // overflow: hidden;
          height: 85px;
          width: 100%;
          border-bottom: 1px solid rgb(219, 219, 219);
          .friendsGroup {
            height: 85px;
            float: left;
            white-space: nowrap;
            li {
              height: 100%;
              display: inline-block;
              width: 60px;
              position: relative;
              .user-ProPic {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                position: absolute;
                left: 50%;
                margin-left: -20px;
                top: 10px;
                //   overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
                .level {
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  position: absolute;
                  background: #fd0c0c;
                  right: 0;
                  bottom: 0;
                  font-size: 10px;
                  color: #fff;
                  text-align: center;
                }
                .online {
                  width: 8px;
                  height: 8px;
                  background: #fd0c0c;
                  position: absolute;
                  border-radius: 50%;
                  right: 0;
                  top: 0;
                }
              }
              .user-name {
                position: absolute;
                bottom: 10px;
                width: 40px;
                left: 50%;
                margin-left: -20px;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
      .moments {
        .moments-wrap {
          .moments-item {
            padding: 15px 0 15px 10px;
            width: 100%;
            // height: 250px;
            border-bottom: 1px solid rgb(236, 236, 236);
            display: flex;
            .user-proPic {
              height: 100%;
              position: relative;
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
              .level {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                position: absolute;
                background: #fd0c0c;
                right: 0;
                top: 30px;
                font-size: 10px;
                line-height: 10px;
                color: #fff;
                text-align: center;
              }
            }
            .user-moment {
              flex: 1;
              margin-left: 10px;
              .title {
                height: 40px;
                display: flex;
                margin-right: 10px;
                // border: 1px solid red;
                .user-desc {
                  flex: 1;
                  .user-name {
                    margin: 0;
                    span:first-of-type {
                      color: rgb(63, 116, 197);
                    }
                  }
                  .release-date {
                    font-size: 10px;
                  }
                }
                .addFriend {
                  width: 50px;
                  height: 20px;
                  border-radius: 10px;
                  text-align: center;
                  line-height: 20px;
                  background: #fd0c0c;
                  font-size: 10px;
                  color: #fff;
                  margin-top: 10px;
                }
              }
              .moment-cont {
                .moment-desc {
                  margin-right: 10px;
                }
                .moment-main {
                  display: flex;
                  flex-wrap: wrap;
                  margin-right: 5px;
                  .contList {
                    padding-top: 5px;
                    padding-left: 5px;
                    width: 33%;
                    img {
                      width: 100%;
                      border-radius: 5px;
                    }
                  }
                }
              }
            }
          }
          .moments-item:last-of-type {
            border: 0;
          }
        }
      }
    }
  }

  .release {
    .add {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #fd0c0c;
      border: 1px solid #fff;
      position: absolute;
      bottom: 20px;
      left: 10px;
      font-size: 40px;
      color: #fff;
      line-height: 50px;
      text-align: center;
    }
    .release-wrap {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 99;
      .bgMask {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 140px;
        background: rgba(0, 0, 0, 0.4);
      }
      .release-cont {
        width: 100%;
        height: 140px;
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        .moment,
        .video {
          background: #fff;
          flex: 1;
          .icon {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            margin: 0 auto;
            margin-top: 20px;
            background: #fd0c0c;
            text-align: center;
            span {
              font-size: 22px;
              color: #fff;
              line-height: 70px;
            }
          }
          .test {
            text-align: center;
            margin-top: 10px;
          }
        }
        .moment {
          border-top-left-radius: 15px;
        }
        .video {
          border-top-right-radius: 15px;
        }
      }
    }
  }
}
</style>
