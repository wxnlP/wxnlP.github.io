---
comments: true
---

## 为理想再拼搏几年！

网站学习资源分布：

[OpenHarmony(持续更新中)](https://tonmoon.top/study/OpenHarmony/0.阅读前的声明/)

[ROS2(持续更新中)](https://tonmoon.top/study/ROS2/1.1-ROS与ROS2介绍/)

[STM32](https://tonmoon.top/study/STM32/0.阅读声明/)

[FreeRTOS](https://tonmoon.top/study/FreeRTOS/0.阅读声明/)

[控制算法合集(持续更新中)](https://tonmoon.top/study/控制算法/PID/)

[全国大学生工程实践与创新能力大赛指导](https://tonmoon.top/study/competition/1/)

[YOLO模型训练](https://tonmoon.top/study/yolov5/1/)

[Git简单使用](https://tonmoon.top/study/Git/Git/)

[飞书学习资料分析](https://tonmoon.top/study/飞书文档/pythondata/)

Github开源仓库：

[工程实践与创新能力大赛源代码](https://github.com/wxnlP/competition2023)

[yolov8和yolov5-lite的部署程序优化](https://github.com/wxnlP/optimization)

[基于Arduino框架的ESP32代码参考](https://github.com/wxnlP/ESP32)

[FreeRTOS对应源码](https://github.com/wxnlP/FreeRTOS?tab=readme-ov-file)

国内Gitee仓库：

[仓库 - wxnlP (wxnlP) - Gitee.com](https://gitee.com/wxnlP/projects?sort=&scope=&state=public)

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
https://cdn.jsdelivr.net/gh/wxnlP/pic
```


​	

