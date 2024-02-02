/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/01/30/STM32四大通信协议/1705736375374.png","36a3d7020a28328be8bd6573dcafbfe4"],["/2024/01/30/STM32四大通信协议/1705736385998.png","8f018339808ee3ff08ae2b23ac9d10f3"],["/2024/01/30/STM32四大通信协议/1705736505835.png","36a3d7020a28328be8bd6573dcafbfe4"],["/2024/01/30/STM32四大通信协议/1705736511255.png","437449ca22a3524b6ab6ca7744299c42"],["/2024/01/30/STM32四大通信协议/1705737398459.png","20e4ff71973b09ec1e5ad9d481ccf8ea"],["/2024/01/30/STM32四大通信协议/1705743117958.png","27b26198d0e9380a5cb83d04bca74471"],["/2024/01/30/STM32四大通信协议/1705743432415.png","5258526e608330c647811126a8daf8af"],["/2024/01/30/STM32四大通信协议/1705745138344.png","3e1832da6d94d353c398542221699b39"],["/2024/01/30/STM32四大通信协议/1705745521282.png","fdeb7858ec76ec49a1e1ba9423ce1ce7"],["/2024/01/30/STM32四大通信协议/1705745717717.png","de992036a3e59f4a450fcd2250ac8ce3"],["/2024/01/30/STM32四大通信协议/1705746225685.png","3f7864e12ecc91c059db9f51e6a63267"],["/2024/01/30/STM32四大通信协议/1705746412968.png","1d0018d0df0c616637be9f5b0b7e4f64"],["/2024/01/30/STM32四大通信协议/1705747154895.png","dbcbfb18b7dd65820285de1ffe754eb6"],["/2024/01/30/STM32四大通信协议/1705747401629.png","87f0d58ee7feb836dcdad47cff1a4423"],["/2024/01/30/STM32四大通信协议/1706197859960.png","ceb203db4eca6a4773bcb448c9910a0f"],["/2024/01/30/STM32四大通信协议/1706198238483.png","a51ee31e5f67ec8cf4976ae82824feeb"],["/2024/01/30/STM32四大通信协议/1706198286079.png","aa986cb6de9967ab78daecad16f052fa"],["/2024/01/30/STM32四大通信协议/1706198552145.png","aa986cb6de9967ab78daecad16f052fa"],["/2024/01/30/STM32四大通信协议/1706199429609.png","35db4f086c544bbb8481f12c464a0b61"],["/2024/01/30/STM32四大通信协议/1706200055360.png","adccb144d6ef20eb884a26285be735d1"],["/2024/01/30/STM32四大通信协议/1706200565288.png","2277c258debf09ec5ec2206da2cd26b4"],["/2024/01/30/STM32四大通信协议/1706200615939.png","f88748bf2b63f32fda773613355226c7"],["/2024/01/30/STM32四大通信协议/1706200630177.png","ff188e5433c4dc539b10ce553a3378aa"],["/2024/01/30/STM32四大通信协议/1706200648810.png","ff188e5433c4dc539b10ce553a3378aa"],["/2024/01/30/STM32四大通信协议/1706253221276.png","dd12b75e0d51ffe1b63aeb837cc7365c"],["/2024/01/30/STM32四大通信协议/1706253359279.png","b7ec9627549e57dacf7825d5ab4d6761"],["/2024/01/30/STM32四大通信协议/1706253396751.png","27b26198d0e9380a5cb83d04bca74471"],["/2024/01/30/STM32四大通信协议/1706253487704.png","19d724c782aeff2da5007bc26ae1a0d1"],["/2024/01/30/STM32四大通信协议/1706253838890.png","7b1ac67b4962330a85e5f80bd4333207"],["/2024/01/30/STM32四大通信协议/1706254347422.png","debf21649fe34e365d60e25aa5450888"],["/2024/01/30/STM32四大通信协议/1706255081006.png","b2333a7946729a297b11e24f7a95b135"],["/2024/01/30/STM32四大通信协议/1706255487441.png","406ebfda11ddf2a2d83abc3ca7e6643a"],["/2024/01/30/STM32四大通信协议/1706255701792.png","3656737dc29dd9aa523485986881c1f6"],["/2024/01/30/STM32四大通信协议/1706255749763.png","58a31f75316a4a3725acb1a4bacedca8"],["/2024/01/30/STM32四大通信协议/1706255928324.png","6f98ffdddcc637627c2771e413a28711"],["/2024/01/30/STM32四大通信协议/1706256017333.png","4dfccc17eb3e0196c61c4fa9c093741f"],["/2024/01/30/STM32四大通信协议/1706256032654.png","d82dc81c32b0b6070edfd585a35301f7"],["/2024/01/30/STM32四大通信协议/1706256043889.png","b0d1a5c0e99b97a44f829e8918c98ece"],["/2024/01/30/STM32四大通信协议/1706256059025.png","0542e62d329b8e45d73cfd5f11762277"],["/2024/01/30/STM32四大通信协议/1706263977088.png","f221bdf27098c6bed353bab02858f015"],["/2024/01/30/STM32四大通信协议/1706263989395.png","18c4594c16f4ee9749c9912874d9db6e"],["/2024/01/30/STM32四大通信协议/1706264194346.png","af84d2eca61b35a7915254aee5265acf"],["/2024/01/30/STM32四大通信协议/1706264284743.png","029c27fed2e48af3bf35a50681b91ae0"],["/2024/01/30/STM32四大通信协议/1706264383307.png","23009ca556f3aa42657233d8076f30e3"],["/2024/01/30/STM32四大通信协议/1706264434067.png","a3e7a338409ffd52964abdc19a6356a5"],["/2024/01/30/STM32四大通信协议/1706264556589.png","81b81688a9d4234f1e5669f74cc2de16"],["/2024/01/30/STM32四大通信协议/1706265129206.png","36be5621753e68be63644f55659f07f6"],["/2024/01/30/STM32四大通信协议/1706265164365.png","ea3b1e8124937e0b3a03cadf2b2cb075"],["/2024/01/30/STM32四大通信协议/1706265567624.png","b948f68cb73f00da7488f2141a9ba565"],["/2024/01/30/STM32四大通信协议/1706265575585.png","aacaae0d4923227da4db56411d3c957d"],["/2024/01/30/STM32四大通信协议/1706265587929.png","ed91779a562807d3c60b6b8df4c338fd"],["/2024/01/30/STM32四大通信协议/1706265831995.png","ca9e2200eb939902f92d2aa5b453beca"],["/2024/01/30/STM32四大通信协议/1706265861339.png","ed0aff7c8232fc03c354d2e18a4d8da2"],["/2024/01/30/STM32四大通信协议/1706267084943.png","bc73fb07c4f8b09d3f4e514868fe5f37"],["/2024/01/30/STM32四大通信协议/1706267260181.png","157739b5dc586f92ec28a09bfef21911"],["/2024/01/30/STM32四大通信协议/1706267294207.png","eecd8c8c88c9000503b708dd8b6602ca"],["/2024/01/30/STM32四大通信协议/1706267321796.png","6dc2ff9b52808c7c44311f94ecb74093"],["/2024/01/30/STM32四大通信协议/1706277356750.png","5098244d054ac66813893c81f0413355"],["/2024/01/30/STM32四大通信协议/1706277497270.png","7658f94c81f8319c4357ec838efdf01c"],["/2024/01/30/STM32四大通信协议/1706280036159.png","2370e397fa6bba25f8950da6b875b7de"],["/2024/01/30/STM32四大通信协议/1706280340445.png","c99ec00df413bf68e0f31450e6d370da"],["/2024/01/30/STM32四大通信协议/1706280519452.png","1bead297e969107fa1cda8bb3c0bc30c"],["/2024/01/30/STM32四大通信协议/1706280584972.png","849b45b70221fe1bac76cc20bd6dd17a"],["/2024/01/30/STM32四大通信协议/1706280625411.png","77ee21b0b7befc75365eda10a1c1cdfa"],["/2024/01/30/STM32四大通信协议/1706280660766.png","f14e3a111c801dcda8f95fc2c2c39e9e"],["/2024/01/30/STM32四大通信协议/1706280783134.png","fb471cd8110acf7d8396b666250468ee"],["/2024/01/30/STM32四大通信协议/1706280807159.png","544be518863b5848f6e26b8c13bb782c"],["/2024/01/30/STM32四大通信协议/1706280904218.png","a933bcc82c3f50db574d8705eed0e3c5"],["/2024/01/30/STM32四大通信协议/1706280941789.png","42889fcd5e17a1d461b876b48d24b595"],["/2024/01/30/STM32四大通信协议/1706281198028.png","6c529466bb61e50514ab110687f9d510"],["/2024/01/30/STM32四大通信协议/1706281226510.png","afe2fe87ec15466830f43793600c3dfc"],["/2024/01/30/STM32四大通信协议/1706281236623.png","3e206268ba2b603de78eb25115850842"],["/2024/01/30/STM32四大通信协议/1706281271396.png","2b2b239f35de6a1bb242e4564d5deb1b"],["/2024/01/30/STM32四大通信协议/1706282048455.png","6659c978001daad5ef1ebb3923dfb02b"],["/2024/01/30/STM32四大通信协议/1706282079465.png","f7375dfa00458321152fbb58ea40fde8"],["/2024/01/30/STM32四大通信协议/1706282124802.png","797b15af2071cac4ce289279a8deea12"],["/2024/01/30/STM32四大通信协议/1706282162689.png","100059a9cb64abe5b086609b327944a6"],["/2024/01/30/STM32四大通信协议/1706363962945.png","c360872f98257df3a0a0b6431c3d64f2"],["/2024/01/30/STM32四大通信协议/1706364052710.png","7186e5dd411fdbca431751467bd0ff1b"],["/2024/01/30/STM32四大通信协议/1706364261138.png","0f35dccd31ce1780cd2e08cd3252429c"],["/2024/01/30/STM32四大通信协议/1706364301642.png","fe2b145af550525f531c107475067b59"],["/2024/01/30/STM32四大通信协议/1706364443610.png","428cd2be19399a4eacf3f7c3f2ee80a3"],["/2024/01/30/STM32四大通信协议/1706365185213.png","3aae774eec3e5becfa7c55bfd9b01499"],["/2024/01/30/STM32四大通信协议/1706365964060.png","6723285f3aeaa0516fc984f298ee8e50"],["/2024/01/30/STM32四大通信协议/1706366018154.png","8bf7033e051e4af9fc007b3489e48964"],["/2024/01/30/STM32四大通信协议/1706366029738.png","2db44794672b9147403c66866c74158c"],["/2024/01/30/STM32四大通信协议/1706366050574.png","e86813048b90d49808e8cb4b2de027db"],["/2024/01/30/STM32四大通信协议/1706366062786.png","bbc56eb92d180bbe1b1c49ffe55b8af7"],["/2024/01/30/STM32四大通信协议/1706366102368.png","493795d27753f90c7b04dd180e1ff12b"],["/2024/01/30/STM32四大通信协议/1706366291211.png","92046ecb11f341866adca1bbe9a70390"],["/2024/01/30/STM32四大通信协议/1706366317290.png","8d4c06542cb840fe5b8a8e00b119c7f2"],["/2024/01/30/STM32四大通信协议/1706366382518.png","cd62e22a2d265e637a0ecb12d145c708"],["/2024/01/30/STM32四大通信协议/1706366411492.png","0b66184e8c373aa3ce0ecfedd59ed5f1"],["/2024/01/30/STM32四大通信协议/1706366433207.png","65846624fc532f794c629bf2bb512db8"],["/2024/01/30/STM32四大通信协议/USB转串口.png","4e6ae02d9214823681ea78ccab941961"],["/2024/01/30/STM32四大通信协议/asc.png","f22475b9194d00d260afe687a89a9b18"],["/2024/01/30/STM32四大通信协议/index.html","38f4f23a191b489e51f6643742f0eec2"],["/2024/01/30/STM32四大通信协议/四倍频.png","0fcf4c2a924614fc9d84d1c2f741d954"],["/2024/01/30/STM32四大通信协议/接收hex数据包.png","5ebfa2d6401a661cbf1c61b6720b8023"],["/2024/01/30/STM32四大通信协议/接收文本数据包.png","ef85692c07c2ae2016e1e617867c3a9a"],["/2024/01/30/STM32四大通信协议/数据模式.png","b1f5fb1e39c77a9202efbd72db870a09"],["/2024/01/30/STM32四大通信协议/正交编码器.png","3480508a81c11925bc2b270ea37b8b77"],["/2024/01/30/STM32四大通信协议/编码器.png","90a3365ddba331937321425a68c709f1"],["/2024/01/30/STM32四大通信协议/编码器接口.png","90ea45e17aa15cbd4d048edfab263af5"],["/2024/01/30/STM32定时器与PID算法/USB转串口.png","4e6ae02d9214823681ea78ccab941961"],["/2024/01/30/STM32定时器与PID算法/index.html","844386e4b18676ccac785d41ff19c16b"],["/404.html","29c64b0295b45768c2cfbbf847af4614"],["/about/index.html","989806aedc2396440ea557bb26bf5368"],["/about_me/index.html","d5cfc1f46e73157f16ebae21bc1ddf62"],["/archives/2024/01/index.html","eb7b58f92f0fa18ec56b5ebc83208916"],["/archives/2024/index.html","562844c50224cca6663fc8fbcdf8559c"],["/archives/index.html","4b53a2090452148a0bab05eaa52cf174"],["/categories/PID/index.html","5ab4a53a993f1033c673db05d3aab87f"],["/categories/STM32/index.html","48bb70bf0fed9e23be6d82d84299d16f"],["/categories/index.html","da8b3f666819c5489b3d1d4b9eea1902"],["/contact/index.html","435253494a0058fb2fe734620d3c8651"],["/css/bb.css","a13497fcf67377687248cad43633417c"],["/css/gitment.css","dcd15488193705c273213e72e5ebb7ce"],["/css/matery.css","d7a3bef358fd1e6fb97bfbaac7fa2c71"],["/css/my-gitalk.css","3de42b649a2216cc9bbee350cde6a7e0"],["/css/my.css","c4ad2103f0a537e360bd16650e547b22"],["/css/prism-tomorrow.css","f46d7519e3b65a6912814727b47a57ff"],["/favicon.png","be089375df59e12ef7226bdc1d1756bc"],["/friends/index.html","2c778bb3a5aab3a2d566eaef4a441187"],["/index.html","a962015dffbebc208b108d7594ef9c22"],["/js/FunnyTitle.js","c25f8f06d2cbcf83f8c7d0aba3b78570"],["/js/matery.js","c2d4306a24948ffd6f7f853449c2e44b"],["/js/search.js","23158886da44ec57f9d355b68ff1bac2"],["/libs/animate/animate.min.css","178b651958ceff556cbc5f355e08bbf1"],["/libs/aos/aos.css","04140612fb8b418cda27dee6ecf61042"],["/libs/aos/aos.js","9cc58a148779953a5ebe9360d6cf978c"],["/libs/aplayer/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["/libs/aplayer/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/libs/awesome/css/all.css","0e6a8d020eceb660ebe98adad8639825"],["/libs/awesome/webfonts/fa-brands-400.eot","451b51d8700fb035bcaaa9e8710b384a"],["/libs/awesome/webfonts/fa-brands-400.svg","8528edfd60e8bc4274c0eadf6b121a3c"],["/libs/awesome/webfonts/fa-brands-400.ttf","189c0326f75931886d5b60cde8b5628f"],["/libs/awesome/webfonts/fa-brands-400.woff","85b063debeb5d5f079776ac1a9c924cb"],["/libs/awesome/webfonts/fa-brands-400.woff2","0425d661f34ffa46604c9dfa344c03bb"],["/libs/awesome/webfonts/fa-regular-400.eot","b6579220162705be426ad4db0dc43f6b"],["/libs/awesome/webfonts/fa-regular-400.svg","ec9318dc8ba3ec3cbb379f2d40f300cb"],["/libs/awesome/webfonts/fa-regular-400.ttf","9230982faf6ed4d1dab07babfb813777"],["/libs/awesome/webfonts/fa-regular-400.woff","14f22fbed8146dbf3b497bb32d8491b0"],["/libs/awesome/webfonts/fa-regular-400.woff2","772a0f14c850c8b0dfe283a95857583e"],["/libs/awesome/webfonts/fa-solid-900.eot","1898ebd2e3162e7ca8627073d865b893"],["/libs/awesome/webfonts/fa-solid-900.svg","f331e75b803f42d96aaba8540f29d3b3"],["/libs/awesome/webfonts/fa-solid-900.ttf","b1161bce5381a5fa7aacc073e1a01dd3"],["/libs/awesome/webfonts/fa-solid-900.woff","db525089f5101b59a66184d109e6f917"],["/libs/awesome/webfonts/fa-solid-900.woff2","4cc04a31c42f2f9d951547bbce75960b"],["/libs/background/canvas-nest.js","a62fd97db8d4bce3a5e30406831e398d"],["/libs/background/ribbon-dynamic.js","eb6e9d5f62d717fa62445227883dc7b7"],["/libs/background/ribbon-refresh.min.js","6692e63df52b5230e673fc0a3aea5534"],["/libs/background/ribbon.min.js","52d83827dd2784a3d41b65694a6534e5"],["/libs/codeBlock/codeBlockFuction.js","1f379c32001349805cb987371cfccd1a"],["/libs/codeBlock/codeCopy.js","efa20c294ac279ca9c5a55e4299b80be"],["/libs/codeBlock/codeLang.js","dc4533be151964237f2a0006db27e5fa"],["/libs/codeBlock/codeShrink.js","ae277c5d8f8336fce64f89203b926d19"],["/libs/cryptojs/crypto-js.min.js","a39fc84fa7659e1d898bbcddf20aa989"],["/libs/dplayer/DPlayer.min.css","31ac9b1a5a7f018dcc9a0e0f66261c08"],["/libs/dplayer/DPlayer.min.js","4097986cff510567068128f4b18004a6"],["/libs/echarts/echarts.min.js","b4af19a834bf7cd6435dd8e1ad24cc90"],["/libs/gitalk/gitalk.css","e4369194a22c7aaf65af93b2a04edb94"],["/libs/gitalk/gitalk.min.js","7526181d13660d1e4a2bbb3795d73120"],["/libs/gitment/gitment-default.css","46f304e637384c546f25b5ad90f0fe5a"],["/libs/gitment/gitment.js","2d64177544df22f08ccc1c86fc181e0e"],["/libs/instantpage/instantpage.js","47fcedd7bba8eb1ad3b035c8727f06b5"],["/libs/jqcloud/jqcloud-1.0.4.min.js","b5b4d1002ff256e9bed2b339f572dedc"],["/libs/jqcloud/jqcloud.css","978ed746c5673321fba8401ed6a536ac"],["/libs/jquery/jquery.min.js","f832e36068ab203a3f89b1795480d0d7"],["/libs/lightGallery/css/lightgallery.min.css","a94c4de3d8028fc56b148e8f66524e59"],["/libs/lightGallery/fonts/lg.eot","ecff11700aad0000cf3503f537d1df17"],["/libs/lightGallery/fonts/lg.svg","4cf7d0890238750cf9fd18878fea096f"],["/libs/lightGallery/fonts/lg.ttf","4fe6f9caff8b287170d51d3d71d5e5c6"],["/libs/lightGallery/fonts/lg.woff","5fd4c338c1a1b1eeeb2c7b0a0967773d"],["/libs/lightGallery/img/loading.gif","bbdac9cda255c54bfd809110aff87898"],["/libs/lightGallery/img/video-play.png","d672259b56b5dd1abdff3a98d87864e8"],["/libs/lightGallery/img/vimeo-play.png","a951123e4f7cb5d037a6a872f001a8af"],["/libs/lightGallery/img/youtube-play.png","6267452d4f9c32c7550cec6587f985d3"],["/libs/lightGallery/js/lightgallery-all.min.js","d7491b79ebda3ba2356e81aac93e62ea"],["/libs/masonry/masonry.pkgd.min.js","d5761132889fee4a606e54d26675d2ea"],["/libs/materialize/materialize.min.css","3a5681d6939e48ba5038fbf8f9f244a2"],["/libs/materialize/materialize.min.js","87d84bf8b4cc051c16092d27b1a7d9b3"],["/libs/minivaline/MiniValine.js","e5daebb3b28977819ad51a62d38a52b9"],["/libs/others/busuanzi.pure.mini.js","4c9a89414b97bb2053ccc7cb83c83b6e"],["/libs/others/clicklove.js","6a3861c11c04010dd4de27c162cb8a83"],["/libs/prism/prism.css","9de440b6e18b43a39139958655391e18"],["/libs/scrollprogress/scrollProgress.min.js","63212ebfb10736224d44bcda8a155278"],["/libs/share/css/share.min.css","a5d28161d70468ec2378da676284a34f"],["/libs/share/fonts/iconfont.eot","e83ffaa95463f987abe5db5bbbe303cc"],["/libs/share/fonts/iconfont.svg","6b3cbfae255ab1f2c1e8e8bfc80754d4"],["/libs/share/fonts/iconfont.ttf","9ac2cc5ae8616eb50c033525dc14a5eb"],["/libs/share/fonts/iconfont.woff","bf0fc2ec6e2a614635e0ab6e81d059ef"],["/libs/share/js/jquery.share.min.js","044c903516dd20036471d65d5269821c"],["/libs/share/js/social-share.min.js","7d8197222dcdbe0e7e645a605bf76851"],["/libs/tocbot/tocbot.css","a260895566c6a9f968a9101d5510f7d6"],["/libs/tocbot/tocbot.min.js","6046c9a66555218b41b6219737579a89"],["/libs/valine/Valine.min.js","3c37a47598a8970c84db5591f01c483d"],["/libs/valine/av-min.js","df7538b359e7a7e904c430e8385b44da"],["/medias/avatar.jpg","415de4d5d462d6bd318c09824113e54e"],["/medias/background.jpg","befc5107a541029885ec9a50419f423e"],["/medias/banner/0.jpg","306003d8042084347393c395cf75c56d"],["/medias/banner/1.jpg","9269002d0873d0e0fe9c9384507a0f81"],["/medias/banner/2.jpg","9d5259c1c229c7b2a7ea813b5246ce26"],["/medias/banner/3.jpg","8c7505b632239a7c4e39f1667c3928b0"],["/medias/banner/4.jpg","86b8effb2e19b0251f53a7dd8869dc8e"],["/medias/banner/5.jpg","ac669fc927093822996b6bfbafc9c3a0"],["/medias/banner/6.jpg","a939c8c257fad2cf32ff4db949f6d578"],["/medias/comment_bg.png","04208f25e34b8f29f072efbb2e212c86"],["/medias/contact.png","05f80f75317895d4d6a5c0b39c18236e"],["/medias/cover.jpg","1253d8cf7abf8e92af47bda2bf61bd84"],["/medias/favicon.png","bb44feefd80d6541316f0a21cb5cb824"],["/medias/featureimages/0.jpg","f751cba3a4cd6381611bb4ec97d35e77"],["/medias/featureimages/1.jpg","d440f1a8faa3af050511b79ae30a10b0"],["/medias/featureimages/10.jpg","daaa0bfde5bade9fd47a9828a89c1044"],["/medias/featureimages/11.jpg","c613fbd6f7fadb8e65fdae620d89d277"],["/medias/featureimages/12.jpg","df9abf1fa933cee751d211828c35e4f5"],["/medias/featureimages/13.jpg","677c90f32232dd162b9c504ff176b100"],["/medias/featureimages/14.jpg","891ea5f9186f889adef7b215d9be9948"],["/medias/featureimages/15.jpg","3cf1acc3d317690beae0520a1e606b30"],["/medias/featureimages/16.jpg","403a5973092edf7b1fc9cfb809ed4b05"],["/medias/featureimages/17.jpg","a88c2a1cc175f75b8b60f3224026b4de"],["/medias/featureimages/18.jpg","d8104647c594f21438cbc17331c57025"],["/medias/featureimages/19.jpg","86258814e4374b85adac9bd8235ad110"],["/medias/featureimages/2.jpg","d2f7104d393ee322de0cba7313eddf74"],["/medias/featureimages/20.jpg","0ec7a7cc344f3d47dbc556ea312a365f"],["/medias/featureimages/21.jpg","7202402f259237ea1f3f6bb82d208888"],["/medias/featureimages/22.jpg","6b1b1da789eecd376a5e6843314f26ad"],["/medias/featureimages/23.jpg","95ea042be75c28794ddca649388ad3c7"],["/medias/featureimages/3.jpg","afcee76cc47ff729c484202e201cafd4"],["/medias/featureimages/4.jpg","ddd80ccca8d84079255bbfbf4244debd"],["/medias/featureimages/5.jpg","eeb46fbd8f9c6999a2f3fbdcf34e8b3e"],["/medias/featureimages/6.jpg","ae4562052cf07bc1912d5fd90e00b2ce"],["/medias/featureimages/7.jpg","af5b8a1b0fbab59e68a69005b2a0eeb7"],["/medias/featureimages/8.jpg","6d9136c0bf542e136dd70a6a7c97521b"],["/medias/featureimages/9.jpg","52e8f9aca543d2d4838c14bce33ecee1"],["/medias/ground.jpg","a680ee52a1f5623a8b419e4249b4139c"],["/medias/icp.png","60aa047315ba11596d9f954900c86fdb"],["/medias/logo.png","6fd306e0fb239e42ec8f82793e6ae6ee"],["/medias/m_logo.png","be089375df59e12ef7226bdc1d1756bc"],["/medias/reward/alipay.jpg","04870d77ea3c0385dca3679c36fca0fa"],["/medias/reward/bao.jpg","6e10d513f9030acf4483f7a25ca42649"],["/medias/reward/wechat.png","643f8e9c3d85731ada4b20db1924fdc9"],["/sw-register.js","a0c8e60da06d0fb91b63e5bc19300533"],["/tags/CAN/index.html","b7aec5b32f60160b8a545d91f626f60a"],["/tags/I2C/index.html","7b04e559d26d09a5db9e643fb1523172"],["/tags/PID/index.html","392e4db1b29bc597219379c10b3d30fc"],["/tags/SPI/index.html","cc1e5cb2e61097f2454c7a94f37c78eb"],["/tags/STM32/index.html","040788d606de4bf3f55da9dcc347c274"],["/tags/USART/index.html","ab1b6951feaa68e85e1bf86c5aea0cc5"],["/tags/index.html","07a43b937e9245cb6556313de9f65d38"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
