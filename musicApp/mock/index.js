import Mock from 'mockjs'
import data from '../data.json'

Mock.mock('/music/user', {
  code: 0,
  codeMsg: 'success',
  data: data.user
})
Mock.mock('/music/commend0', {
  code: 0,
  codeMsg: 'success',
  data: data.commend0
})
Mock.mock('/music/commend1', {
  code: 0,
  codeMsg: 'success',
  data: data.commend1
})
Mock.mock('/music/friends#0', {
  code: 0,
  codeMsg: 'success',
  data: data.friends.cont0
})
Mock.mock('/music/friends#1', {
  code: 0,
  codeMsg: 'success',
  data: data.friends.cont1
})
Mock.mock('/music/radio#0', {
  code: 0,
  codeMsg: 'success',
  data: data.radio.cont0
})
Mock.mock('/music/radio#1', {
  code: 0,
  codeMsg: 'success',
  data: data.radio.cont1
})
Mock.mock('/music/hotMusic', {
  code: 0,
  codeMsg: 'success',
  data: data.search.hotMusic
})
Mock.mock('/music/ablum', {
  code: 0,
  codeMsg: 'success',
  data: data.musicList.ablum
})
Mock.mock('/music/myAblum', {
  code: 0,
  codeMsg: 'success',
  data: data.myAblum
})
Mock.mock('/music/songData', {
  code: 0,
  codeMsg: 'success',
  data: data.songData
})
