<template>
  <div class="myMsg-wrapper" @click.self="closeMyMsg">
        <transition mode="in-out" name="myMsg" >
            <div class="myMsg-content" ref="scrollList" v-show="flag">
                <div >
                    <div class="header" :style="userBackground">
                        <div class="user-wrapper">
                            <div class="profile-photo">
                                <img :src="user.proPic" alt="">
                            </div>
                            <div class="user-msg">
                                <span class="user-name">yangjunxing</span>
                                <span class="glyphicon glyphicon-cloud"></span>
                                <span class="level">lv.8</span>
                                <span class="signOn">
                                    <a href="#">签到</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="music-list">
                        <div class="list1">
                            <ul>
                                <li v-for="item,index in funcList.list1" :key="item.test">
                                    <button @click="showMask">
                                        <span :class="item.icon"></span>
                                        <span>{{item.test}}</span>
                                    </button>
                                    <span v-if="index === 0" class="newMsg">{{user.newMessage}}</span>
                                </li>            
                            </ul>
                        </div>
                        <div class="list2">
                            <ul>
                                <li v-for="item in funcList.list2" :key="item.test">
                                    <button  @click="showMask">
                                        <span :class="item.icon"></span>
                                        <span>{{item.test}}</span>
                                    </button>
                                </li>         
                            </ul>
                        </div>
                        <div class="list3">
                            <ul>
                                <li v-for="item in funcList.list3" :key="item.test">
                                    <button  @click="showMask">
                                        <span :class="item.icon"></span>
                                        <span>{{item.test}}</span>
                                    </button>
                                </li>      
                            </ul>
                        </div>
                    </div>
                </div> 
            </div>
        </transition>
        <transition mode="in-out" name="myMsg" >
            <div class="myMsg-operate" v-show="flag">
                <div @click="showMask">
                    <span class="glyphicon glyphicon-adjust"></span>
                    <span>夜间模式</span>
                </div>
                <div @click="showMask">
                    <span class="glyphicon glyphicon-cog"></span>
                    <span>设置</span>
                </div>
                <div @click="showMask">
                    <span class="glyphicon glyphicon-off"></span>
                    <span>退出</span>
                </div>
            </div>
        </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            flag: false,
            user: {},
            userBackground: {},
            funcList: {
                list1: [{
                    icon: "glyphicon glyphicon-envelope",
                    test: '我的消息'
                }, {
                    icon: "glyphicon glyphicon-bookmark",
                    test: '会员中心'
                }, {
                    icon: "glyphicon glyphicon-th-large",
                    test: '商城'
                }, {
                    icon: "glyphicon glyphicon-list-alt",
                    test: '游戏推荐beta'
                }, {
                    icon: "glyphicon glyphicon-headphones",
                    test: '在线听歌免流量'
                }],
                list2: [{
                    icon: "glyphicon glyphicon-heart",
                    test: '我的好友'
                }, {
                    icon: "glyphicon glyphicon-map-marker",
                    test: '附近的人'
                }],
                list3: [{
                    icon: "glyphicon glyphicon-heart",
                    test: '个性换肤'
                }, {
                    icon: "glyphicon glyphicon-map-marker",
                    test: '听歌识曲'
                }, {
                    icon: "glyphicon glyphicon-map-marker",
                    test: '定时停止播放'
                }, {
                    icon: "glyphicon glyphicon-map-marker",
                    test: '扫一扫'
                }, {
                    icon: "glyphicon glyphicon-map-marker",
                    test: '音乐闹钟'
                }, {
                    icon: "glyphicon glyphicon-map-marker",
                    test: '驾驶模式'
                }, {
                    icon: "glyphicon glyphicon-map-marker",
                    test: '音乐云盘'
                }]
            }
        }
    },
    created() {
        this.user = this.$store.state.userData
        this.userBackground = {
            background: `url(${this.user.background})`
        }
    },
    mounted() {
        this.flag = true
        setTimeout(() => {
            this.scrollInit()
        }, 200);
    },
    methods: {
        ...mapMutations(['showMyMsg', 'maskShow']),
        scrollInit() {
            this.scrollList = new BScroll(this.$refs.scrollList, {
                click: true,
            })
        },
        closeMyMsg() {
            this.flag = false
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.showMyMsg()
            }, 200);
        },
        showMask() {
            this.maskShow()
        }
    }
}
</script>

<style lang="less" scoped>
.myMsg-wrapper {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.767);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  .myMsg-content {
    width: 80%;
    height: 100%;
    background: rgb(247, 247, 247);
    overflow: hidden;
    .header {
      min-height: 200px;
      background: rgb(110, 110, 110);
      position: relative;
      .user-wrapper {
        bottom: 10px;
        position: absolute;
        padding: 0 10px;
        width: 100%;
        .profile-photo {
          width: 70px;
          height: 70px;
          background: orange;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .user-msg {
          height: 30px;
          .user-name {
            color: #fff;
            font-size: 22px;
          }
          .glyphicon {
            color: rgb(197, 197, 197);
          }
          .level {
            padding: 0 8px;
            font-size: 10px;
            color: #fff;
            border: 1px solid #fff;
            border-radius: 8px;
          }
          .signOn {
            display: inline-block;
            height: 23px;
            padding: 0 10px;
            margin-top: 5px;
            font-size: 10px;
            border-radius: 15px;
            border: 1px solid #fff;
            line-height: 23px;
            float: right;
            a {
              text-decoration: none;
              color: #fff;
            }
          }
        }
      }
    }
    .music-list {
      width: 100%;
      ul {
        padding: 0 10px;
        width: 100%;
        background: #fff;
        li {
          color: #666;
          position: relative;
          button {
            display: block;
            padding: 10px 0;
            background: transparent;
            border: none;
            outline: none;
            width: 100%;
            text-align: left;
            span:last-of-type {
              color: #666;
              margin-left: 5px;
            }
          }
          .newMsg {
            position: absolute;
            right: 5px;
            top: 10px;
            font-size: 10px;
            padding: 0 6px;
            border-radius: 10px;
            color: #fff;
            background: #fd0c0c;
          }
        }
      }
    }
  }
  .myMsg-operate {
    display: flex;
    width: 80%;
    height: 40px;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    background: #fff;
    div {
      flex-grow: 1;
      color: #666;
      line-height: 40px;
      text-align: center;
    }
  }
}

.myMsg-enter {
  transform: translateX(-100%);
}
.myMsg-enter-to {
  transform: translateX(0);
}
.myMsg-leave {
  transform: translateX(0);
}
.myMsg-leave-to {
  transform: translateX(-100%);
}

.myMsg-leave-active,
.myMsg-enter-active {
  transition: all 0.1s ease-out;
}
</style>
