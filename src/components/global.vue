<script>

var info = {
    userid:null,
    username:'王大傻',
    useruid:null,
    usersex:'男',
    useraddress:'c2宿舍',
    userpic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549169583677&di=7858120e0c5d059a85d8ca0a775b5518&imgtype=0&src=http%3A%2F%2Fbbsimage.res.meizu.com%2Fforum%2F2019%2F01%2F16%2F205706reNu66j8Ajh0ba83.png',
    userphone:13888888888,
    userselfintro:'我就是傻逼，不服打我啊',
}
var list = [
  {
    username:'七八九',
    userpic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549169583677&di=7858120e0c5d059a85d8ca0a775b5518&imgtype=0&src=http%3A%2F%2Fbbsimage.res.meizu.com%2Fforum%2F2019%2F01%2F16%2F205706reNu66j8Ajh0ba83.png',
    time:1549181649005,
    content:'我的女朋友丢了，谁帮我找回来',
    picList:[
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549193827898&di=1f5b5ea9fe1c80a10325223cbef5db0a&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2Ff%2F4e%2F7ab1de77d6.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549193866992&di=520cfbef995aab6ba87936cc003e54df&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F07%2F20180107104752_Nsx5d.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549193922879&di=37e50e375a1e522a85df79261bcc802e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F16%2F20161216170612_HCMrw.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549193991671&di=f409ecae9e57da62ecdfff82033cf52e&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180308%2F25fada5377714007a84a4111b567e0b6.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549194053368&di=3731500207695e1c9b2e95246c239718&imgtype=0&src=http%3A%2F%2Fshp.qpic.cn%2Fqqvideo_ori%2F0%2Fq0824s8f30h_496_280%2F0',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549788804&di=7c3be75e0f2a35a9306c84f30d25abd7&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F41dc2e7556a8729ced1c0f390fcbdda1e5abdc36.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549194195629&di=81a3cca402d3a96fef7ebae13b168de6&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181007%2Ff5e7e07b43094dee8eda47f0262c1d3e.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549194220214&di=993ae21e0eabc9434e6495f73d6e0801&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F0ff74df07a1cf5b2ee2d4874c39007967b267949.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549194235984&di=21c46dd6f0e5f4d90411631551217ac2&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F7155eb4b6f7bf95befaefdfba90938b226830d42.jpg'
    ],
    goodNumber:999,
    skimNumber:999,
    commentNumber:998,
  },
  {
    username:'ajax',
    userpic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549193922879&di=37e50e375a1e522a85df79261bcc802e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F16%2F20161216170612_HCMrw.jpeg',
    time:918036874002,
    content:'我的作业不见了！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！',
    goodNumber:'',
    skimNumber:'',
    commentNumber:'',
    picList:[
     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549193827898&di=1f5b5ea9fe1c80a10325223cbef5db0a&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2Ff%2F4e%2F7ab1de77d6.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549193866992&di=520cfbef995aab6ba87936cc003e54df&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F07%2F20180107104752_Nsx5d.jpeg',
    ]
  },
    {
    username:'ajax',
    userpic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549194235984&di=21c46dd6f0e5f4d90411631551217ac2&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F7155eb4b6f7bf95befaefdfba90938b226830d42.jpg',
    time:918036874002,
    content:'我的猫片去哪里了，黑色的，说到拉黑，我就想起了西游记上偷我师傅袈裟的黑熊精，明年年初中美合拍，文体两开花，多多关注',
    goodNumber:'',
    skimNumber:'',
    commentNumber:'',
    comment:'',
    picList:[
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549193827898&di=1f5b5ea9fe1c80a10325223cbef5db0a&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2Ff%2F4e%2F7ab1de77d6.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549193866992&di=520cfbef995aab6ba87936cc003e54df&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F07%2F20180107104752_Nsx5d.jpeg',
       'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549194053368&di=3731500207695e1c9b2e95246c239718&imgtype=0&src=http%3A%2F%2Fshp.qpic.cn%2Fqqvideo_ori%2F0%2Fq0824s8f30h_496_280%2F0',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549788804&di=7c3be75e0f2a35a9306c84f30d25abd7&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F41dc2e7556a8729ced1c0f390fcbdda1e5abdc36.jpg',
    ]
  },

];
var logState = 0;
var test =[1,2,3];
  export default
  {
      info,
      list,
      logState,
      test,
  }
</script>