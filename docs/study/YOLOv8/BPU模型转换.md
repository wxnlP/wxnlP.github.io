## 1. 配置工具链Docker环境

### 1.1 虚拟机环境

官方对于天工开物开发机的要求：

![image-20250314231457116](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250314231457116.png)

使用Ubuntu20.04虚拟机即可，由于虚拟机不像物理机一样轻松调用GPU加速，所以后面均采用CPU方式。

参考：[虚拟机安装资料](https://tonmoon.top/study/ROS2/2-ROS2系统环境安装/)

### 1.2 虚拟机安装Docker

1. **更新系统包索引**

```shell
sudo apt update
sudo apt upgrade -y
```

2. **安装必要依赖**

```shell
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
```

3. **添加Docker官方GPG密钥**

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

4. **配置Docker APT仓库**

```shell
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

5. **安装Docker引擎**

```shell
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

6. **启动并验证服务**

```shell
sudo systemctl start docker
sudo systemctl enable docker
docker --version  # 查看版本
```

7. **配置非Root用户权限**

```shell
sudo usermod -aG docker $USER
newgrp docker  # 立即生效或重新登录
sudo groupadd docker
sudo gpasswd -a ${USER} docker
sudo service docker restart
```

直接复制粘贴命令就可以安装完成，此时网上很多会让我们使用`sudo docker run hello-world`运行测试容器，然后就会发现网络错误，很多解决方法都是不对的。

### 1.3 解决Docker网络问题

创建文件夹

```shell
sudo mkdir -p /etc/systemd/system/docker.service.d
```

添加文件

```shell
sudo touch /etc/systemd/system/docker.service.d/http-proxy.conf
```

打开文件

```shell
sudo nano /etc/systemd/system/docker.service.d/http-proxy.conf
```

添加下面内容：

```
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:8080/"
Environment="HTTPS_PROXY=http://proxy.example.com:8080/"
Environment="NO_PROXY=localhost,127.0.0.1"
```

其中`http://proxy.example.com`需要替换为自己的IP，`8080`端口也需要替换为7890。

![image-20250314232641974](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250314232641974.png)

这样以后Docker拉去就不会出现网络问题了。

## 2. 配置Docker镜像

### 2.1 下载与加载镜像

镜像下载地址：https://developer.horizon.auto/docs/J5/toolchain/1.1.77/download

建议离线下载，会快一些。

![image-20250314233027802](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250314233027802.png)

开发包可以选下，我个人不会使用，我只是进行模型转化暂时也用不到。

![image-20250314233324976](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250314233324976.png)

将镜像移动到根目录，加载镜像(虚拟机内存多一些，不然加载会出现内存不足)：

```shell
docker load -i <镜像名称.tar.gz>
```

### 2.2 使用镜像

> 本部分是自己摸索的使用步骤，并不专业，但应该够用。

新建一个文件夹`models`用于单独存放模型转换文件

```shell
mkdir models
```

运行docker并挂载该目录

```shell
docker run -it --rm \
  -v /home/lzh/models/:/open_explorer \
  -v $(pwd):/openexplorer \
  openexplorer/ai_toolchain_ubuntu_20_j5_cpu:v1.1.77-py38 \
  /bin/bash
```

### 2.3 配置模型转化环境

跟着这个地平线官方博客走就行：[YOLOv11，地瓜RDK X5开发板，TROS端到端140FPS！-CSDN博客](https://blog.csdn.net/SA2672873269/article/details/142663629)，一直到`PTQ方案量化转化`这一节检查模型完成。

其中，检查模型指令如下，记得替换自己的模型名称：

```shell
hb_mapper checker --model-type onnx --march bayes-e --model yolo11n.onnx
```

部分输出结果如下：

![image-20250314234231836](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250314234231836.png)

关于校准数据准备博客并未提及，而是在后来的另一篇博客提到：

[YOLO12在RDK X5上的部署，体验纯视觉Transformer的YOLO目标检测！_yolov12 transformer-CSDN博客](https://blog.csdn.net/SA2672873269/article/details/145742964)

个人认为对于我这种小白提一句还需要琢磨很久，所以把这部分大致列一下，其实有官方脚本还算容易，美中不足的就是官方的资料对小白并不友好。

### 2.4 准备校准数据

① 找照片数据

> 如果是自己训练的模型，最好在自己的数据集里面找照片。

下面是官方提供的地址，不够又是在另一个文档托管网站了，就不再列举了。其中我在`COCO`随意下载了一个数据集，然后从中选了一百张单独一个文件夹放`models`目录。

| **数据集**   | **下载地址**                                                 | **下载结构**                                                 |
| :----------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| ImageNet     | https://www.image-net.org/download.php                       | 下载结构请您参考 [ImageNet数据集参考结构](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/oe_mapper/source/ptq/ptq_sample/algorithm_sample.html#imagenet-prepare) |
| COCO         | https://cocodataset.org/                                     | 下载结构请您参考 [COCO数据集参考结构](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/oe_mapper/source/ptq/ptq_sample/algorithm_sample.html#coco-prepare) |
| VOC          | http://host.robots.ox.ac.uk/pascal/VOC/                      | 需要下载2007和2012两个版本，下载结构请您参考 [VOC数据集参考结构](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/oe_mapper/source/ptq/ptq_sample/algorithm_sample.html#voc-prepare) |
| Cityscapes   | https://github.com/mcordts/cityscapesScripts                 | 下载结构请您参考 [Cityscapes数据集参考结构](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/oe_mapper/source/ptq/ptq_sample/algorithm_sample.html#cityscapes-prepare) |
| CIFAR-10     | http://www.cs.toronto.edu/~kriz/cifar.html                   | 下载结构请您参考 [CIFAR-10数据集参考结构](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/oe_mapper/source/ptq/ptq_sample/algorithm_sample.html#cifar-prepare) |
| FlyingChairs | https://lmb.informatik.uni-freiburg.de/resources/datasets/FlyingChairs.en.html | 下载结构请您参考 [数据预处理](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/runtime/source/ai_benchmark/ai_benchmark.html#data-preprocess) 中的相关描述 |
| KITTI3D      | https://www.cvlibs.net/datasets/kitti/eval_object.php?obj_benchmark=3d | 下载结构请您参考 [数据预处理](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/runtime/source/ai_benchmark/ai_benchmark.html#data-preprocess) 中的相关描述 |
| CULane       | https://xingangpan.github.io/projects/CULane.html            | 下载结构请您参考 [数据预处理](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/runtime/source/ai_benchmark/ai_benchmark.html#data-preprocess) 中的相关描述 |
| Nuscenes     | https://www.nuscenes.org/nuscenes                            | 下载结构请您参考 [数据预处理](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/runtime/source/ai_benchmark/ai_benchmark.html#data-preprocess) 中的相关描述 |
| Mot17        | https://opendatalab.com/MOT17                                | 下载结构请您参考 [数据预处理](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/runtime/source/ai_benchmark/ai_benchmark.html#data-preprocess) 中的相关描述 |
| Carfusion    | http://www.cs.cmu.edu/~ILIM/projects/IM/CarFusion/cvpr2018/index.html | 下载结构请您参考 [数据预处理](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/runtime/source/ai_benchmark/ai_benchmark.html#data-preprocess) 中的相关描述 |
| Argoverse 1  | https://www.argoverse.org/av1.html                           | 下载结构请您参考 [数据预处理](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/runtime/source/ai_benchmark/ai_benchmark.html#data-preprocess) 中的相关描述 |
| SceneFlow    | https://lmb.informatik.uni-freiburg.de/resources/datasets/SceneFlowDatasets.en.html | 下载结构请您参考 [数据预处理](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/runtime/source/ai_benchmark/ai_benchmark.html#data-preprocess) 中的相关描述 |

② 下载官方脚本

下载地址：

https://github.com/D-Robotics/rdk_model_zoo/blob/main/demos/tools/generate_calibration_data/generate_calibration_data.py

该文件同样放`models`目录。

③ 整理目录

在`配置模型转化环境`章节，我们得到一个`yolo11n.onnx`，加上照片数据文件夹命名为`origin_coco_imgs_200`，新建空文件夹`calibration_data`。

然后新建`yolo11`文件将以上文件/文件夹都放进此目录，包括`generate_calibration_data.py`脚本。

此时的docker目录应该为：

> 默认刚进入docker是在`/open_explorer#`目录，docker中不显示models目录。(可能原理不太对，应为对docker不熟，但目录是这样以后模型转换就没有问题)

```shell
├── ultralytics
└── yolo11
    ├── calibration_data
    ├── generate_calibration_data.py
    ├── origin_coco_imgs_200
    └── yolo11n.onnx
```

④ 运行python脚本

目录正确后，就运行python脚本

```shell
python3 generate_calibration_data.py --src origin_coco_imgs_200 --dist calibration_data
```

`--src`参数是原图片目录，`--dist`是输出目录。

### 2.5 量化转化

> 继续跟着模型检测后的步骤就行了，记得改一个参数。

根据模型检查结果，找到手动量化算子Softmax, 应有这样的内容, Softmax算子将模型拆为了两个BPU子图。这里的Softmax算子名称为"/model.10/m/m.0/attn/Softmax"。

新建并打开`yolo11_config.yaml`

```shell
touch yolo11_config.yaml
nano yolo11_config.yaml
```

添加如下内容，其中官方博客为`calibration_data_rgb_f32_640`，我们改成自己的`calibration_data`。

```yaml
model_parameters:
  onnx_model: './yolo11n.onnx'
  march: "bayes-e"
  layer_out_dump: False
  working_dir: 'bin_dir/yolo11n_detect_bayese_640x640_nv12'
  output_model_file_prefix: 'yolo11n_detect_bayese_640x640_nv12'
  # YOLO11 n, s, m
  node_info: {"/model.10/m/m.0/attn/Softmax": {'ON': 'BPU','InputType': 'int16','OutputType': 'int16'}}
  # YOLO11 l, x
  # node_info: {"/model.10/m/m.0/attn/Softmax": {'ON': 'BPU','InputType': 'int16','OutputType': 'int16'},
  #             "/model.10/m/m.1/attn/Softmax": {'ON': 'BPU','InputType': 'int16','OutputType': 'int16'}}
input_parameters:
  input_name: ""
  input_type_rt: 'nv12'
  input_type_train: 'rgb'
  input_layout_train: 'NCHW'
  norm_type: 'data_scale'
  scale_value: 0.003921568627451
calibration_parameters:
  cal_data_dir: './calibration_data'
  cal_data_type: 'float32'
compiler_parameters:
  compile_mode: 'latency'
  debug: False
  optimize_level: 'O3'

```

量化转化

```shell
hb_mapper makertbin --model-type onnx --config yolo11_config.yaml
```

`.bin`文件生成在`bin_dir`目录，然后使用地平线的API就可以差不多得到BPU的10TOPS算力了。

## n. 参考资料

[4.1. 环境部署 — Horizon Open Explorer](https://developer.d-robotics.cc/api/v1/fileData/x5_doc-v126cn/oe_mapper/source/env_install/env_deploy.html#docker)

[彻底解决docker：docker: Get https://registry-1.docker.io/v2/: net/http: request canceled 报错-CSDN博客](https://blog.csdn.net/2301_79849395/article/details/142829852)

[YOLOv11，地瓜RDK X5开发板，TROS端到端140FPS！-CSDN博客](https://blog.csdn.net/SA2672873269/article/details/142663629)

[YOLO12在RDK X5上的部署，体验纯视觉Transformer的YOLO目标检测！_yolov12 transformer-CSDN博客](https://blog.csdn.net/SA2672873269/article/details/145742964)