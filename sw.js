/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/01/30/STM32四大通信协议/1705736375374.png","422bee9d8474373d455e94f03a625c02"],["/2024/01/30/STM32四大通信协议/1705736385998.png","8297ca3d0162d9403175297d2bed2cd7"],["/2024/01/30/STM32四大通信协议/1705736505835.png","422bee9d8474373d455e94f03a625c02"],["/2024/01/30/STM32四大通信协议/1705736511255.png","0e1b016643ed1eb2a47e3f90d1bb3327"],["/2024/01/30/STM32四大通信协议/1705737398459.png","9394d78b3ae2ec2e3c8d647e5d215414"],["/2024/01/30/STM32四大通信协议/1705743117958.png","c9b6d366289ede6c91d5d7e66ea4272c"],["/2024/01/30/STM32四大通信协议/1705743432415.png","2808c891fb7ad5699f1baf0de29d1c37"],["/2024/01/30/STM32四大通信协议/1705745138344.png","51e283ab9b11d2362eb2521cab26d979"],["/2024/01/30/STM32四大通信协议/1705745521282.png","ff1003cd186e7edd419cadcbbe5ebb82"],["/2024/01/30/STM32四大通信协议/1705745717717.png","65c76d7c2fd63453ff80a1dcfce6b895"],["/2024/01/30/STM32四大通信协议/1705746225685.png","ab33f304cb8a40bbe535e029ffa659ec"],["/2024/01/30/STM32四大通信协议/1705746412968.png","570d92fa58d625ed80f41f34da7ed5fe"],["/2024/01/30/STM32四大通信协议/1705747154895.png","6c10719cafc46b5e017bfe489717bdff"],["/2024/01/30/STM32四大通信协议/1705747401629.png","4dd625c25c4c93cb258cb86f057a299c"],["/2024/01/30/STM32四大通信协议/1706197859960.png","ee91040014f45d6c2303293af9c36071"],["/2024/01/30/STM32四大通信协议/1706198238483.png","71dee5fae340d9dbefbaf51684ca5747"],["/2024/01/30/STM32四大通信协议/1706198286079.png","0c9c4e0fad5aef50c6d3f8564dd04e62"],["/2024/01/30/STM32四大通信协议/1706198552145.png","0c9c4e0fad5aef50c6d3f8564dd04e62"],["/2024/01/30/STM32四大通信协议/1706199429609.png","0ddfca6ccd3714bbfdab8c432d6f9cfc"],["/2024/01/30/STM32四大通信协议/1706200055360.png","add7abc3c1021ed5bb0220a4df41e1b3"],["/2024/01/30/STM32四大通信协议/1706200565288.png","6de4b4b44e62b8ac0591dec0880e6c2b"],["/2024/01/30/STM32四大通信协议/1706200615939.png","1a6d3edf1e9963eeef8c79f23a7012d5"],["/2024/01/30/STM32四大通信协议/1706200630177.png","8a3e71ddfe4873ffbac8f140785c0946"],["/2024/01/30/STM32四大通信协议/1706200648810.png","8a3e71ddfe4873ffbac8f140785c0946"],["/2024/01/30/STM32四大通信协议/1706253221276.png","16f5e2cee6f1c06d1e6208e85edece30"],["/2024/01/30/STM32四大通信协议/1706253359279.png","b8dcb6d67082cc5fe5ebcf521c8c4327"],["/2024/01/30/STM32四大通信协议/1706253396751.png","c9b6d366289ede6c91d5d7e66ea4272c"],["/2024/01/30/STM32四大通信协议/1706253487704.png","553a4edec6bdd22054d5cf4d18251a2b"],["/2024/01/30/STM32四大通信协议/1706253838890.png","e92df17686dfe520b7d352d753beffc3"],["/2024/01/30/STM32四大通信协议/1706254347422.png","098c72e8dfde3518742004070001b7fb"],["/2024/01/30/STM32四大通信协议/1706255081006.png","34fa1fa3dfd8ba894205d7294505dd50"],["/2024/01/30/STM32四大通信协议/1706255487441.png","a5c446b8bef0a811c0111798441128f3"],["/2024/01/30/STM32四大通信协议/1706255701792.png","27957fec5c291f9b2db8b83efb4cc6a4"],["/2024/01/30/STM32四大通信协议/1706255749763.png","d729a634a408a49701d7db2a96a1dd1e"],["/2024/01/30/STM32四大通信协议/1706255928324.png","e5bbf20754d6f3988a7946e4292a242d"],["/2024/01/30/STM32四大通信协议/1706256017333.png","23905cfb844de13c987b7924b24d3b44"],["/2024/01/30/STM32四大通信协议/1706256032654.png","8b5a1e86a75d505f96354381ecf3c64c"],["/2024/01/30/STM32四大通信协议/1706256043889.png","583f1af677989470186b27893c9058c3"],["/2024/01/30/STM32四大通信协议/1706256059025.png","cb7e08a7d0543013290c8076c0b72abc"],["/2024/01/30/STM32四大通信协议/1706263977088.png","09e2471a8f24eb969cac5e82c3ab1516"],["/2024/01/30/STM32四大通信协议/1706263989395.png","a0cd8c24aa07d21bf453abdb06d3c2a7"],["/2024/01/30/STM32四大通信协议/1706264194346.png","0a931c63822213427e20ecb48eeca8e7"],["/2024/01/30/STM32四大通信协议/1706264284743.png","501051abf4e4998763dc42759e8d44c5"],["/2024/01/30/STM32四大通信协议/1706264383307.png","38f4ac28b0727aaa3a28b16242269be3"],["/2024/01/30/STM32四大通信协议/1706264434067.png","59abbf4b43f814738016c7df8d945c69"],["/2024/01/30/STM32四大通信协议/1706264556589.png","947d30055ed46c5739c29eb5a09c1487"],["/2024/01/30/STM32四大通信协议/1706265129206.png","c9d0bb77b553acf66a94d5c42e68a45f"],["/2024/01/30/STM32四大通信协议/1706265164365.png","207210bd43cad624642fb84841943acb"],["/2024/01/30/STM32四大通信协议/1706265567624.png","08d7892e2ea12594f495ee1c2f0cc9c1"],["/2024/01/30/STM32四大通信协议/1706265575585.png","2d151cba110c40bdd4fd5ae9e12ca863"],["/2024/01/30/STM32四大通信协议/1706265587929.png","836d8d35b0600274f4e58cfdcfde3fd4"],["/2024/01/30/STM32四大通信协议/1706265831995.png","f65094195c8100ad043b90fabc07e390"],["/2024/01/30/STM32四大通信协议/1706265861339.png","5a6a688797ec9a99b487372d6d7e796b"],["/2024/01/30/STM32四大通信协议/1706267084943.png","fc3e54ebf99d6b14d2de3afef2ef06ae"],["/2024/01/30/STM32四大通信协议/1706267260181.png","4e193e897d4c0f22b26fee4193ddb44c"],["/2024/01/30/STM32四大通信协议/1706267294207.png","a3ae2ec07c2258a6755e7fb6d6b42d19"],["/2024/01/30/STM32四大通信协议/1706267321796.png","a7253529c069c79c2e6d7345d1d27a10"],["/2024/01/30/STM32四大通信协议/1706277356750.png","510df5a38ec879e43e53d80048ebc75c"],["/2024/01/30/STM32四大通信协议/1706277497270.png","55eaba872fd50273805e47a47dc55ded"],["/2024/01/30/STM32四大通信协议/1706280036159.png","5077eca17544384c55b6a67fb6edd214"],["/2024/01/30/STM32四大通信协议/1706280340445.png","fdf4dc5fefda6b957d11318bcc8d59da"],["/2024/01/30/STM32四大通信协议/1706280519452.png","84e77952661cb6ec856f3c5017255434"],["/2024/01/30/STM32四大通信协议/1706280584972.png","ba99d9850f7f00010481b4e010ab8f64"],["/2024/01/30/STM32四大通信协议/1706280625411.png","270bf8689608772c4875bfe03436d384"],["/2024/01/30/STM32四大通信协议/1706280660766.png","7c122a24f8813f7d57512f7642bb563c"],["/2024/01/30/STM32四大通信协议/1706280783134.png","a782cb3413b30baf88c90bc5cb133a1f"],["/2024/01/30/STM32四大通信协议/1706280807159.png","5709d7596d3655025ffd6f39bb379a01"],["/2024/01/30/STM32四大通信协议/1706280904218.png","2f3f3fea0f811972c26f7fd65ae23ae9"],["/2024/01/30/STM32四大通信协议/1706280941789.png","609cacac504229297d2b9229c2c72798"],["/2024/01/30/STM32四大通信协议/1706281198028.png","465a96228ef88e9b805183410e4a0f57"],["/2024/01/30/STM32四大通信协议/1706281226510.png","9b03e822d89aae2c009c9fc78b3cb4da"],["/2024/01/30/STM32四大通信协议/1706281236623.png","089401e41015e03264eb580427c7f5c2"],["/2024/01/30/STM32四大通信协议/1706281271396.png","3537a6b57cc059d2956eddac38575290"],["/2024/01/30/STM32四大通信协议/1706282048455.png","fd5cabf860bbf0c6c1b5152bb181e859"],["/2024/01/30/STM32四大通信协议/1706282079465.png","83d84734a65160205fc03ea9512e59bb"],["/2024/01/30/STM32四大通信协议/1706282124802.png","ba0fa0ad8d393afcc70f58c79b598877"],["/2024/01/30/STM32四大通信协议/1706282162689.png","974ee136a10ed9d96c4370980ec47159"],["/2024/01/30/STM32四大通信协议/1706363962945.png","52873c294dc8142d42c7c6b352c1be2d"],["/2024/01/30/STM32四大通信协议/1706364052710.png","08c48783647cca39a52bd6c9fea73e1d"],["/2024/01/30/STM32四大通信协议/1706364261138.png","b326f745cec8b7f673a7c5eecc67cb99"],["/2024/01/30/STM32四大通信协议/1706364301642.png","9ea23dbb5771206d2df8f4bc21f1dd17"],["/2024/01/30/STM32四大通信协议/1706364443610.png","deccdf68cbc6c7ed78c6c28a762d638b"],["/2024/01/30/STM32四大通信协议/1706365185213.png","273c9729b4440cbca82f64bc1765992e"],["/2024/01/30/STM32四大通信协议/1706365964060.png","a96d80d2fc1ba9e336f763c6b8cdf801"],["/2024/01/30/STM32四大通信协议/1706366018154.png","2fe4e22e9ef9b8bbe51a754fb07c78bf"],["/2024/01/30/STM32四大通信协议/1706366029738.png","ddc27ace105656301b4f1565b355c36f"],["/2024/01/30/STM32四大通信协议/1706366050574.png","fd7067dd600bf6824624a3145df7be66"],["/2024/01/30/STM32四大通信协议/1706366062786.png","936a09ecad8bfa55051ef5daabea54b2"],["/2024/01/30/STM32四大通信协议/1706366102368.png","707fbca92fbd06374a64878910eb9788"],["/2024/01/30/STM32四大通信协议/1706366291211.png","23f1575e89517870f50a1ab7835dd280"],["/2024/01/30/STM32四大通信协议/1706366317290.png","ce75185246ee26deb10f50a1f5653e36"],["/2024/01/30/STM32四大通信协议/1706366382518.png","fd34592dad0f2357e1df722671099628"],["/2024/01/30/STM32四大通信协议/1706366411492.png","b9c14232816dfe315a56598e5ad15c18"],["/2024/01/30/STM32四大通信协议/1706366433207.png","0919f030e4c29be21ca1773b8200a87f"],["/2024/01/30/STM32四大通信协议/USB转串口.png","0130fd495c79ad325cc1f74b5899a7b6"],["/2024/01/30/STM32四大通信协议/asc.png","de670e5abed55bfb394f072e037b95f0"],["/2024/01/30/STM32四大通信协议/index.html","970f50dd7eca58e8ee8008e4ed0b2621"],["/2024/01/30/STM32四大通信协议/四倍频.png","a63e1d64aa7e3537ae0d74d80f5f1471"],["/2024/01/30/STM32四大通信协议/接收hex数据包.png","bc818ffc59696efec5bfef76202f6e99"],["/2024/01/30/STM32四大通信协议/接收文本数据包.png","ce5aab4d019c12052e14d20b1dfc2bcd"],["/2024/01/30/STM32四大通信协议/数据模式.png","c782a6d6c3cbff2893e574b41eccf839"],["/2024/01/30/STM32四大通信协议/正交编码器.png","349dc0f01dc5b1ca0ecbf4adf596742d"],["/2024/01/30/STM32四大通信协议/编码器.png","e90b7560b71046207e6b42b93700a5ad"],["/2024/01/30/STM32四大通信协议/编码器接口.png","72f073ca6a141177db124612141b366a"],["/2024/01/30/STM32定时器与PID算法/1705690112223.png","349dc0f01dc5b1ca0ecbf4adf596742d"],["/2024/01/30/STM32定时器与PID算法/1705690390565.png","a63e1d64aa7e3537ae0d74d80f5f1471"],["/2024/01/30/STM32定时器与PID算法/1705734710966.png","314ab03acf4ba84294f5069bef6d65b9"],["/2024/01/30/STM32定时器与PID算法/1705734851593.png","72f073ca6a141177db124612141b366a"],["/2024/01/30/STM32定时器与PID算法/1705735207132.png","e90b7560b71046207e6b42b93700a5ad"],["/2024/01/30/STM32定时器与PID算法/1705736375374.png","422bee9d8474373d455e94f03a625c02"],["/2024/01/30/STM32定时器与PID算法/1705736385998.png","8297ca3d0162d9403175297d2bed2cd7"],["/2024/01/30/STM32定时器与PID算法/1705736505835.png","422bee9d8474373d455e94f03a625c02"],["/2024/01/30/STM32定时器与PID算法/1705736511255.png","0e1b016643ed1eb2a47e3f90d1bb3327"],["/2024/01/30/STM32定时器与PID算法/1705737398459.png","9394d78b3ae2ec2e3c8d647e5d215414"],["/2024/01/30/STM32定时器与PID算法/1705743117958.png","c9b6d366289ede6c91d5d7e66ea4272c"],["/2024/01/30/STM32定时器与PID算法/1705743432415.png","2808c891fb7ad5699f1baf0de29d1c37"],["/2024/01/30/STM32定时器与PID算法/1705745138344.png","51e283ab9b11d2362eb2521cab26d979"],["/2024/01/30/STM32定时器与PID算法/1705745521282.png","ff1003cd186e7edd419cadcbbe5ebb82"],["/2024/01/30/STM32定时器与PID算法/1705745717717.png","65c76d7c2fd63453ff80a1dcfce6b895"],["/2024/01/30/STM32定时器与PID算法/1705746225685.png","ab33f304cb8a40bbe535e029ffa659ec"],["/2024/01/30/STM32定时器与PID算法/1705746412968.png","570d92fa58d625ed80f41f34da7ed5fe"],["/2024/01/30/STM32定时器与PID算法/1705747154895.png","6c10719cafc46b5e017bfe489717bdff"],["/2024/01/30/STM32定时器与PID算法/1705747401629.png","4dd625c25c4c93cb258cb86f057a299c"],["/2024/01/30/STM32定时器与PID算法/1706197859960.png","ee91040014f45d6c2303293af9c36071"],["/2024/01/30/STM32定时器与PID算法/1706198238483.png","71dee5fae340d9dbefbaf51684ca5747"],["/2024/01/30/STM32定时器与PID算法/1706198286079.png","0c9c4e0fad5aef50c6d3f8564dd04e62"],["/2024/01/30/STM32定时器与PID算法/1706198552145.png","0c9c4e0fad5aef50c6d3f8564dd04e62"],["/2024/01/30/STM32定时器与PID算法/1706199429609.png","0ddfca6ccd3714bbfdab8c432d6f9cfc"],["/2024/01/30/STM32定时器与PID算法/1706200055360.png","add7abc3c1021ed5bb0220a4df41e1b3"],["/2024/01/30/STM32定时器与PID算法/1706200565288.png","6de4b4b44e62b8ac0591dec0880e6c2b"],["/2024/01/30/STM32定时器与PID算法/1706200615939.png","1a6d3edf1e9963eeef8c79f23a7012d5"],["/2024/01/30/STM32定时器与PID算法/1706200630177.png","8a3e71ddfe4873ffbac8f140785c0946"],["/2024/01/30/STM32定时器与PID算法/1706200648810.png","8a3e71ddfe4873ffbac8f140785c0946"],["/2024/01/30/STM32定时器与PID算法/1706253221276.png","16f5e2cee6f1c06d1e6208e85edece30"],["/2024/01/30/STM32定时器与PID算法/1706253359279.png","b8dcb6d67082cc5fe5ebcf521c8c4327"],["/2024/01/30/STM32定时器与PID算法/1706253396751.png","c9b6d366289ede6c91d5d7e66ea4272c"],["/2024/01/30/STM32定时器与PID算法/1706253487704.png","553a4edec6bdd22054d5cf4d18251a2b"],["/2024/01/30/STM32定时器与PID算法/1706253838890.png","e92df17686dfe520b7d352d753beffc3"],["/2024/01/30/STM32定时器与PID算法/1706254347422.png","098c72e8dfde3518742004070001b7fb"],["/2024/01/30/STM32定时器与PID算法/1706255081006.png","34fa1fa3dfd8ba894205d7294505dd50"],["/2024/01/30/STM32定时器与PID算法/1706255487441.png","a5c446b8bef0a811c0111798441128f3"],["/2024/01/30/STM32定时器与PID算法/1706255701792.png","27957fec5c291f9b2db8b83efb4cc6a4"],["/2024/01/30/STM32定时器与PID算法/1706255749763.png","d729a634a408a49701d7db2a96a1dd1e"],["/2024/01/30/STM32定时器与PID算法/1706255928324.png","e5bbf20754d6f3988a7946e4292a242d"],["/2024/01/30/STM32定时器与PID算法/1706256017333.png","23905cfb844de13c987b7924b24d3b44"],["/2024/01/30/STM32定时器与PID算法/1706256032654.png","8b5a1e86a75d505f96354381ecf3c64c"],["/2024/01/30/STM32定时器与PID算法/1706256043889.png","583f1af677989470186b27893c9058c3"],["/2024/01/30/STM32定时器与PID算法/1706256059025.png","cb7e08a7d0543013290c8076c0b72abc"],["/2024/01/30/STM32定时器与PID算法/1707463945385.png","2972cda55bf0033c1484ca5bd4587360"],["/2024/01/30/STM32定时器与PID算法/1707463962759.png","5430037e23972ae470a32c304edaf413"],["/2024/01/30/STM32定时器与PID算法/1707463978757.png","79dc42f1494f49b525224bd77a818bb6"],["/2024/01/30/STM32定时器与PID算法/1707463993099.png","c3c3a3737efe5c40b01feb9e33e0d53f"],["/2024/01/30/STM32定时器与PID算法/USB转串口.png","0130fd495c79ad325cc1f74b5899a7b6"],["/2024/01/30/STM32定时器与PID算法/index.html","8de61551a13bc813c221df983dc6dc81"],["/404.html","2ac85114cfbc8895e4889d8acdf94597"],["/about/index.html","90099b1be04f8d676504925a2cbc0fc1"],["/about_me/index.html","43229c98ce7b35b07d6bf4d75ac22b63"],["/archives/2024/01/index.html","f0248ea8b6fc001cc91f0c4850e78a08"],["/archives/2024/index.html","69eafe615f503fe3895fde525c7ebf7d"],["/archives/index.html","fbe143fc6d1bd5e73814bff371eac1c3"],["/categories/STM32/index.html","80a4345a612baf321d385b99e72c3401"],["/categories/index.html","402f6dc3ba9e130a6de5dbb1c182730e"],["/contact/index.html","bd7aaba97bfc8d5ca4e1dd01bb5ebeeb"],["/css/bb.css","30d9e8a442dd5aade4652fe3ba20ce76"],["/css/gitment.css","1b8f49f915af75fec02b3f0dc8338953"],["/css/matery.css","5e9b2b0d306a6ac00da5932a36914279"],["/css/my-gitalk.css","480bc1ec4dbca9e8e04948c901f24b2a"],["/css/my.css","d41d8cd98f00b204e9800998ecf8427e"],["/favicon.png","816976694e2623c3d523bfc750e223dc"],["/friends/index.html","331317db19fd47899990f425d63251ff"],["/index.html","81f94896d5efca0f548cf32e7ba0f5c1"],["/js/FunnyTitle.js","caaaac9a91ef8e2e42e84a975f0224f6"],["/js/matery.js","c97bfce9263ad84be971300fc1af3806"],["/js/search.js","c75f268465b5441df726fa8742bdc32a"],["/libs/animate/animate.min.css","178b651958ceff556cbc5f355e08bbf1"],["/libs/aos/aos.css","fb1fcc9be071dec9f9bac128ecd93ed4"],["/libs/aos/aos.js","b75892653a6eeb32b40e46cfea9c37d7"],["/libs/aplayer/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["/libs/aplayer/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/libs/awesome/css/all.css","a57878722538b47ed6d29be3309e8911"],["/libs/awesome/webfonts/fa-brands-400.eot","451b51d8700fb035bcaaa9e8710b384a"],["/libs/awesome/webfonts/fa-brands-400.svg","6a398b92cc24fb376bbb5e4c860f65f0"],["/libs/awesome/webfonts/fa-brands-400.ttf","189c0326f75931886d5b60cde8b5628f"],["/libs/awesome/webfonts/fa-brands-400.woff","85b063debeb5d5f079776ac1a9c924cb"],["/libs/awesome/webfonts/fa-brands-400.woff2","0425d661f34ffa46604c9dfa344c03bb"],["/libs/awesome/webfonts/fa-regular-400.eot","b6579220162705be426ad4db0dc43f6b"],["/libs/awesome/webfonts/fa-regular-400.svg","45eea78c6eaaae547d8e152285597f74"],["/libs/awesome/webfonts/fa-regular-400.ttf","9230982faf6ed4d1dab07babfb813777"],["/libs/awesome/webfonts/fa-regular-400.woff","14f22fbed8146dbf3b497bb32d8491b0"],["/libs/awesome/webfonts/fa-regular-400.woff2","772a0f14c850c8b0dfe283a95857583e"],["/libs/awesome/webfonts/fa-solid-900.eot","1898ebd2e3162e7ca8627073d865b893"],["/libs/awesome/webfonts/fa-solid-900.svg","356394b452df35cff89a782438fc50dd"],["/libs/awesome/webfonts/fa-solid-900.ttf","b1161bce5381a5fa7aacc073e1a01dd3"],["/libs/awesome/webfonts/fa-solid-900.woff","db525089f5101b59a66184d109e6f917"],["/libs/awesome/webfonts/fa-solid-900.woff2","4cc04a31c42f2f9d951547bbce75960b"],["/libs/background/canvas-nest.js","e75faf9047a9ae2b2da304d5f2e196f5"],["/libs/background/ribbon-dynamic.js","6c400a8f246c96f58ee7698b0b927f43"],["/libs/background/ribbon-refresh.min.js","6692e63df52b5230e673fc0a3aea5534"],["/libs/background/ribbon.min.js","52d83827dd2784a3d41b65694a6534e5"],["/libs/codeBlock/codeBlockFuction.js","ca6d40fbadf87d69c24eb662c38b37dc"],["/libs/codeBlock/codeCopy.js","0f1f221cc9672770376013c4d5185ca6"],["/libs/codeBlock/codeLang.js","32a2e820487d3c55685af9097a3cd559"],["/libs/codeBlock/codeShrink.js","0649e8c79e62bff308b79317a5243a42"],["/libs/cryptojs/crypto-js.min.js","a39fc84fa7659e1d898bbcddf20aa989"],["/libs/dplayer/DPlayer.min.css","31ac9b1a5a7f018dcc9a0e0f66261c08"],["/libs/dplayer/DPlayer.min.js","4097986cff510567068128f4b18004a6"],["/libs/echarts/echarts.min.js","b4af19a834bf7cd6435dd8e1ad24cc90"],["/libs/gitalk/gitalk.css","2f54bba6b0a2d38bedc76672264694d6"],["/libs/gitalk/gitalk.min.js","7526181d13660d1e4a2bbb3795d73120"],["/libs/gitment/gitment-default.css","a40267e37b1072c9494b11edf3eea907"],["/libs/gitment/gitment.js","44dfbc4401f57a16dddb04b9dd4b4c9b"],["/libs/instantpage/instantpage.js","bf3d880ae11db073905f220d65752b13"],["/libs/jqcloud/jqcloud-1.0.4.min.js","b5b4d1002ff256e9bed2b339f572dedc"],["/libs/jqcloud/jqcloud.css","c7b402dc7f1fd823488d80ea0d7a219d"],["/libs/jquery/jquery.min.js","f832e36068ab203a3f89b1795480d0d7"],["/libs/lightGallery/css/lightgallery.min.css","a94c4de3d8028fc56b148e8f66524e59"],["/libs/lightGallery/fonts/lg.eot","ecff11700aad0000cf3503f537d1df17"],["/libs/lightGallery/fonts/lg.svg","d896f5711afb974e38e49ced3b9e5a61"],["/libs/lightGallery/fonts/lg.ttf","4fe6f9caff8b287170d51d3d71d5e5c6"],["/libs/lightGallery/fonts/lg.woff","5fd4c338c1a1b1eeeb2c7b0a0967773d"],["/libs/lightGallery/img/loading.gif","87776ebd3eb7c2685c351a391de60b7b"],["/libs/lightGallery/img/video-play.png","beaa0609c2306e64e8716b717907ca9c"],["/libs/lightGallery/img/vimeo-play.png","e172b97b5c32af9813c8e88060d5ff3a"],["/libs/lightGallery/img/youtube-play.png","8f9f9d10283ee7cbb3f36bafe3e6f50c"],["/libs/lightGallery/js/lightgallery-all.min.js","d7491b79ebda3ba2356e81aac93e62ea"],["/libs/masonry/masonry.pkgd.min.js","d5761132889fee4a606e54d26675d2ea"],["/libs/materialize/materialize.min.css","3a5681d6939e48ba5038fbf8f9f244a2"],["/libs/materialize/materialize.min.js","87d84bf8b4cc051c16092d27b1a7d9b3"],["/libs/minivaline/MiniValine.js","74454c20239b5d0b6158d33b1ca38d82"],["/libs/others/busuanzi.pure.mini.js","fe678d1293b68256c959e1a7948d8eab"],["/libs/others/clicklove.js","83f7ad2f3ac2c29a5208ec952f9f7937"],["/libs/prism/prism.css","93bb1f846906ab54d3e4d1131e0887ff"],["/libs/scrollprogress/scrollProgress.min.js","63212ebfb10736224d44bcda8a155278"],["/libs/share/css/share.min.css","a5d28161d70468ec2378da676284a34f"],["/libs/share/fonts/iconfont.eot","e83ffaa95463f987abe5db5bbbe303cc"],["/libs/share/fonts/iconfont.svg","692cc856982ba0b73deadeadcd292317"],["/libs/share/fonts/iconfont.ttf","9ac2cc5ae8616eb50c033525dc14a5eb"],["/libs/share/fonts/iconfont.woff","bf0fc2ec6e2a614635e0ab6e81d059ef"],["/libs/share/js/jquery.share.min.js","044c903516dd20036471d65d5269821c"],["/libs/share/js/social-share.min.js","7d8197222dcdbe0e7e645a605bf76851"],["/libs/tocbot/tocbot.css","ceeba574cde73648632be0fd1ddc82de"],["/libs/tocbot/tocbot.min.js","6046c9a66555218b41b6219737579a89"],["/libs/valine/Valine.min.js","3c37a47598a8970c84db5591f01c483d"],["/libs/valine/av-min.js","3366ae1df9f80bcd9460ba633190b804"],["/medias/1/1.jpg","343b792980940b2885ffdcaab16c5b19"],["/medias/1/2.jpg","aea16042a7fa5cdce43825f639ecc238"],["/medias/1/3.jpg","cc7def4a6afe348f0f08e9015fbfa30e"],["/medias/1/5.jpg","4cd5bfcab3d7cbe9f371a3693feca772"],["/medias/avatar.jpg","f66a36e231eb8af76586aef183030260"],["/medias/background.jpg","7aa6a55f1e9d9bc39597f5582d6cf3fd"],["/medias/comment_bg 2.png","ce0a120a81ce2903b907996f574cf85c"],["/medias/comment_bg.png","11b6595db5912c6d78b08e96f1cc9023"],["/medias/contact.png","60741bc15683f46cace8e39e118968b8"],["/medias/cover.jpg","5bd0c1a38dd2276e92dfa12a932816a8"],["/medias/favicon.png","e2cec81eb5a49a1a680bf30db2fdf52e"],["/medias/ground.jpg","4ddd6a51ce6be5ac7f40871196d5c33b"],["/medias/icp.png","556ba3bb3e97b5b0348427df424b8c2f"],["/medias/logo.png","a68f03f1f32eb7e34c17254dd5ce3083"],["/medias/m_logo.png","816976694e2623c3d523bfc750e223dc"],["/medias/m_logo2.png","693c4a014360120f50ad23636615e7d3"],["/medias/m_logo3.png","29d4d60e6da572b0bfb76629d3889da5"],["/medias/myGallery/0.jpg","b813a40645dbd776c4c4fb555b29a0d6"],["/medias/myGallery/1.jpg","7aa6a55f1e9d9bc39597f5582d6cf3fd"],["/medias/myGallery/2.jpg","4ddd6a51ce6be5ac7f40871196d5c33b"],["/medias/myGallery/3.jpg","101b3183bdca737b25b3391a0dd08f3d"],["/medias/myGallery/4.jpg","18f807ec4327dbfe352f6176140aff74"],["/medias/myGallery/5.jpg","bfca06805237df8095da30264a7a6b6a"],["/medias/myGallery/6.jpg","5168a33793cfadd1e49d744af5f6c387"],["/medias/myGallery/7.jpg","b78d262ffd897958a71003230e178426"],["/medias/reward/alipay.jpg","04870d77ea3c0385dca3679c36fca0fa"],["/medias/reward/bao.jpg","f49968726218d09fcd3e90dff6f4f1a0"],["/medias/reward/wchat.jpg","2d88caa03ad1847d5e04b61886f5c274"],["/medias/reward/wechat.png","643f8e9c3d85731ada4b20db1924fdc9"],["/sw-register.js","1b0e5b81e1d8cf1ee60b5a1f960f6363"],["/tags/CAN/index.html","cf513d5b836956e22baefb1293d20c52"],["/tags/I2C/index.html","bfb386e922622923b87304d52e16a957"],["/tags/PID/index.html","49e8aca0b1e8263141d249c0bd9c9f70"],["/tags/SPI/index.html","6c36f29a1366a47372fd1eb1e46fa037"],["/tags/STM32/index.html","9b6124a649c8e3cf280c13c790afba13"],["/tags/USART/index.html","f48ec073be7ca27b0f98a378c7ec3507"],["/tags/index.html","09af5ab998be6a5733869ca14e0a9d94"]];
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
