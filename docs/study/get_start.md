---
comments: true
---

## 为理想再拼搏几年！


<div class="grid cards" markdown>
- :fontawesome-brands-github: __Github__ 

  ---

  Github主页，仓库内容涉及STM32、ROS、OpenHarmony等。

  [:octicons-arrow-right-24: 开始学习🫡](https://github.com/wxnlP)

- <img src="/assets/gitee.svg" style="width:24px;height:22px;vertical-align:middle"> __Gitee__

  ---

  国内Gitee主页，不会魔法可以优先访问此仓库，内容与Github一致。

  [:octicons-arrow-right-24: 开始学习😄](https://gitee.com/wxnlP)

- <img src="/assets/ros.svg" style="width:34px;height:34px;vertical-align:middle"> __ROS2__

  ---

  ROS2学习笔记，参考fishros、赵虚左等教程，含通信、仿真、导航等。

  [:octicons-arrow-right-24: 开始学习😁](study\ROS2\0.阅读声明.md)

- <img src="/assets/语雀.svg" style="width:28px;height:28px;vertical-align:middle"> __技术文档分享__

  ---

  使用语雀写的技术文档，涉及机器人学、ESP-IDF、Modern C++等。

  [:octicons-arrow-right-24: 开始学习😜](study/语雀文档/语雀.md)

- :fontawesome-solid-microchip: __STM32__ 

  ---

  STM32学习笔记，参考江科大B站视频，以HAL库为基础，理论与实践结合。

  [:octicons-arrow-right-24: 开始学习🥰](study\STM32\0.阅读声明.md)

- <img src="/assets/ohos.svg" style="width:30px;height:30px;vertical-align:middle"> __OpenHarmony__

  ---

  OpenHarmony轻量系统开发，基于Hi3861芯片。
  
  [:octicons-arrow-right-24: 开始学习😃](study\OpenHarmony\0.阅读前的声明.md)

- <img src="/assets/freeRTOS.svg" style="width:34px;height:32px;vertical-align:middle"> __FreeRTOS__

  ---

  基于STM32的FreeRTOS学习笔记。

  [:octicons-arrow-right-24: 开始学习🤗](study\FreeRTOS\0.阅读声明.md)

- <img src="/assets/yolo.svg" style="width:24px;height:24px;vertical-align:middle"> __YOLO__

  ---

  YOLOv5、YOLOv8模型训练指导，以及RDK X5的BPU模型转换教程。

  [:octicons-arrow-right-24: 开始学习😋](study\yolov5\1.md)

- :fontawesome-brands-git-alt: __Git__

  ---

  Git基础使用，涉及本地项目管理、连接远程仓库等。

  [:octicons-arrow-right-24: 开始学习😎](study/Git/Git.md)

</div>



## 现实啊，莫要打击我

### 安装配置

```shell
pip install mkdocs
pip install mkdocs-material
```

### 改分支

```powershell
git branch -m master main
```

### 部署网站

```python
python -m mkdocs build
# main分支
git add .
git commit -m "update"
git push origin main
# 切换gh-pages分支
git checkout gh-pages
git pull origin gh-pages
# 切换main分支
git checkout main
# 部署
python -m mkdocs gh-deploy
```
### 本地测试

```python
python -m mkdocs serve
```

### 图床

```shell
https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon
```


​	
