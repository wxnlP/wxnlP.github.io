## 1. 内容简介

```
----competition2023
--Code  代码
--Doc   指导文档
--Pkgs  环境配置安装包
--Model 建模文件
```

### 1.1 自我介绍

李志豪，**河南人**，录取专业是工业工程，大一转专业到了**智能制造工程**(如果是大一新生想要**转专业**的话可以跟我联系了解。不过大一的同学不一定能读到我的这份文档😶‍🌫️哈哈哈！)。大一到大二曾在[校园单车志愿服务队](https://lsmf.sspu.edu.cn/2021/2473/list.htm)呆过一段时间，对于我这种内向的人属实是帮到了挺多的东西，所以也推荐大家去服务队学习进步。本人呢，技术主要走的**嵌入式软件**方向，欢迎大家找我进行技术交流(如果我在忙着考研那就算喽哈哈🤣)，但是由于起步比较晚，大二接触嵌入式课程才开始学习，所以技术方面也不是很成熟。

好喽，自我介绍就这样吧，毕竟咱也不是技术大佬，拿的奖也不多。如果你读到这里，那么我很庆幸能够认识你🤞，加油哦👻👻👻👻👻👻。

### 1.2 初衷

2023年六月份，即暑假期间，我和一位同学了解并参加了[2023年中国大学生工程实践与创新能力大赛](http://www.gcxl.edu.cn/new/index.html)的校内选拔赛，成功进入市赛并取得上海市特等奖进入当时的国赛。

国赛结束后与指导老师商量，决定编写[工创赛智能生活垃圾分类赛道](http://www.gcxl.edu.cn/new/res/20230630/Intelligence.pdf)的比赛指导文档，主要目的如下：

- **分享比赛经验**，希望后续的同学可以踊跃参加工创赛及其他竞赛。
- **将竞赛传承下去**，希望后续同学可以在“巨人”的肩膀上更上一层楼。
- **分享学习经验**，希望后续同学在技术学习上少走一些弯路。
- **弥补国赛遗憾**，希望能帮助后续同学在国赛取得银奖甚至金奖的好成绩，弥补我们在国赛留下的遗憾。

文档第一部分是工创赛赛道的介绍，我会主要介绍“智能+”的物流小车和生活垃圾分类赛道。第二部分是针对2023年工创赛智能生活垃圾分类赛道的比赛使用方案，其中也包括一些涉及到的技术、源代码、建模文件，为了方便我会整理上传到[Github](https://github.com/)。除此之外，我会放一些自己在用的学习地址，和我自己总结的知识在我的[个人博客](https://tonmoon.top/)，方便大家学习相关技术.

## 2. 工创赛介绍

### 2.1 什么是工创赛

> 全国大学生工程实践与创新能力大赛原名全国大学生**工程训练综合能力竞赛**🤺🤺🤺
>
> 后面内容会简称其为**工创赛**。

**大赛的简介：**

全国大学生工程训练综合能力竞赛是公益性的大学生[科技创新](https://baike.baidu.com/item/科技创新/1448199?fromModule=lemma_inlink)竞技活动，是有较大影响力的国家级大学生科技创新竞赛，是教育部、财政部资助的大学生竞赛项目，目的是加强学生[创新能力](https://baike.baidu.com/item/创新能力/5471826?fromModule=lemma_inlink)和实践能力培养，提高本科[教育水平](https://baike.baidu.com/item/教育水平/22647919?fromModule=lemma_inlink)和人才培养质量。为开办此项竞赛，经[教育部高等教育司](https://baike.baidu.com/item/教育部高等教育司/0?fromModule=lemma_inlink)批准，专门成立了全国大学生工程训练综合能力竞赛组织委员会和专家委员会。竞赛组委会秘书处设在[大连理工大学](https://baike.baidu.com/item/大连理工大学/0?fromModule=lemma_inlink)。**每两年一届。**

**2023工创赛的大赛主题与目的：**

本届大赛以**交叉融合**工程创新求卓越，守德崇劳**制造强国**勇担当为主题，面向适应全球可持续发展需求的工程师培养，服务于国家创新驱动与制造强国战略，强化**工程创新能力**，坚持理论实践结合、学科专业交叉、校企协同创新、理工人文融通，创建具有鲜明中国特色的高端工程创新赛事，建设引领世界工程实践教育发展方向的精品工程，构建面向工程实际、服务社会需求、校企协同创新的实践育人平台，培养服务制造强国的卓越工程技术后备人才，打造具有中国特色世界一流工程实践与创新教育体系。

**各大赛道参加情况：**

![工创赛赛道](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708161574423.png)

工创赛主要分以上六个赛道，其中“智能+”赛道分为物流小车和生活垃圾分类，主要考察嵌入式、视觉、目标检测、机械结构设计等技术。“新能源车”赛道分为太阳能和温差，主要考察凸轮设计、RFID等。其他赛道不太了解，可以去[官网](http://www.gcxl.edu.cn/new/index.html)看介绍文档。2023年我校参加的主要就是标注的四个赛道，其中太阳能、生活垃圾分类、飞行器仿真都各有一队进入国赛，取得两铜一银的[成绩](https://www.sspu.edu.cn/2023/1226/c2964a146806/page.htm)。

### 2.2 工创赛含金量

**首先**，全国大学生工程实践与创新能力大赛即工创赛的**国赛**，属于大学生竞赛中的[A类赛事](https://blog.csdn.net/qq_42898149/article/details/130682821)。大学生竞赛主要分为ABCD类竞赛，A类竞赛含金量和认可度为最高，如大家了解比较多的**互联网+**、**挑战杯**、**数学建模**、**电赛**等等同属A类竞赛，我们学校对于A类竞赛同样有说明：

![A类竞赛表](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708172385150.png)

这个表格来源于学习**上海第二工业大学创新创业学分管理办法** 文档，在大四每个专业都有一门创新创业课程需要上，而这门课有一种免修办法，只要满足条件的同学便可以提出免修申请，条件如下：

![1708172566513](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708172566513.png)

⚠⚠⚠--这里需要注意一点，A类赛事指的是某类赛事的国赛，该赛事的市赛只是C类或者是B类。例如**上海第二工业大学创新创业学分管理办法** 文档明确指出**全国大学生机械创新设计大赛**为A类，而**上海市大学生机械工程创新大赛**是C类赛事。

总的来说，工创赛作为A类赛事含金量还是很足的，对于个人技术的实践创新和团队组织能力都是一种挑战。

### 2.3 工创赛比赛形式

像机械创新设计大赛、挑战杯等比赛是带着创新作品参与答辩评分，对于作品的形式、种类没有要求，或者只会规定一个大概的方向。如机创会规定一个农业机械和仿生主题，其他自由发挥。而工创赛不同其他一些创新创业类的比赛，工创赛会规定一个应用场景和装置需要完成的任务，以及一些尺寸电压的细致要求；最后的比赛形式**没有答辩**，比赛过程分为初赛和决赛，初赛分数由两部分组成：

- **文档、外观、创意设计**占30%
- 装置自动**完成指定任务**，根据准确率评分，占70%

通过初赛决定出决赛名单，然后决赛团队进入**创新实践环节**环节，根据比赛要求更改装置的某一个结构(现场公布，比赛前并不知道)，此环节非常考验赛前准备和应变能力。-----**占分30%**

后面是现场决赛，跟初赛一样完成**指定任务**，会比初赛难。-----**占分70%**

![1708175264070](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708175264070.png)

**关于现场初赛与现场决赛**：

现场初赛和决赛是基本一样的，不同赛项具体差异参考赛道的说明文档。现场比赛有两次机会，每次开始前有一定准备时间，2023**市赛**准备时间：**第一轮5分钟，第二轮3分钟**；2023**国赛**准备时间：**第一轮3分钟，第二轮3分钟.**且智能+赛道都有**时间限制**，要特别注意。

> ⚠一定要仔细阅读赛道说明文档，很重要，不要出现违规。

## 3. 智能 "+" 赛道介绍

> 智能 "+" 赛道有物流小车和生活垃圾分类两个赛项
>
> 我参加的是**生活垃圾分类**，所以此赛项做注意指导说明，对于**物流小车**也了解一些做简单介绍提一些意见。

### 3.1 物流小车

> **阅读声明：**本人并不是参加的这个赛道，我以自己国赛、市赛见到的很多优秀小车方案做一个推荐，也有一些自己的见解，因为对规则研究并不是很多所以有不恰当的地方多多包含。

#### 3.1.1 赛项简介

首先看一下**作品要求：**

![1708177074464](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708177074464.png)

**比赛场地：**

![1708177434452](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708177434452.png)

物流的比赛过程大致如下：

1. 放置到出发点，一键启动物流小车。
2. 扫描并读取二维码，获取物料顺序信息。
3. 物流小车根据二维码信息，完成物流搬运任务。

#### 3.1.2 功能方案

根据比赛要求可以分为三个技术方向：

- 小车底盘，控制小车移动到指定位置，要非常精确，不然物料抓不到。
- 机械臂，设计一款机械臂抓取物料。
- 视觉：视觉是很重要的一环，需要：扫描二维码、识别物料颜色、辅助底盘视觉定位。

> 这个比赛合理分工很重要，像我校赛技术方面一个人负责，说实话挺累的。可以根据以上三个技术方面做一个分工，留一个人写文档。

##### **底盘：**

轮子是[麦克纳姆轮](https://baike.baidu.com/item/%E9%BA%A6%E5%85%8B%E7%BA%B3%E5%A7%86%E8%BD%AE/3827219)或[全向轮](https://baike.baidu.com/item/%E5%85%A8%E5%90%91%E8%BD%AE/10635596)，两种轮子都可以进行多方向自由移动，**推荐**使用**麦克纳姆轮**，好上手，也是我们学校同学都使用的方案。

![img](https://raw.githubusercontent.com/wxnlP/pic/main/competition/9a504fc2d56285354e2f2a2f9fef76c6a6ef63f5.jpg)

![img](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1f178a82b9014a90f4558b25a3773912b31bee3b.jpg)

电机选择，直流减速电机和步进电机，推荐**直流减速电机**即可，配合PID算法做闭环控制。选择减速电机要注意一个参数：**减速比**，30即可不要太低和太高。

![1708179037254](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708179037254.png)

> **推荐商家**：[亚博智能 ](https://detail.tmall.com/item.htm?abbucket=11&id=609082685065&ns=1&spm=a21n57.1.0.0.1e08523cq3ZLQM)和 [轮趣科技](https://detail.tmall.com/item.htm?abbucket=11&id=645920794388&ns=1&spm=a21n57.1.0.0.1e08523cq3ZLQM)

开发板选择，推荐stm32和arduino，有基础可以使用stm32，学习起来可能难一些；arduino相对简单很多。

stm32可以选用**stm32f103c8t6**和**stm32f103ZET6**两种芯片，满足四个编码器的定时器需求，可以挂载多个外设，引脚够用。不推荐购买学习板，买一个小一些资源够用的板子就可以，有能力用PCB画一个外设拓展板，比用杜邦线连来连去可靠很多。

arduino选型就简单很多，怕资源不够就用**arduino mega**，或者**arduino uno**，资源少一些。

![1708179801996](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708179801996.png)

![1708179849308](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708179849308.png)

##### 机械臂：

机械臂比赛使用的分三类

1.六自由度舵机机械臂

基本机构大差不差，有一些同学会对机械进行简单改造，第一个自由度舵机最后用一个扭矩大一些防止突然烧坏。同时机械爪部分最后自己设计，根据物料和自己设计的机械臂运动方式。

![1708180164128](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708180164128.png)

2.四自由度

![1708180530493](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708180530493.png)



3.两自由度步进电机机械臂

这种都是自己3D打印设计

[点击查看案例](https://www.bilibili.com/video/BV1VN411s7RL/?spm_id_from=333.337.search-card.all.click&vd_source=9360af603fa540663a17ba65dbad6a7d)

1、2方案都需要多个舵机，建议买一个[舵机拓展板](https://item.taobao.com/item.htm?ali_refid=a3_430582_1006:1104166432:N:Df97QAFv155N5cA0zdwOaHVxV3dNIHPA:4956869d531a473180413af89bd8570a&ali_trackid=1_4956869d531a473180413af89bd8570a&id=19214924650&spm=a21n57.1.0.0)

![1708181153870](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708181153870.png)

##### 视觉

视觉采用openmv或者工控机搭配opencv，工控机可以用树莓派。推荐**openmv**即可，上手简单。

[openmv购买链接](https://item.taobao.com/item.htm?abbucket=11&id=612497720394&ns=1&spm=a21n57.1.0.0.1e08523cq3ZLQM)

![1708180921426](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708180921426.png)

> **硬件方案都是其次的，重要的是定位算法和机械臂路径规划的准确性。**

#### 3.1.3 注意事项

![1708181319625](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708181319625.png)

![1708181378802](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708181378802.png)

![1708181443508](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708181443508.png)

### 3.2 生活垃圾分类

#### 3.2.1 赛项简介

##### **作品要求：**

> 这一部分是对作品功能的总体概括，看看就行，重点都已经加深标注了。需要注意的就是分类标签、压缩装置，后面会详细说明。

![1708238068702](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708238068702.png)

##### **功能要求：**

> 这一部分是最重要的，涵盖了我们作品最后的功能

- 作品顶部，**固定投放口**(初赛130x130，决赛现场公布)。
- 由**一个人**将垃圾放入投放口。作品**自动识别分类**至垃圾桶。
- 可回收垃圾需要**压缩装置**，且必须在全部垃圾分类任务完成前完成。
- **高亮显示屏**，可以播放宣传视频，显示投放垃圾的信息、满载情况。
- **待机**时**循环播放**宣传视频。

![1708238221030](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708238221030.png)

##### **驱动要求：**

> 注意电压要求，不大于24伏，我们国赛因为高了0.03V没有给成绩排序😭😭😭(这里不吐槽了，刘老师比赛前肯定会嘱咐你们的，**不要报有侥幸心理，严格按照规则**)。

![1708238242954](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708238242954.png)

##### **机械结构要求：**

> 这里不用被自主设计吓到，只要不是整理全买的成品就行，能用3D打印就用，毕竟经费有限哈哈哈。

![1708238282657](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708238282657.png)

##### **外形尺寸要求：**

> 作品制作时一定要考虑高度，特别是校赛，因为后面要考虑决赛的多种垃圾分类，肯定会或多或少加高。

![1708238312134](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708238312134.png)

**投放的物料：**

> 物料这里不细说，后面的程序部分会详细说，我们国赛也是踩了坑的。

![1708238345013](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708238345013.png)

**生活垃圾分类赛道最重要的除了视觉方面就是结构搭建方面，最耗时间的也是结构设计和搭建，搭建以后调试程序就是很方便和快乐的。**

> 上诉为**2023**年的比赛说明文档，每年文档差的不多，但一定以自己**当下文档为标准**制作作品，特别是**尺寸要求**，一点都不能超过。

#### 3.2.2 人员分工

人员分工很重要，这里特别说明团队中**不要有混子**，我是深有体会的。校赛期间是我和一位朋友两个人参赛的，一开始4个人因为态度消极沟通后踢了两个，后面我负责技术部分，另一位同学负责文档和器件购买等工作，最后通宵好几天才完成作品。还要一组时一个人干的校赛，后面进国赛了，也是很强哈哈哈👍👍👍。废话不多说了，下面说四个人分工，也是理想状态的四个人的定位：

1. **机械结构设计**，负责作品整体得结构设计，包括材料选择、分类方式、投放口、压缩装置、外观等等，当然很多需要讨论商量，最后主要由这位同学和组长敲定即可。
2. **控制结构设计**，负责分类装置得控制部分，根据敲定得分类方式进行控制设计，主要包括满载、翻斗运动、机械臂运动等，需要最后和视觉同学一起调试作品。
3. **视觉结构**，负责目标检测模型、视觉方案选择，这部分很重要，没有视觉其他部分都是0，一分拿不到的。
4. **文档和材料购买**，我们学校报销采用代付方式，需要整理发票，所以发票在一个人手里很方便，另外就是文档书写，通常要由5千字以上比较好。

当然以上时理想中的人员分工，实时上很难找的满足以上能力的人，所以需要个别能力强的成员多负责一部分内容。我们当时市赛及国赛的分工是：

1. 我，负责视觉模型训练、机械结构设计，部分结构选型。市赛结构除分类方式大体最后沿用我校赛设计内容，所以校赛以后的机械结构部分由控制结构的同学承担了很多。
2. 雷同学，负责控制结构设计，控制程序、决赛机械臂结构设计、部分机械结构设计。
3. 毛同学，负责文档书写。
4. 龙同学，负责模型训练的照片标注，激光切割，材料购买等。

在我看来我们的分工也是比较合理的，我和雷同学分担了机械结构设计部分，这样为我们程序调试也提供一定便利。

> ⚠还是建议机械结构尽量单独找一个同学，写程序以外负责机械结构设计，会一定程度拖慢程序进度，且结构设计真的很烦，特别对我这种不喜欢做机械结构的人哈哈哈哈。

## 4. 生活垃圾分类方案

### 4.1 机械结构设计

> 先说一说机械结构设计吧，毕竟用了很长的时间。

#### 4.1.1 材料选择

**铝材：**结构一定要稳定，因为要考虑后续去其他学校比赛的时候要长途运输，特别是国赛跨省运过去会掉很多螺丝。所以作品**”骨骼“**框架用欧标20的铝材，最好不要用30或40以上除非结构需要，因为真的很重。长度不对可以使用工训中心一楼的铣床钻断。

![1708242805223](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708242805223.png)

**铝材连接键**：建议使用这种直角角码；我们也用过一些内置的连接件并不好用，当时考虑装亚克力板好装但恰恰相反，所以不推荐，直角角码相对安装更简单。

![1708242924344](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708242924344.png)

![1708243045701](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708243045701.png)

前面提到运输过程中螺丝容易掉，所以在铝材底部用直角铁固定，防止结构变型。

![1708243175301](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708243175301.png)

**亚克力板**，根据不同用处对于亚克力板的厚度选择有一点选择：

- **4mm**，--->用于外壳装配或小程度支撑面。
- **4mm以上**，--->用于需要支撑重量较大的地方。
- **8mm以上**，--->用于压缩抵挡面，需要承受1000N以上的力。

![1708243391533](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708243391533.png)

#### 4.1.2 结构设计

> 下面是结构设计方案，从下往上介绍。

装配图：

![1708260715405](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708260715405.png)

**垃圾桶**，四个桶尺寸一样，比规定尺寸要大一些具体多少忘记了，可以量一量。建议比我们的桶小一些。

**压缩装置**，使用[路易24V电动推杆平底座](https://item.taobao.com/item.htm?id=545827512337&spm=pc_detail.27183998/evo365560b447259.202206.2.29c67dd6VCTesE)，有很多速度和推力可选，结合需求选购。

![1708244316987](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708244316987.png)

**分类装置**，用亚克力板拼装的，尺寸看我的UG图纸就好，表面铺的A4纸。做的比较简陋，这里**不建议继续采用**，国赛吉大给的土豆很小而且是湿的(必须吐槽一下吉大🤣)，很容易沾上面。

> 很多东西参考实验室的实物会更清楚一些。

### 4.2 控制结构设计

> 控制结构分初赛和决赛，初赛较为简单，决赛就是把分类方法改为了机械臂抓取。由于初赛决赛最好是一个成品，所以放在一起说。区分方法为垃圾个数，垃圾为一个即初赛，垃圾多个即决赛。

#### 4.2.1 硬件选择

##### 主控选择

控制板选择的是**Arduino mega**(物料小车部分有提到)，关于Arduino mega：

Arduino Mega 2560是基于ATmega2560的主控开发板。Arduino Mega2560是采用USB接口的核心电路板。具有54路数字输入输出，适合需要大量IO接口的设计。处理器核心是ATmega2560,同时具有54路数字输入/输出口，16路模拟输入，4路UART接口，一个16MHz晶体振荡器，一个USB口，一个电源插座，一个ICSP header和一个复位按钮。板上有支持一个主控板的所有资源。Arduino Mega2560也能兼容为Arduino NUO设计的扩展板。可以自动选择3中供电方式：外部直流电源通过电源插座供电；电池连接电源连接器的GND和VIN引脚；USB接口直流供电。

![1708249530582](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708249530582.png)

##### 分类装置控制选择

1.**单种垃圾**分类选择二轴云台控制，即两个舵机完成翻转运动；要选择高精度舵机，20kg价格在70~90之间。

可以试试亚博智能的舵机：[亚博智能15/20/25kg金属数字舵机](https://detail.tmall.com/item.htm?abbucket=11&id=624218042549&ns=1&spm=a21n57.1.0.0.1d60523ckabwS6)

![1708250207978](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708250207978.png)

2.**多种垃圾**是采用两个步进电机控制机械臂x、y轴运动，然后由4个舵机控制抓取。步进电机选用好一些的但也不需要很大，这里推荐我们使用的步进电机：[42步进电机](https://item.taobao.com/item.htm?abbucket=11&id=582210006047&ns=1&spm=a21n57.1.0.0.1d60523ckabwS6) ，经过使用测试，质量是够用的。防止步进电机丢步情况，步进电机须配备闭环控制器：[42步进闭环电机驱动器模块](https://item.taobao.com/item.htm?abbucket=11&id=635439412574&ns=1&spm=a21n57.1.0.0.1d60523ckabwS6)，选用**3D打印套餐**即可。

![1708250513291](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708250513291.png)

##### 满载检测

选用超声波，根据测距判断是否满载。因为垃圾桶规定为透明，红外测距会受到影响，超声波则不会受到影响。

![1708261211492](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708261211492.png)

#### 4.2.2 驱动选择

> 驱动方面主要就是涉及到舵机、步进电机、稳压。

##### 舵机拓展板

> 装置涉及到的舵机达到了10个左右，所以配备一个舵机拓展板控制更简单且方便，幻尔科技和亚博智能的拓展板功能多一些，具备串口或蓝牙调试功能(对于机械臂更有用)，价格也更高一些；第三个链接则便宜一些，不具备串口或蓝牙调试功能。

[幻尔科技16路舵机控制器](https://item.taobao.com/item.htm?ali_refid=a3_430582_1006:1104166432:N:WHux2QBZPmZN5cA0zdwOaDVt9Q0NFo+R:dd29ba326e47e84a8e79131e1ba60692&ali_trackid=1_dd29ba326e47e84a8e79131e1ba60692&id=23334420583&spm=a21n57.1.0.0)

[亚博智能16路舵机驱动板](https://detail.tmall.com/item.htm?abbucket=11&id=648919288356&ns=1&spm=a21n57.1.0.0.1d60523ckabwS6)

[16路PWM Servo舵机驱动板模块](https://detail.tmall.com/item.htm?abbucket=11&id=624505789589&ns=1&spm=a21n57.1.0.0.1d60523ckabwS6)

> 舵机拓展板需要通过电池稳压接入电源，而舵机电源一般为5~8V，调到6.5V个人认为较合适。舵机数量增加会导致电流增高，所以稳压模块的输出电流要尽可能高，推荐最后一个链接的稳压模块。

[数显8A带稳压降压模块](https://detail.tmall.com/item.htm?abbucket=11&id=621270751162&ns=1&spm=a21n57.1.0.0.1d60523ckabwS6)

##### 步进电机闭环驱动

> 步进电机用于决赛抓取，精度要求很高，闭环驱动板属于必备！

[42步进闭环电机驱动器模块](https://item.taobao.com/item.htm?abbucket=11&id=635439412574&ns=1&spm=a21n57.1.0.0.1d60523ckabwS6)

#### 4.2.3 控制算法



### 4.3 目标检测环境搭建

#### 4.3.1 硬件选择

视觉采用**树莓派4B**+**USB摄像头**+**7寸电容屏**

> 树莓派推荐了两家，亚博智能是大厂，价格会贵一些也会送一些资料和交流群(个人感觉资料用处不大，不如上网查)，不过现在树莓派降价了，也可以接受。后一家会便宜一些，我后面都是在这一家买的，售后也有解决过一些问题。

树莓派4B-4GB：[树莓派4B Raspberry Pi 4 ](https://item.taobao.com/item.htm?abbucket=11&id=621469430002&ns=1&spm=a21n57.1.0.0.1d60523ckabwS6&skuId=4398973969748)，[亚博智能 Raspberry Pi树莓派4B ](https://detail.tmall.com/item.htm?abbucket=11&id=608798378397&ns=1&spm=a21n57.1.0.0.1d60523ckabwS6)

> 这个树莓派教程算是听不错的，基础配置会教，嵌入式开发也会教，不过这个系列好像没有更新完，不过看完就对树莓派了解不少了。另外，我用树莓派引脚情况很少，更多是做视觉，只需要一个摄像头就好了，座椅不需要过多学习，但要了解Linux命令，用多了就熟练了。

树莓派视频学习：[树莓派十分钟玩转系列入门篇_](https://www.bilibili.com/video/BV16U4y1879Q/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=9360af603fa540663a17ba65dbad6a7d)

> 摄像头其实一开始用的是官方二代摄像头，但是校赛前一天晚上突然坏了，当时临时借的一个摄像头，重新调试角度完成的比赛；后来买了一个又莫名其妙的坏了，所以后来换了USB摄像头，不容易坏。

树莓派官方摄像头：[树莓派官方原装摄像头Pi ](https://item.taobao.com/item.htm?abbucket=11&id=43818975625&ns=1&spm=a21n57.1.0.0.1d60523ckabwS6&skuId=5080403811329)

> 树莓派官方二代摄像头像素是800万，其实够用，这个USB摄像头是1200万，很清晰。我还是**推荐**树莓派官方二代摄像头，只有他不出奇怪问题还是很好用的。(提醒一下**不要买3代**，它仅支持最新系统，很多配置都不方便，找不到教程)

USB摄像头：[1200万电脑摄影头USB工业摄像头4K](https://detail.tmall.com/item.htm?id=728497114308&skuId=5053096577058&spm=a1z10.1-b-s.w4004-25044152529.11.217fccc9kjp3b7)

> 显示屏一般有两种，一种数据线接口在后面一种在侧面，**推荐**买在侧面的。最好选触摸款，调试代码方便。

7寸显示屏：[树莓派显示屏 4B 7寸 超清触摸屏](https://detail.tmall.com/item.htm?abbucket=11&id=599265218230&ns=1&spm=a21n57.1.0.0.60e3523ceNBalO)

#### 4.3.2 目标检测模型

> 上一节说了硬件选型，完成以后就可以准备软件方面了。

最后的视觉方案是[YOLOv5-Lite](https://github.com/ppogg/YOLOv5-Lite) + [onnx](https://github.com/onnx/models)推理加速

#### 4.3.3 训练环境搭建（有修改）

> 解释一下，yolo是一种目标检测模型，有很多版本，yolov5是他的一个官方版本，而yolov5-lite是由一位大佬改良后的一种更轻量级模型，为什么需要轻量级呢，因为太大的模型计算量大，树莓派带不动，算力不够，就会导致视频画面很卡，检测速度也慢。**本质上yolov5和yolov5-lite使用方式是一样的。**

完整的视频教程，搭建yolov5-lite模型训练环境：[手把手教你搭建自己的yolov5目标检测平台](https://www.bilibili.com/video/BV1f44y187Xg/)

完整的博客文档：[目标检测--手把手教你搭建自己的YOLOv5目标检测平台_炮哥带你学的博客-CSDN博客](https://blog.csdn.net/didiaopao/category_11321656.html)

以上教程设计到内容包括：

- 搭建yolov5-lite训练环境。
- 数据集的标注。
- 训练自定义数据集，导出pt文件。

在`export.py`文件目录终端可以运行下列代码**进行模型转换(.pt->.onnx)**：

> 第一版文档这里有个错误，文字描述错误，以此版为主。

```shell
python export.py --weights best.pt
```

#### 4.3.4 树莓派环境搭建

经过上一个过程，我们就已经把我们的模型训练完成，**后续需要**的是通过代码解析这个pt文件，然后通过它去检测摄像头一帧一帧的图像数据，分析我们目标的种类。步骤如下：

##### 1. 配置树莓派环境

[树莓派4b安装yolov5实现实时目标检测_树莓派4b跑yolov5帧率低-CSDN博客](https://blog.csdn.net/m0_55833308/article/details/122633544)，这个好像需要会员看了

[基于树莓派4B的YOLOv5-Lite目标检测的移植与部署（含训练教程）_树莓派yolo-CSDN博客](https://blog.csdn.net/black_sneak/article/details/131374492)

[树莓派-快速目标检测yoloV5-lite训练与移植_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV14r4y1578r/?spm_id_from=333.337.search-card.all.click&vd_source=9360af603fa540663a17ba65dbad6a7d)

**以上仅作参考，因为他们有些库可能安装不上，且推理代码由些许BUG，大家根据我的流程并参考他们的一起看，我会把我修改过的推理代码放在这里。**

> 其实本来由很多资料、镜像、库文件我保存好了，但是比赛的时候我把存资料的U盘丢了，资料也丢了😭😭😭，我新买的U盘还是😣😣😣。不过问题不大，我手敲一遍过程，再找一遍资料。

**树莓派开机，完成基础配置。**

这里是我购买树莓派获得的亚博智能的资料，免费分给大家：

链接：https://pan.baidu.com/s/1Jm9qrot5CN4mZSJJhASeXg?pwd=cmzz 
提取码：cmzz

完成**基础设置**部分既可。需要特别注意的是[**设置开机自启动程序**](#4.3.5 自启动程序)，比赛要求一键启动，所以要在自启动文件里面把我们的程序启动。

##### 2. yolov5-lite移植

> 由于手边没有树莓派，所以部分内容我用虚拟机演示，实际是基本一致的。

1. **克隆yolov5-lite**

访问Github的yolov5-lite地址(记得使用魔法)：[下载YOLOv5-Lite](https://github.com/ppogg/YOLOv5-Lite)

![1708330842223](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708330842223.png)

**推荐**直接下载压缩包把压缩包传到树莓派，直接右键解压或**终端解压**，图示的文件将都会存在于文件夹。

```shell
unzip your_file.zip # 解压
```

解压以后的文件结构如下图，YOLO-Lite-master是文件夹名称，后续就称之为**yolov5-lite文件夹**

![1708343507323](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708343507323.png)

解释一下**文件夹下打开终端**，例如：在**yolov5-lite文件夹**下打开终端，即终端位置在**yolov5-lite文件夹**位置。

![1708343830872](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708343830872.png)

操作方法为默认终端输入`cd + your_path`，例如：

![1708343950823](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708343950823.png)

> 可以敲前几个字母，用Tab键补齐。**后续会直接说在某一个文件夹下打开终端，找到路径自行操作。**

2. **安装pytorch**

安装依赖

```shell
sudo apt-get install libopenblas-dev libblas-dev m4 cmake cython python3-dev python3-yaml python3-setuptools python3-wheel python3-pillow python3-numpy
```

在我的资料包找到pytorch安装包，通过文件传输助手**WinSCP**传输到树莓派(4个文件都传输，后面都要有)，在**pytorch安装文件的目录下打开终端**，执行下面命令安装pytorch：

```shell
pip3 install torch-1.8.0a0+56b43f4-cp37-cp37m-linux_armv7l.whl
pip3 install torchvision-0.9.0a0+8fb5838-cp37-cp37m-linux_armv7l.whl
```

![1708332404336](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708332404336.png)

![1708329910522](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708329910522.png)

3. **安装依赖**

**yolov5-lite文件夹**下找到**requirements.txt**，这里是需要安装的库的版本，把我们已经安装过的torch和torchvision注释掉，然后**文件夹下打开终端**执行安装命令：

```shell
pip3 install -r requirements.txt
```

![1708331536097](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708331536097.png)

将**v5lite-s.pt**文件转移到树莓派下**yolov5-lite文件夹**下

![1708332518118](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708332518118.png)

4. **摄像头配置**

检测树莓派是否有**opencv**，打开终端，输入`python3`调出python终端，输入`import cv2`不报错即可

![1708330217813](./https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708330217813.png)

新建PyProjects文件夹，文件夹下新建文件cv_test.py

```shell
mkdir PyProjects
cd PyProjects
touch cv_test.py
```

![1708344562343](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708344562343.png)

复制下面代码到cv_test.py文件。

```python
import cv2

# 创建摄像头对象
cap = cv2.VideoCapture(-1)  # 0 表示默认摄像头，如果有多个摄像头，可以尝试不同的编号

# 检查摄像头是否成功打开
if not cap.isOpened():
    print("无法打开摄像头")
    exit()

# 设置摄像头分辨率（可选）
# cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
# cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    # 从摄像头读取一帧图像
    ret, frame = cap.read()

    # 检查帧是否成功读取
    if not ret:
        print("无法读取帧")
        break

    # 在窗口中显示图像
    cv2.imshow('摄像头测试', frame)

    # 按下 'q' 键退出循环
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 释放摄像头资源
cap.release()

# 关闭所有窗口
cv2.destroyAllWindows()
```

打开终端，运行代码，可以看到摄像头画面则没有问题。

```shell
python3 cv_test.py
```

![1708344698894](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708344698894.png)

Ctrl+c退出，输入`ls /dev/video*`查看摄像头设备，一般是0/1

![1708334429106](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708334429106.png)

5. **推理**

yolov5-lite的根目录下，打开终端尝试推理：

```
python3 detect.py --source 0
```

> source 0不行可以试试source 1，取决于摄像头设备。

##### 3. onnx推理

**安装onnxruntime**

在我的资料包里，**onnx推理**文件夹下有一个onnxruntime库的安装文件，通过文件传输助手WinSCP传输到树莓派，执行下面命令安装：

```shell
pip3 install onnxruntime-1.9.1-cp37-none-linux_armv7l.whl
```

注意：onnxruntime的安装需要python3.7 和 numpy 1.21以上

```shell
pip3 install numpy # 安装numpy
```

![1708333928679](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708333928679.png)

**onnx推理**

新建文件yolo.py，`python3 yolo.py`运行即可。

```python
import random

import cv2
import numpy as np
import onnxruntime as ort
import time


def plot_one_box(x, img, color=None, label=None, line_thickness=None):
    """
    description: Plots one bounding box on image img,
                 this function comes from YoLov5 project.
    param: 
        x:      a box likes [x1,y1,x2,y2]
        img:    a opencv image object
        color:  color to draw rectangle, such as (0,255,0)
        label:  str
        line_thickness: int
    return:
        no return
    """
    tl = (
            line_thickness or round(0.002 * (img.shape[0] + img.shape[1]) / 2) + 1
    )  # line/font thickness
    color = color or [random.randint(0, 255) for _ in range(3)]
    x = x.squeeze()
    c1, c2 = (int(x[0]), int(x[1])), (int(x[2]), int(x[3]))
    cv2.rectangle(img, c1, c2, color, thickness=tl, lineType=cv2.LINE_AA)
    if label:
        tf = max(tl - 1, 1)  # font thickness
        t_size = cv2.getTextSize(label, 0, fontScale=tl / 3, thickness=tf)[0]
        c2 = c1[0] + t_size[0], c1[1] - t_size[1] - 3
        cv2.rectangle(img, c1, c2, color, -1, cv2.LINE_AA)  # filled
        cv2.putText(
            img,
            label,
            (c1[0], c1[1] - 2),
            0,
            tl / 3,
            [225, 255, 255],
            thickness=tf,
            lineType=cv2.LINE_AA,
        )


def _make_grid(nx, ny):
    xv, yv = np.meshgrid(np.arange(ny), np.arange(nx))
    return np.stack((xv, yv), 2).reshape((-1, 2)).astype(np.float32)


def cal_outputs(outs, nl, na, model_w, model_h, anchor_grid, stride):
    row_ind = 0
    grid = [np.zeros(1)] * nl
    for i in range(nl):
        h, w = int(model_w / stride[i]), int(model_h / stride[i])
        length = int(na * h * w)
        if grid[i].shape[2:4] != (h, w):
            grid[i] = _make_grid(w, h)

        outs[row_ind:row_ind + length, 0:2] = (outs[row_ind:row_ind + length, 0:2] * 2. - 0.5 + np.tile(
            grid[i], (na, 1))) * int(stride[i])
        outs[row_ind:row_ind + length, 2:4] = (outs[row_ind:row_ind + length, 2:4] * 2) ** 2 * np.repeat(
            anchor_grid[i], h * w, axis=0)
        row_ind += length
    return outs


def post_process_opencv(outputs, model_h, model_w, img_h, img_w, thred_nms, thred_cond):
    conf = outputs[:, 4].tolist()
    c_x = outputs[:, 0] / model_w * img_w
    c_y = outputs[:, 1] / model_h * img_h
    w = outputs[:, 2] / model_w * img_w
    h = outputs[:, 3] / model_h * img_h
    p_cls = outputs[:, 5:]
    if len(p_cls.shape) == 1:
        p_cls = np.expand_dims(p_cls, 1)
    cls_id = np.argmax(p_cls, axis=1)

    p_x1 = np.expand_dims(c_x - w / 2, -1)
    p_y1 = np.expand_dims(c_y - h / 2, -1)
    p_x2 = np.expand_dims(c_x + w / 2, -1)
    p_y2 = np.expand_dims(c_y + h / 2, -1)
    areas = np.concatenate((p_x1, p_y1, p_x2, p_y2), axis=-1)

    areas = areas.tolist()
    ids = cv2.dnn.NMSBoxes(areas, conf, thred_cond, thred_nms)
    if len(ids) > 0:
        return np.array(areas)[ids], np.array(conf)[ids], cls_id[ids]
    else:
        return [], [], []


def infer_img(img0, net, model_h, model_w, nl, na, stride, anchor_grid, thred_nms=0.4, thred_cond=0.5):
    # 图像预处理
    img = cv2.resize(img0, (model_w, model_h), interpolation=cv2.INTER_AREA)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img.astype(np.float32) / 255.0
    blob = np.expand_dims(np.transpose(img, (2, 0, 1)), axis=0)

    # 模型推理
    outs = net.run(None, {net.get_inputs()[0].name: blob})[0].squeeze(axis=0)

    # 输出坐标矫正
    outs = cal_outputs(outs, nl, na, model_w, model_h, anchor_grid, stride)

    # 检测框计算
    img_h, img_w, _ = np.shape(img0)
    boxes, confs, ids = post_process_opencv(outs, model_h, model_w, img_h, img_w, thred_nms, thred_cond)

    return boxes, confs, ids


# 得到中心坐标
def get_centre(x_list):
    c_x = (x_list[0] + x_list[2]) / 2
    c_y = (x_list[1] + x_list[3]) / 2
    # c_x = c_x*np.cos(np.radians(45))-c_y*np.sin(np.radians(45))
    # c_y = c_y*np.cos(np.radians(45))+c_x*np.sin(np.radians(45))
    c_list = [c_x, c_y]
    # 返回中心坐标列表
    return c_list


# 得到面积
def get_area(label_list):
    length = label_list[2] - label_list[0]
    height = label_list[3] - label_list[1]
    area = []
    # 面积
    area.append(length * height)
    area.append(length/height)
    return area


# 得到最大面积的坐标
def get_data(c_list, ids_, scores_):

    # 获取坐标识别标签个数
    coordinate_length = len(c_list)
    # 中心坐标列表
    centre_list = []
    area_list = []
    l_h_list = []
    # 分别读取每个标签的数据
    for i in range(int(coordinate_length)):
        # 获取每个标签的坐标列表
        coordinate = c_list[i]
        # 获取面积和长宽比
        area, l_h = get_area(coordinate)
        # 中心点坐标列表
        centre_list.append(get_centre(coordinate))
        # 面积列表
        area_list.append(area)
        # 获取长宽比()
        l_h_list.append(l_h)
    if area_list:
        max_area = max(area_list)
        # 读取面积最大的标签的 索引
        area_index = area_list.index(max_area)
        # 根据索引获取面积最大的标签的数据
        target = centre_list[area_index]
        label = dic_labels[ids_[area_index]]
        score = scores_[area_index]
        box = c_list[area_index]
        l_h = l_h_list[area_index]
        return box, target, label, score, l_h, len(area_list)
    else:
        return None, None, None, None, None, None


if __name__ == "__main__":

    # 模型加载
    model_pb_path = "FINAL.onnx"
    so = ort.SessionOptions()
    net = ort.InferenceSession(model_pb_path, so)

    # 标签字典
    dic_labels = {
        0: '0-plastic_bottle',
        1: '0-drink_can',
        2: '0-paper',
        3: '0-carton',
        4: '0-milkCarton',
        5: '1-pericarp',
        6: '1-vegetable_leaf',
        7: '1-radish',
        8: '1-potato',
        9: '1-fruits',
        10: '2-battery',
        11: '2-Expired_drug',
        12: '2-button cell',
        13: '2-thermometer',
        14: '3-tile',
        15: '3-cobblestone',
        16: '3-brick',
        17: '3-paperCup',
        18: '3-tableware',
        19: '3-chopsticks',
        20: '3-butt',
        21: '3-mask'

    }

    # 模型参数
    model_h = 320
    model_w = 320
    nl = 3
    na = 3
    stride = [8., 16., 32.]
    anchors = [[10, 13, 16, 30, 33, 23], [30, 61, 62, 45, 59, 119], [116, 90, 156, 198, 373, 326]]
    anchor_grid = np.asarray(anchors, dtype=np.float32).reshape(nl, -1, 2)

    video = 1
    cap = cv2.VideoCapture(video)
    flag_det = True  # 初始化设为False，收到信号则变为True
    while True:
        success, img0 = cap.read()
        # 取感兴趣区域
        # img0 = img0[20:220, 30: 290]

        if success:

            if flag_det:
                t1 = time.time()
                det_boxes, scores, ids = infer_img(img0, net, model_h, model_w, nl, na, stride, anchor_grid,
                                                   thred_nms=0.4, thred_cond=0.5)
                time.sleep(0.02)
                t2 = time.time()
                # print(det_boxes)
                # print(ids)
                print("-"*100)
                box, target, label, score, l_h, lens = get_data(det_boxes, ids, scores)
                print(f"box:{box}\ntarget:{target}\nlabel:{label}\nscore:{score}\n L-h:{l_h}\nlongs:{lens}")
                print("-" * 100)
                str_FPS = f"FPS: {(1 / (t2 - t1)):.2f}"
                if label:
                    label = f"{label}:{score:.2f}"
                    plot_one_box(box.astype(np.int16), img0, color=(255, 0, 0), label=label, line_thickness=1)
                    cv2.putText(img0, "str_FPS", (20, 20), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 255, 0), 1)


            cv2.imshow("video", img0)
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break

    cap.release()

```

![1708345128636](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708345128636.png)

> 如果可以正常识别检测目标，环境搭建就没有问题，后续根据比赛要求添加通信代码就可以了。

#### 4.3.5 自启动程序

打开终端，输入`sudo nano /etc/rc.local`，修改代码为一下形式，其中`#my codes`为主要添加代码，`autoboot.sh`为启动程序文件，自己命名即可。

![1708946094611](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708946094611.png)

根据目录创建`autoboot.sh`文件，并添加一下内容

```shell
#!/bin/bash

export DISPLAY=:0
startx

# 日志
exec &>> /home/pi/logfile.log
echo "Script started at: $(date)"

# 市赛
python3 /home/pi/Py_Projects/Municipal_contest.py
# 初赛
# python3 /home/pi/Py_Projects/preliminary_contest.py
```

其中`#!/bin/bash`为必须内容，`export DISPLAY=:0	startx`是我摸索很久，可以实现QT界面开机显示的必须内容，否则开机QT界面无法正常显示。日志部分建议填写，方便开机自启出问题找原因，输出的日志会在`/home/pi/logfile.log`目录下。`python3 /home/pi/Py_Projects/Municipal_contest.py`为需要运行的代码。

### 4.4 显示屏界面设计

> 没什么可讲的，自己去学一学pyqt5，简单设计一个就可以了。

#### 4.4.1 python环境搭建(windows)

Python环境配置：

链接：https://pan.baidu.com/s/1WBBtduC-grJw9ZM88HqXfg?pwd=cmzz 
提取码：cmzz

![1708503608585](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708503608585.png)

PyQt5环境配置：[界面开发（1） --- PyQt5环境配置_pyqt5 配置-CSDN博客](https://blog.csdn.net/WYKB_Mr_Q/article/details/129265121)

QT学习：[Python Qt 简介 | 白月黑羽 (byhy.net)](https://www.byhy.net/tut/py/gui/qt_01/)

界面设计主要需要注意的呢就两点：

1. 是否显示摄像头画面，我选择是显示，因为我看到画面安心一些，也知道哪些检测错了再去优化数据集。我用的就是一帧一帧的图像，以照片的形式显示出来。(QImage）
2. 视频的播放，一开始用的Pyqt5的player组件，但是移植到树莓派会一直报错，并且会导致分解树莓派算力使用，导致目标检测推理更慢。后来选用了树莓派的一个播放软件omxplayer，安装他的python库，用代码控制播放。

#### 4.4.2 代码格式

这是一个**第一版界面设计**，没有加串口通信、视频、目标检测。

```python
from pathlib import Path
from threading import Thread
from PyQt5.QtCore import Qt
from PyQt5.QtMultimediaWidgets import QVideoWidget
from PyQt5.QtWidgets import *
from PyQt5.QtGui import QIcon, QPixmap, QFont
from PyQt5.QtMultimedia import QMediaPlayer, QMediaPlaylist, QMediaContent
from PyQt5.Qt import QUrl
import sys
import time


def is_mp4(file_path):
    # 使用Path类创建文件路径对象
    path = Path(file_path)

    # 检查文件是否存在
    if not path.exists():
        return False

    # 检查文件扩展名是否为.mp4
    if path.suffix.lower() == '.mp4':
        return True
    return False


class Demo:
    def __init__(self):

        """控件初始化"""
        self.ui = QMainWindow()
        # self.player = QMediaPlayer(self.ui)
        self.label = QLabel(self.ui)
        self.map_label = QLabel(self.ui)
        self.map2_label = QLabel(self.ui)
        # self.playlist = QMediaPlaylist(self.ui)
        # self.video_widget = QVideoWidget(self.ui)

        # self.slider = QSlider(Qt.Horizontal, self.ui)
        self.video_button = QPushButton("选择视频文件", self.ui)
        self.map_button = QPushButton("选择图片文件", self.ui)

        # self.textLabel = QLabel(self.ui)
        self.list = QListWidget(self.ui)
        # 创建表格
        rows = 4  # 行
        columns = 2  # 列
        self.table = QTableWidget(rows, columns, self.ui)
        thread_text = Thread(
            target=self.Text_time
        )
        # 属性初始化函数调用
        self.LayoutInit()
        self.WidgetInit()
        self.tabel_items()
        self.add_list_items()
        # self.Player()
        self.Signal()
        thread_text.start()

    # 视频播放函数
    # def Player(self):
    #     self.player.setVideoOutput(self.video_widget)  # 设置视频输出
    #     self.player.setPlaylist(self.playlist)
    #     self.playlist.addMedia(QMediaContent(QUrl.fromLocalFile("bak.mp4")))
    #     self.playlist.addMedia(QMediaContent(QUrl.fromLocalFile("lajifenlei.mp4")))
    #     self.playlist.setPlaybackMode(QMediaPlaylist.Loop)
    #
    #     self.player.setVolume(50)
    #
    #     self.player.play()

    # Layout界面
    def LayoutInit(self):
        central_widget = QWidget(self.ui)
        self.ui.setCentralWidget(central_widget)
        layout_v = QVBoxLayout(central_widget)
        layout_h = QHBoxLayout(central_widget)
        layout_h2 = QHBoxLayout(central_widget)
        layout_h3 = QHBoxLayout(central_widget)

        layout_h.addWidget(self.label)
        layout_h.addWidget(self.video_button)
        layout_h.addWidget(self.map_button)
        layout_h.setStretch(0, 5)
        layout_h.setStretch(1, 1)
        layout_h.setStretch(2, 1)
        layout_h.setSpacing(170)

        layout_h2.addWidget(self.map2_label)
        layout_h2.addWidget(self.map_label)
        layout_h2.setStretch(0, 5)
        layout_h2.setStretch(1, 5)
        layout_h2.setSpacing(0)

        layout_h3.addWidget(self.table)
        layout_h3.addWidget(self.list)
        layout_h3.setStretch(0, 1)
        layout_h3.setStretch(1, 3)
        layout_h3.setSpacing(50)

        layout_v.addLayout(layout_h)
        layout_v.addLayout(layout_h2)
        # layout_v.addWidget(self.slider)
        layout_v.addLayout(layout_h3)
        layout_v.setStretch(0, 1)
        layout_v.setStretch(1, 5)
        layout_v.setStretch(2, 1)
        layout_v.setStretch(3, 3)

        self.ui.setLayout(layout_v)



    def Text_time(self):
        while True:
            text = "❤❤❤❤❤地球环保卫士❤❤❤❤❤"
            for i in range(108):
                self.label.setText(text)
                time.sleep(0.1)
                text = ' ' + text


    def tabel_items(self):
        font_tabel = self.table.font()
        font_tabel.setPointSize(20)
        self.table.setFont(font_tabel)
        self.item1 = QTableWidgetItem("可回收垃圾")
        self.table.setItem(0, 0, self.item1)
        self.item2 = QTableWidgetItem("有害垃圾")
        self.table.setItem(1, 0, self.item2)
        self.item3 = QTableWidgetItem("厨余垃圾")
        self.table.setItem(2, 0, self.item3)
        self.item4 = QTableWidgetItem("其他垃圾")
        self.table.setItem(3, 0, self.item4)
        self.item5 = QTableWidgetItem("未满载")
        self.item6 = QTableWidgetItem("未满载")
        self.item7 = QTableWidgetItem("未满载")
        self.item8 = QTableWidgetItem("未满载")
        self.table.setItem(0, 1, self.item5)
        self.table.setItem(1, 1, self.item6)
        self.table.setItem(2, 1, self.item7)
        self.table.setItem(3, 1, self.item8)

    def add_list_items(self):
        for i in range(10):
            print(self.list.count())
            news = QListWidgetItem("可回收垃圾")
            self.list.addItem(news)
            self.list.scrollToItem(news, QListWidget.PositionAtBottom)

    # 控件初始化
    def WidgetInit(self):
        self.ui.setWindowTitle("播放视频")
        self.ui.resize(177 * 4, 400)
        self.label.setFrameStyle(QFrame.Panel | QFrame.Sunken)
        self.table.setShowGrid(False)  # 是否显示网格
        self.table.setHorizontalHeaderLabels(["类别", "是否满载"])
        self.table.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
        font_list = self.list.font()
        font_list.setPointSize(18)
        self.list.setFont(font_list)
        # self.label.setAlignment(Qt.AlignCenter)
        map_widget = QPixmap("../../pictures/bu2.jpg")
        map_widget = map_widget.scaled(177 * 3, 300)
        self.map_label.setPixmap(map_widget)
        self.map_label.setScaledContents(True)

    # 信号槽函数初始化
    def Signal(self):
        # self.slider.sliderMoved.connect(self.GetMoved)
        # self.player.durationChanged.connect(self.GetDuration)
        # self.player.positionChanged.connect(self.GetPosition)
        self.video_button.clicked.connect(self.GetMap2)
        self.map_button.clicked.connect(self.GetMap)

    # 槽函数
    # def GetDuration(self, d):
    #     if d:
    #         self.slider.setRange(0, d)
    #         seconds = int(d / 1000)
    #         minutes = int(seconds / 60)
    #         seconds -= minutes * 60
    #         # self.label.setText(f"总时长：{minutes}:{seconds}")
    #         print(f"总时长：{minutes}:{seconds}")

    # def GetPosition(self, time):
    #     if time:
    #         self.slider.setValue(time)
    #
    # def GetMoved(self, time):
    #     self.player.setPosition(time)

    # def GetFiles(self):
    #     video = QFileDialog()
    #     url = video.getOpenFileUrl()[0].toLocalFile()
    #     self.playlist.addMedia(QMediaContent(QUrl.fromLocalFile(url)))
    #     if is_mp4(url):
    #         num = self.playlist.mediaCount()
    #         for i in range(num):
    #             files = []
    #             file = self.playlist.media(i).canonicalUrl().toString()
    #             files.append(file)
    #             print(files)
    #
    #         self.playlist.setCurrentIndex(num - 1)
    #     else:
    #         QMessageBox.warning(self.ui, "警告", "所选数据类型不是'.MP4！'", QMessageBox.Yes | QMessageBox.No)

    def GetMap2(self):
        video = QFileDialog()
        url = video.getOpenFileUrl()[0].toLocalFile()
        map_widget = QPixmap(url)
        map_widget = map_widget.scaled(177 * 3, 300)
        self.map2_label.setPixmap(map_widget)
        self.map2_label.setScaledContents(True)

    def GetMap(self):
        video = QFileDialog()
        url = video.getOpenFileUrl()[0].toLocalFile()
        map_widget = QPixmap(url)
        map_widget = map_widget.scaled(177 * 3, 300)
        self.map_label.setPixmap(map_widget)
        self.map_label.setScaledContents(True)


if __name__ == "__main__":
    while 1:
        app = QApplication(sys.argv)
        app.setWindowIcon(QIcon("../ico/social-gears.ico"))
        bar = Demo()

        bar.ui.show()
        bar.ui.showFullScreen()
        sys.exit(app.exec_())

```

**这里不推荐我这种代码格式，修改起来很麻烦，到后面几百号的代码在一个文件里，修改起来很不方便。**推荐的方式是每一个功能单独一个python文件，建立一系列的函数库，最后写一个单独的调用文件；当某个功能出问题以后就可以在其文件里修改，代码量少，且更直观。

下面展示一下我后面写的一个粗糙版QT登录界面，展示一下函数库运用：

![1708947182342](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708947182342.png)

**函数库：**

`demoUI.py`

```python
# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'demoUI.ui'
#
# Created by: PyQt5 UI code generator 5.15.9
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_Form(object):
    def setupUi(self, Form):
        Form.setObjectName("Form")
        Form.resize(640, 480)
        self.resign = QtWidgets.QPushButton(Form)
        self.resign.setGeometry(QtCore.QRect(210, 230, 91, 41))
        font = QtGui.QFont()
        font.setPointSize(11)
        self.resign.setFont(font)
        self.resign.setObjectName("resign")
        self.forget = QtWidgets.QPushButton(Form)
        self.forget.setGeometry(QtCore.QRect(340, 230, 91, 41))
        font = QtGui.QFont()
        font.setPointSize(11)
        self.forget.setFont(font)
        self.forget.setObjectName("forget")
        self.label_username = QtWidgets.QLabel(Form)
        self.label_username.setGeometry(QtCore.QRect(210, 120, 72, 30))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.label_username.setFont(font)
        self.label_username.setObjectName("label_username")
        self.label_passwd = QtWidgets.QLabel(Form)
        self.label_passwd.setGeometry(QtCore.QRect(230, 160, 72, 30))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.label_passwd.setFont(font)
        self.label_passwd.setTabletTracking(False)
        self.label_passwd.setObjectName("label_passwd")
        self.UserName = QtWidgets.QLineEdit(Form)
        self.UserName.setGeometry(QtCore.QRect(290, 120, 141, 31))
        self.UserName.setObjectName("UserName")
        self.Passwd = QtWidgets.QLineEdit(Form)
        self.Passwd.setGeometry(QtCore.QRect(290, 160, 141, 31))
        self.Passwd.setObjectName("Passwd")
        self.Inter = QtWidgets.QPushButton(Form)
        self.Inter.setGeometry(QtCore.QRect(270, 290, 91, 41))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.Inter.setFont(font)
        self.Inter.setStyleSheet("background-color: rgb(0, 85, 255);")
        self.Inter.setObjectName("Inter")
        self.label = QtWidgets.QLabel(Form)
        self.label.setGeometry(QtCore.QRect(220, 30, 201, 51))
        font = QtGui.QFont()
        font.setPointSize(20)
        self.label.setFont(font)
        self.label.setStyleSheet("background-color: rgb(255, 170, 255);")
        self.label.setObjectName("label")

        self.retranslateUi(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        _translate = QtCore.QCoreApplication.translate
        Form.setWindowTitle(_translate("Form", "人机交互界面"))
        self.resign.setText(_translate("Form", "注册账号"))
        self.forget.setText(_translate("Form", "忘记密码"))
        self.label_username.setText(_translate("Form", "用户名："))
        self.label_passwd.setText(_translate("Form", "密码："))
        self.Inter.setText(_translate("Form", "登录"))
        self.label.setText(_translate("Form", "用户登录界面"))

```

`drug.py`

```python
# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'drug.ui'
#
# Created by: PyQt5 UI code generator 5.15.9
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_drug(object):
    def setupUi(self, Form):
        Form.setObjectName("Form")
        Form.resize(640, 480)
        self.label = QtWidgets.QLabel(Form)
        self.label.setGeometry(QtCore.QRect(210, 40, 211, 61))
        font = QtGui.QFont()
        font.setPointSize(20)
        self.label.setFont(font)
        self.label.setStyleSheet("background-color: rgb(255, 170, 255);")
        self.label.setObjectName("label")
        self.red = QtWidgets.QPushButton(Form)
        self.red.setGeometry(QtCore.QRect(140, 150, 121, 81))
        font = QtGui.QFont()
        font.setPointSize(20)
        self.red.setFont(font)
        self.red.setStyleSheet("background-color: rgb(255, 36, 17);")
        self.red.setObjectName("red")
        self.green = QtWidgets.QPushButton(Form)
        self.green.setGeometry(QtCore.QRect(140, 280, 121, 81))
        font = QtGui.QFont()
        font.setPointSize(20)
        self.green.setFont(font)
        self.green.setStyleSheet("background-color: rgb(29, 255, 29);")
        self.green.setObjectName("green")
        self.title = QtWidgets.QPushButton(Form)
        self.title.setGeometry(QtCore.QRect(360, 150, 121, 81))
        font = QtGui.QFont()
        font.setPointSize(20)
        self.title.setFont(font)
        self.title.setStyleSheet("background-color: rgb(31, 24, 255);")
        self.title.setObjectName("title")
        self.crey = QtWidgets.QPushButton(Form)
        self.crey.setGeometry(QtCore.QRect(360, 280, 121, 81))
        font = QtGui.QFont()
        font.setPointSize(20)
        self.crey.setFont(font)
        self.crey.setStyleSheet("background-color: rgb(102, 240, 255);")
        self.crey.setObjectName("crey")

        self.retranslateUi(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        _translate = QtCore.QCoreApplication.translate
        Form.setWindowTitle(_translate("Form", "Form"))
        self.label.setText(_translate("Form", "药品仓库示意"))
        self.red.setText(_translate("Form", "1号"))
        self.green.setText(_translate("Form", "3号"))
        self.title.setText(_translate("Form", "2号"))
        self.crey.setText(_translate("Form", "4号"))

```

`regist.py`

```python
# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'regist.ui'
#
# Created by: PyQt5 UI code generator 5.15.9
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_regist(object):
    def setupUi(self, widget):
        widget.setObjectName("widget")
        widget.resize(640, 480)
        self.regist_user = QtWidgets.QLabel(widget)
        self.regist_user.setGeometry(QtCore.QRect(180, 90, 91, 31))
        self.regist_user.setMinimumSize(QtCore.QSize(0, 0))
        self.regist_user.setBaseSize(QtCore.QSize(0, 0))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.regist_user.setFont(font)
        self.regist_user.setObjectName("regist_user")
        self.text_user = QtWidgets.QLineEdit(widget)
        self.text_user.setGeometry(QtCore.QRect(280, 90, 141, 31))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.text_user.setFont(font)
        self.text_user.setObjectName("text_user")
        self.text_passwd = QtWidgets.QLineEdit(widget)
        self.text_passwd.setGeometry(QtCore.QRect(280, 150, 141, 31))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.text_passwd.setFont(font)
        self.text_passwd.setObjectName("text_passwd")
        self.text_passwd_Q = QtWidgets.QLineEdit(widget)
        self.text_passwd_Q.setGeometry(QtCore.QRect(280, 210, 141, 31))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.text_passwd_Q.setFont(font)
        self.text_passwd_Q.setObjectName("text_passwd_Q")
        self.regist_passwd_Q = QtWidgets.QLabel(widget)
        self.regist_passwd_Q.setGeometry(QtCore.QRect(180, 210, 91, 31))
        self.regist_passwd_Q.setMinimumSize(QtCore.QSize(0, 0))
        self.regist_passwd_Q.setBaseSize(QtCore.QSize(0, 0))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.regist_passwd_Q.setFont(font)
        self.regist_passwd_Q.setObjectName("regist_passwd_Q")
        self.regist_passwd = QtWidgets.QLabel(widget)
        self.regist_passwd.setGeometry(QtCore.QRect(180, 150, 91, 31))
        self.regist_passwd.setMinimumSize(QtCore.QSize(0, 0))
        self.regist_passwd.setBaseSize(QtCore.QSize(0, 0))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.regist_passwd.setFont(font)
        self.regist_passwd.setObjectName("regist_passwd")
        self.Regist = QtWidgets.QPushButton(widget)
        self.Regist.setGeometry(QtCore.QRect(250, 280, 111, 41))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.Regist.setFont(font)
        self.Regist.setStyleSheet("background-color: rgb(0, 0, 255);")
        self.Regist.setObjectName("Regist")

        self.retranslateUi(widget)
        QtCore.QMetaObject.connectSlotsByName(widget)

    def retranslateUi(self, widget):
        _translate = QtCore.QCoreApplication.translate
        widget.setWindowTitle(_translate("widget", "注册"))
        self.regist_user.setText(_translate("widget", "输入账号:"))
        self.regist_passwd_Q.setText(_translate("widget", "确认密码:"))
        self.regist_passwd.setText(_translate("widget", "输入密码:"))
        self.Regist.setText(_translate("widget", "注册"))

```

调用函数`Demo1.py`：

```python
import sys
# 这部分就是自定义函数库，from 文件名 import 函数名/类
from demoUI import Ui_Form
from regist import Ui_regist
from drug import Ui_drug
#
from PyQt5.QtWidgets import QApplication, QMainWindow


class MainWindow(QMainWindow, Ui_Form):
    def __init__(self):
        super(MainWindow, self).__init__()
        self.setupUi(self)


class Register(QMainWindow, Ui_regist):
    def __init__(self, parent=None):
        super(Register, self).__init__(parent)
        self.setupUi(self)

    def Open(self):
        self.show()


class Drug(QMainWindow, Ui_drug):
    def __init__(self, parent=None):
        super(Drug, self).__init__(parent)
        self.setupUi(self)

    def Open(self):
        self.show()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    main = MainWindow()
    register = Register()
    drug = Drug()
    main.resign.clicked.connect(register.Open)
    main.Inter.clicked.connect(drug.Open)
    main.show()
    sys.exit(app.exec_())

```

### 4.5 代码汇总

> 其实决赛和初赛最重要区别就是分类的数量，当数量为1的时候用翻斗，大于等于2用机械臂。所以最后初赛决赛可以用同一套代码。

**决赛代码**`Municipal_contest.py`

```python
from pathlib import Path
from threading import Thread, Event
from PyQt5.QtCore import Qt,QCoreApplication
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.Qt import QUrl

from omxplayer import OMXPlayer
from pathlib import Path
import sys
import time
import serial
import RPi.GPIO as GPIO
import cv2
import numpy as np
import onnxruntime as ort
import random as rd

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
video1 = 16
# 设置读取引脚，低电频扫描
GPIO.setup(video1,GPIO.IN)

def get_key(dict, m_num):
    for key,values in dict.items():
        if values == m_num:
            return key
   

      


# yolov5识别
def plot_one_box(x, img, color=None, label=None, line_thickness=None):
    """
    description: Plots one bounding box on image img,
                 this function comes from YoLov5 project.
    param: 
        x:      a box likes [x1,y1,x2,y2]
        img:    a opencv image object
        color:  color to draw rectangle, such as (0,255,0)
        label:  str
        line_thickness: int
    return:
        no return
    """
    tl = (
        line_thickness or round(0.002 * (img.shape[0] + img.shape[1]) / 2) + 1
    )  # line/font thickness
    color = color or [random.randint(0, 255) for _ in range(3)]
    x=x.squeeze()
    c1, c2 = (int(x[0]), int(x[1])), (int(x[2]), int(x[3]))
    cv2.rectangle(img, c1, c2, color, thickness=tl, lineType=cv2.LINE_AA)
    if label:
        tf = max(tl - 1, 1)  # font thickness
        t_size = cv2.getTextSize(label, 0, fontScale=tl / 3, thickness=tf)[0]
        c2 = c1[0] + t_size[0], c1[1] - t_size[1] - 3
        cv2.rectangle(img, c1, c2, color, -1, cv2.LINE_AA)  # filled
        cv2.putText(
            img,
            label,
            (c1[0], c1[1] - 2),
            0,
            tl / 3,
            [225, 255, 255],
            thickness=tf,
            lineType=cv2.LINE_AA,
        )
 
def _make_grid( nx, ny):
        xv, yv = np.meshgrid(np.arange(ny), np.arange(nx))
        return np.stack((xv, yv), 2).reshape((-1, 2)).astype(np.float32)
 
def cal_outputs(outs,nl,na,model_w,model_h,anchor_grid,stride):
    
    row_ind = 0
    grid = [np.zeros(1)] * nl
    for i in range(nl):
        h, w = int(model_w/ stride[i]), int(model_h / stride[i])
        length = int(na * h * w)
        if grid[i].shape[2:4] != (h, w):
            grid[i] = _make_grid(w, h)
 
        outs[row_ind:row_ind + length, 0:2] = (outs[row_ind:row_ind + length, 0:2] * 2. - 0.5 + np.tile(
            grid[i], (na, 1))) * int(stride[i])
        outs[row_ind:row_ind + length, 2:4] = (outs[row_ind:row_ind + length, 2:4] * 2) ** 2 * np.repeat(
            anchor_grid[i], h * w, axis=0)
        row_ind += length
    return outs
 
 
 
def post_process_opencv(outputs,model_h,model_w,img_h,img_w,thred_nms,thred_cond):
    conf = outputs[:,4].tolist()
    c_x = outputs[:,0]/model_w*img_w
    c_y = outputs[:,1]/model_h*img_h
    w  = outputs[:,2]/model_w*img_w
    h  = outputs[:,3]/model_h*img_h
    p_cls = outputs[:,5:]
    if len(p_cls.shape)==1:
        p_cls = np.expand_dims(p_cls,1)
    cls_id = np.argmax(p_cls,axis=1)
 
    p_x1 = np.expand_dims(c_x-w/2,-1)
    p_y1 = np.expand_dims(c_y-h/2,-1)
    p_x2 = np.expand_dims(c_x+w/2,-1)
    p_y2 = np.expand_dims(c_y+h/2,-1)
    areas = np.concatenate((p_x1,p_y1,p_x2,p_y2),axis=-1)
    
    areas = areas.tolist()
    ids = cv2.dnn.NMSBoxes(areas,conf,thred_cond,thred_nms)
    if len(ids)>0:
        return  np.array(areas)[ids],np.array(conf)[ids],cls_id[ids]
    else:
        return [],[],[]
def infer_img(img0,net,model_h,model_w,nl,na,stride,anchor_grid,thred_nms=0.4,thred_cond=0.5):
    # 图像预处理
    img = cv2.resize(img0, (model_w,model_h), interpolation=cv2.INTER_AREA)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img.astype(np.float32) / 255.0
    blob = np.expand_dims(np.transpose(img, (2, 0, 1)), axis=0)
 
    # 模型推理
    outs = net.run(None, {net.get_inputs()[0].name: blob})[0].squeeze(axis=0)
 
    # 输出坐标矫正
    outs = cal_outputs(outs,nl,na,model_w,model_h,anchor_grid,stride)
 
    # 检测框计算
    img_h,img_w,_ = np.shape(img0)
    boxes,confs,ids = post_process_opencv(outs,model_h,model_w,img_h,img_w,thred_nms,thred_cond)
 
    return  boxes,confs,ids

# 得到中心坐标
def get_centre(x_list):
    c_x = (x_list[0] + x_list[2]) / 2
    c_y = (x_list[1] + x_list[3]) / 2
#     c_x = c_x*np.cos(np.radians(45))-c_y*np.sin(np.radians(45))
#     c_y = c_y*np.cos(np.radians(45))+c_x*np.sin(np.radians(45))
    c_list = [c_y, c_x]
    # 返回中心坐标列表
    return c_list


# 得到面积
def get_area(label_list):
    length = label_list[2] - label_list[0]
    height = label_list[3] - label_list[1]
    area = []
    # 面积
    area.append(length * height)
    area.append(length/height)
    return area


# 得到最大面积的坐标
def get_data(c_list, ids_, scores_, dic_labels):

    # 获取坐标识别标签个数
    coordinate_length = len(c_list)
    # 中心坐标列表
    centre_list = []
    area_list = []
    l_h_list = []
    for i in range(int(coordinate_length)):
        # 获取每个标签的坐标列表
        coordinate = c_list[i][0]
        
        # 获取面积和长宽比
        area, l_h = get_area(coordinate)
        if area > 100000:
            break
        # 中心点坐标列表
        centre_list.append(get_centre(coordinate))
        # 面积列表
        area_list.append(area)
        # 获取长宽比()
        l_h_list.append(l_h)
    if area_list:
        max_area = max(area_list)
        area_index = area_list.index(max_area)
        target = centre_list[area_index]
        id_ = ids_[area_index]
        label = dic_labels[ids_[area_index].item()]
        score = scores_[area_index]
        box = c_list[area_index]
        l_h = l_h_list[area_index]
        return box, target, label, score, l_h, id_, len(area_list),ids_
    else:
        return None, None, None, None, None, None, None, None
 


exit_flag = Event()
class Demo:
    def __init__(self):

        """控件初始化"""
        self.ui = QMainWindow()
        self.label = QLabel(self.ui)
        self.map_label = QLabel(self.ui)
        self.map2_label = QLabel(self.ui)

        self.video_button = QPushButton("创铭", self.ui)
        self.map_button = QPushButton("智造", self.ui)
        self.close_button = QPushButton("结束", self.ui)

        # self.textLabel = QLabel(self.ui)
        self.list = QListWidget(self.ui)
        # 创建表格
        rows = 6  # 行
        columns = 2  # 列
        
        self.table = QTableWidget(rows, columns, self.ui)
        self.thread_serial = Thread(
            target=self.thread_serial,
            args=(9600,)
            )
        self.thread_text = Thread(
            target=self.Text_time
        )
        self.thread_yolov5 = Thread(
            target=self.thread_yolov5)
     
        self.pic_control()
        
        # 属性初始化函数调用
        self.LayoutInit()
        self.WidgetInit()
        self.tabel_items()
#         self.add_list_items()
        self.Signal()
#         thread_text.start()
        self.thread_serial.start()
        self.thread_yolov5.start()

    # Layout界面
    def LayoutInit(self):
        central_widget = QWidget(self.ui)
        self.ui.setCentralWidget(central_widget)
        layout_v = QVBoxLayout(central_widget)
        layout_h = QHBoxLayout(central_widget)
        layout_h2 = QHBoxLayout(central_widget)
        layout_h3 = QHBoxLayout(central_widget)

        layout_h.addWidget(self.label)
        layout_h.addWidget(self.video_button)
        layout_h.addWidget(self.map_button)
        layout_h.addWidget(self.close_button)
        layout_h.setStretch(0, 7)
        layout_h.setStretch(1, 1)
        layout_h.setStretch(2, 1)
        layout_h.setStretch(3, 1)
        layout_h.setSpacing(50)

        layout_h2.addWidget(self.map2_label)
        layout_h2.addWidget(self.map_label)
        layout_h2.setStretch(0, 5)
        layout_h2.setStretch(1, 7)
        layout_h2.setSpacing(0)

        layout_h3.addWidget(self.table)
        layout_h3.addWidget(self.list)
        layout_h3.setStretch(0, 4)
        layout_h3.setStretch(1, 10)
        layout_h3.setSpacing(50)

        layout_v.addLayout(layout_h)
        layout_v.addLayout(layout_h2)
        layout_v.addLayout(layout_h3)
        layout_v.setStretch(0, 1)
        layout_v.setStretch(1, 6)
        layout_v.setStretch(2, 3)

        self.ui.setLayout(layout_v)
    


    def thread_yolov5(self):
        # 模型加载
        model_pb_path = "/home/pi/Py_Projects/G_final.onnx"
        so = ort.SessionOptions()
        net = ort.InferenceSession(model_pb_path, so)
        
        # 标签字典
      
        dic_labels={
            0:"0-plastic_bottle",
            1:"0-drink_can",
            2:"0-paper",
            3:"0-carton",
            4:"0-milkCarton",
            5:"1-pericarp",
            6:"1-vegetable_leaf",
            7:"1-radish",
            8:"1-potato",
            9:"1-fruits",
            10:"2-battery",
            11:"2-Expired_drug",
            12:"2-button cell",
            13:"2-thermometer",
            14:"3-tile",
            15:"3-cobblestone",
            16:"3-brick",
            17:"3-paperCup",
            18:"3-tableware",
            19:"3-chopsticks",
            20:"3-butt",
            21:"3-mask"
            }
        recoverable = [0, 1, 2, 3, 4, 17]
        kitchen_garbage = [6, 7, 8, 9, 5]
        harmful = [11, 12, 13, 10]
        others = [15, 16, 18, 19, 20, 21, 14]
        # 模型参数
        model_h = 320
        model_w = 320
        nl = 3
        na = 3
        stride=[8.,16.,32.]
        anchors = [[10, 13, 16, 30, 33, 23], [30, 61, 62, 45, 59, 119], [116, 90, 156, 198, 373, 326]]
        anchor_grid = np.asarray(anchors, dtype=np.float32).reshape(nl, -1, 2)
        
        
        video = -1
        cap = cv2.VideoCapture(video)
        ser = serial.Serial("/dev/ttyAMA0", 9600)
        num=0
        id_list=[]
        lengths=[]
        target_y=[]
#         cenx_list={}
#         ceny_list={}
        temp=1
        global player
        VIDEO_PATH = Path("/home/pi/Videos/video.mp4")#加粗的文字请自行替换成自己的路径跟文件名
        player = OMXPlayer(VIDEO_PATH,args=['--loop', '--no-osd'])
#         time_able=1
#         enable=0
#         global start
#         start=0
#         start_=0
        # 垃圾数量状态 1:垃圾数量>0 0:数量归0
        StatusAmount=1
        while True and not exit_flag.is_set():
            
            success, img0 = cap.read()
            t1 = time.time()
            if success:
                det_boxes, scores, ids = infer_img(img0, net, model_h, model_w, nl, na, stride, anchor_grid,
                                                           thred_nms=0.4, thred_cond=0.5)
                t2 = time.time()
                if temp==0:
                    player.quit()
                else:
                    if player.is_playing():
                        print("视频正在播放")
                    else:
                        print("视频未在播放")
#                 print(GPIO.input(video1)==GPIO.LOW)
                if GPIO.input(video1)==GPIO.LOW:
    #                 print("-"*100)
                    box, target, label, score, l_h, id, length, labels = get_data(det_boxes, ids, scores, dic_labels)
                    # 判断id个数，>=2,次数增加
                    
                            
    #                 print(f"box:{box}\ntarget:{target}\nlabel:{label}\nscore:{score}\n L-h:{l_h}")
    #                 print("-" * 100)
    #                 print(f"中心坐标：{target}")
#                     print(f"lables:{labels}")
#                     if not length:
#                         StatusAmount=0
#                 
#                     if time_able==1 and enable==1:
#                         start=time.time()
#                     
#                     time_able=0
#                     enable_start = time.time()
#                     text=str(round(enable_start-start,2))
#                     self.item_ = QTableWidgetItem(text)
#                     self.table.setItem(4, 1, self.item_)
#                     #  扫描延时
#                     if enable_start-start>=5 or StatusAmount:
#                         start_=1
#                         StatusAmount=1
              
                    # 超时判断
#                     if start:
#                         end=time.time()
#                         text=str(round(end-start,2))
#                         self.item_ = QTableWidgetItem(text)
#                         self.table.setItem(4, 1, self.item_)
# #                         self.label.setText(text)
#                         if end-start >=15:
#                             self.label.setText("已经超时")
#                             print(f"开始时间：{start}结束时间：{end}时差：{end-start}s")
#                             start=0
#                             time_able=1
#                             ser.write(bytes(f'0#0#4#a#o\n', 'utf-8'))
#                             num += 1
#                             self.add_list_items(f"{num}-其他垃圾-1-okk")
                            
                    
                    if label:
#                         enable=1
#                         #刷新计数
#                         start=time.time()
                        if id_list==[]:
                            if length>=2:
                                times=15
                            else:
                                times=7
                        
                        temp=0
                        label = '%s:%.2f'%(dic_labels[id.item()],score)
                        r = rd.randint(0, 255)
                        g = rd.randint(0, 255)
                        b = rd.randint(0, 255)
                        plot_one_box(box.astype(np.int16), img0, color=(r, g, b), label=label, line_thickness=2)
                        
                        id = id.item()
                        id_list.append(id)
                        lengths.append(length)
                        print(lengths)
#                         cen_x = round(target[0], 1)
#                         cen_y = round(target[1], 1)
#                         if id in cenx_list:
#                             cenx_list[id].append(cen_x)
#                         else:
#                             cenx_list[id]=[cen_x]
#                         if id in ceny_list:
#                             ceny_list[id].append(cen_y)
#                         else:
#                             ceny_list[id]=[cen_y]
                        
#                         print(cenx_list)
                        
                        if len(id_list)>=times:
                            # 判断垃圾数量
#                             length=max(lengths)
                            len_idct={}
                            for length in lengths:
                                len_idct[length] = len_idct.get(length, 0)+1
                            length=max(len_idct.keys())
                            lengths=[]
                            id_dict={}
                            for id in id_list:
                                id_dict[id] = id_dict.get(id, 0)+1
                            
                            max_num = max(id_dict.values())
                            # 返回频率最高的标签
                            id_1 = get_key(id_dict, max_num)
                            # 判断发送标签,id数量为1,返回平均标签
                            if times==7:
                                id = id_1
                            # 平均坐标
#                             cen_x = round(sum(cenx_list[id])/len(cenx_list[id]),1)
#                             cen_y = round(sum(ceny_list[id])/len(ceny_list[id]),1)
#                             print(f"ceshi:{cenx_list[id]}")
#                             print(f"ceshi:{ceny_list[id]}")
    #                         if max_num < 3:
    #                             id_list=[]

                                
                                
                            print(label)
                            # 求中心坐标的平均值
                            cen_x = round(target[0], 1)
                            cen_y = round(target[1], 1)
                            print(f"cen_x:{cen_x}")
                            print(f"cen_y:{cen_y}")
                            print(f"数量：{length}")
                            if length >1:
                                move='o'
                                
                            else:
                                move='o'
                                # 垃圾数量归1,状态为0,开始4秒延时
                                
                            if l_h >1:
                                dir='b'
                            else:
                                dir='a'
                            
                            if id in recoverable:
                                ser.write(bytes(f'{cen_x}#{cen_y}#1#{dir}#{move}\n', 'utf-8')) #可回收
                                print(f'{cen_x}#{cen_y}#1#{dir}#{move}\n')
                                num+=1
                                self.add_list_items(f"{num}-可回收垃圾-1-okk")
                        
                            if id in kitchen_garbage:
                            
                                ser.write(bytes(f'{cen_x}#{cen_y}#3#{dir}#{move}\n', 'utf-8')) # 厨余垃圾
                                print(f'{cen_x}#{cen_y}#3#{dir}#{move}\n')
                                num+=1
                                self.add_list_items(f"{num}-厨余垃圾-1-okk")
                            if id in harmful:
                                
                                ser.write(bytes(f'{cen_x}#{cen_y}#2#{dir}#{move}\n', 'utf-8')) #有害垃圾
                                print(f'{cen_x}#{cen_y}#2#{dir}#{move}')
                                
                                num+=1
                                self.add_list_items(f"{num}-有害垃圾-1-okk")
                            if id in others:
                                ser.write(bytes(f'{cen_x}#{cen_y}#4#{dir}#{move}\n', 'utf-8'))
                                print(f'{cen_x}#{cen_y}#4#{dir}#{move}\n')
                                num+=1
                                self.add_list_items(f"{num}-其他垃圾-1-okk")
                            
                            id_list=[]
#                             cenx_list={}
#                             ceny_list={}
                            

                            
                else:
                    id_list=[]
#                     cenx_list={}
#                     ceny_list={}
#                     start=time.time()
#                     start_=0
#                     time_able=1
            
                str_FPS = "FPS: %.2f"%(1./(t2-t1))
                cv2.putText(img0,str_FPS,(40,40),cv2.FONT_HERSHEY_COMPLEX,1,(90,10,70),2)                 
                
                show = cv2.resize(img0, (640, 480))  # 把读到的帧的大小重新设置为 640x480
                show = cv2.cvtColor(show, cv2.COLOR_BGR2RGB)  # 视频色彩转换回RGB，这样才是现实的颜色
                showImage = QImage(show.data, show.shape[1], show.shape[0],
                                                  QImage.Format_RGB888)  # 把读取到的视频数据变成QImage形式
                self.map_label.setPixmap(QPixmap.fromImage(showImage))  # 往显示视频的Label里 显示QImage
                self.map_label.setScaledContents(True)  

                            
    def stop_video(self):
        try:
            if  player.is_playing():
                player.quit()
                print("视频已停止播放")
        except Exception:
            print("meiyou1")
        exit_flag.set()

        # 等待线程结束
        self.thread_serial.join()
        self.thread_yolov5.join()
        self.ui.close()


    def thread_serial(self, boot):
        ser = serial.Serial("/dev/ttyUSB0", boot)
        data=['w', 'W', 'Y', 'y', 'R', 'r', 'B', 'b']
        while True and not exit_flag.is_set():
            
            if not ser.isOpen():
                ser.open()
            count = ser.inWaiting()
            if count > 0:
                recv = ser.read().decode('utf-8',"ignore")
                
                if recv == 'w':
                    self.item = QTableWidgetItem("满载")
                    self.table.setItem(0, 1, self.item)
#                     GPIO.output(LED_white, 1)
                    
                if recv == 'W':
                    self.item = QTableWidgetItem("未满载")
                    self.table.setItem(0, 1, self.item)
#                     GPIO.output(LED_white, 0)
                if recv == 'y':
                    self.item = QTableWidgetItem("满载")
                    self.table.setItem(1, 1, self.item)
#                     GPIO.output(LED_yellow, 1)
                    
                if recv == 'Y':
                    self.item = QTableWidgetItem("未满载")
                    self.table.setItem(1, 1, self.item)
#                     GPIO.output(LED_yellow, 0)
                if recv == 'b':
                    self.item = QTableWidgetItem("满载")
                    self.table.setItem(2, 1, self.item)
#                     GPIO.output(LED_blue, 1)
                    
                if recv == 'B':
                    self.item = QTableWidgetItem("未满载")
                    self.table.setItem(2, 1, self.item)
#                     GPIO.output(LED_blue, 0)
                if recv == 'r':
                    self.item = QTableWidgetItem("满载")
                    self.table.setItem(3, 1, self.item)
#                     GPIO.output(LED_red, 1)
                    
                if recv == 'R':
                    self.item = QTableWidgetItem("未满载")
                    self.table.setItem(3, 1, self.item)
#                     GPIO.output(LED_red, 0)
                
                print(f"recv:{recv}")
                time.sleep(0.1)
            
                

    def Text_time(self):
        while True:
            text = "❤❤❤❤❤地球环保卫士❤❤❤❤❤"
            for i in range(135):
                self.label.setText(text)
#                 time.sleep(0.1)
                text = ' ' + text


    def tabel_items(self):
        font_tabel = self.table.font()
        font_tabel.setPointSize(20)
        self.table.setFont(font_tabel)
        self.item1 = QTableWidgetItem("其他垃圾")
        self.table.setItem(0, 0, self.item1)
        self.item2 = QTableWidgetItem("厨余垃圾")
        self.table.setItem(1, 0, self.item2)
        self.item3 = QTableWidgetItem("有害垃圾")
        self.table.setItem(2, 0, self.item3)
        self.item4 = QTableWidgetItem("可回收垃圾")
        self.table.setItem(3, 0, self.item4)
        self.item5 = QTableWidgetItem("未满载")
        self.item6 = QTableWidgetItem("未满载")
        self.item7 = QTableWidgetItem("未满载")
        self.item8 = QTableWidgetItem("未满载")
        self.table.setItem(0, 1, self.item5)
        self.table.setItem(1, 1, self.item6)
        self.table.setItem(2, 1, self.item7)
        self.table.setItem(3, 1, self.item8)
        self.item9 = QTableWidgetItem("计时器--")
        self.item10 = QTableWidgetItem("0")
        self.table.setItem(4, 0, self.item9)
        self.table.setItem(4, 1, self.item10)


    def add_list_items(self, label):
        
        print(f"列表数量{self.list.count()}")
        news = QListWidgetItem(label)
        self.list.addItem(news)
#         self.list.scrollToBottom()
#         self.list.scrollToItem(news, QListWidget.PositionAtBottom)
#         self.list.setCurrentRow(self.list.count() - 1)


    # 控件初始化
    def WidgetInit(self):
        self.ui.setWindowTitle("ui")
        self.ui.resize(177 * 4, 400)
        self.label.setFrameStyle(QFrame.Panel | QFrame.Sunken)
        self.table.setShowGrid(False)  # 是否显示网格
        self.table.setHorizontalHeaderLabels(["类别", "是否满载"])
        self.table.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
        font_list = self.list.font()
        font_list.setPointSize(15)
        self.list.setFont(font_list)
        # self.label.setAlignment(Qt.AlignCenter)
        map_widget = QPixmap("/home/pi/Pictures/女神/17.jpg")
        map_widget = map_widget.scaled(177 * 3, 300)
        self.map_label.setPixmap(map_widget)
        self.map_label.setScaledContents(True)

    def pic_control(self):
        pic_list = ["/home/pi/Pictures/工创赛图集/logo.jpg", "/home/pi/Pictures/6.jpg"]
            
        map_widget = QPixmap(pic_list[0])
            
        map_widget = map_widget.scaled(177 * 3, 300)
        self.map2_label.setPixmap(map_widget)
        self.map2_label.setScaledContents(True)
        
    # 信号槽函数初始化
    def Signal(self):
        self.video_button.clicked.connect(self.GetMap2)
        self.map_button.clicked.connect(self.GetMap)
#         self.close_button.clicked.connect(QCoreApplication.instance().quit)
        self.close_button.clicked.connect(self.stop_video)

    def GetMap2(self):
        video = QFileDialog()
        url = video.getOpenFileUrl()[0].toLocalFile()
        map_widget = QPixmap(url)
        map_widget = map_widget.scaled(177 * 3, 300)
        self.map2_label.setPixmap(map_widget)
        self.map2_label.setScaledContents(True)


    def GetMap(self):
        video = QFileDialog()
        url = video.getOpenFileUrl()[0].toLocalFile()
        map_widget = QPixmap(url)
        map_widget = map_widget.scaled(177 * 3, 300)
        self.map_label.setPixmap(map_widget)
        self.map_label.setScaledContents(True)


if __name__ == "__main__":
#         temp=1
#         VIDEO_PATH = Path("/home/pi/Videos/video.mp4")#加粗的文字请自行替换成自己的路径跟文件名
#         player = OMXPlayer(VIDEO_PATH,args=['--loop', '--no-osd'])
#         while temp==1:
#             if GPIO.input(video1)==1:
#                 player.quit()
#                 temp=0

        app = QApplication(sys.argv)
        bar = Demo()
        bar.ui.show()
        bar.ui.showFullScreen()
        sys.exit(app.exec_())

```

> **这里问题前面提到过，不要把所以内容写的一个文件，这是我犯得很严重的一个错误，也是代码首要优化的地方。**

## 5. 方案优化指导

### 5.1 重要说明

![1708949657516](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708949657516.png)

![confusion_matrix](https://raw.githubusercontent.com/wxnlP/pic/main/competition/confusion_matrix.png)

**重点说明：**

标红的是文档明确说明的种类，其他为我们自己添加的种类。**但是，有几点重要说明：**

- **无论是市赛还是国赛，初赛期间垃圾种类都没有超过标红范围。**
- **市赛的决赛，多出来的垃圾为废纸团和纸杯。**
- **国赛初赛有一些比较抽象的垃圾。**

国赛抽象垃圾：

1. 小米橙色电池，很容易识别成胡萝卜。

![1708952756713](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1708952756713.png)

2. 纯白色瓷片
3. 小土豆，很小，且是湿的。

**训练模型注重文档说明的垃圾种类，注重种类，比如电池，找各种各样的电池，其次才是数量。**

### 5.2 市赛的决赛任务

> 这些任务中，我们当时基本都已经准备好了，除了纸杯和废纸是文档中没有说明的，不过问题不大，其他组准备的也不完美。

![1715655628050](https://raw.githubusercontent.com/wxnlP/pic/main/competition/1715655628050.png)

## 6 联系方式

我的Github：[wxnlP](https://github.com/wxnlP?tab=repositories)

我的个人博客：[小李🌙的流浪所 (tonmoon.top)](https://tonmoon.top/)

我的邮箱：2661006892@qq.com

> 我的博客有一些stm32教程，自己总结的，等自己有空会更新一些其他嵌入式和生活相关内容。



