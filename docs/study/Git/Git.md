---
comments: true
---

## 使用Git管理个人项目

### 绑定账户

绑定用户名和邮箱。

```shell
# <your_name>是你的自定义用户名
git config --global user.name "<your_name>"
# <your_email>是你的邮箱
git config --global user.email "<your_email>"
```

### 配置默认分支

默认分支一般命名为`main`或`master`，如果项目要上传到GitHub可以使用`main`好一些。

```shell
git config --global init.defaultBranch main
```

### 查看Git配置

```shell
git config -l
```

### 初始化仓库

进入要初始化为仓库的目录

```shell
git init
```

如果想要删除仓库使用`rm -rf .git`(Linux)删除目录就可以了。

### 提交代码

① 添加当文件到暂存区

```shell
git add <"文件路径">
# 示例
git add src/status_interfaces/package.xml
```

② 添加整个目录到暂存区

```shell
git add <"目录">
# 示例
git add src
```

③ 添加当前目录下所有文件到暂存区

```shell
git add .
```

④ 删除暂存区所有文件

```shell
git reset
```

⑤ 上传暂存区文件

```shell
git commit -m <"更新日志">
# 示例
git add src
git commit -m "完成状态发布功能"
```

⑥ 查看提交日志

```shell
git log
```

想要看提交了哪些文件可以借助Vscode等编译工具。

![image-20250301162703681](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250301162703681.png)

### 忽略文件gitignore

在仓库根目录新建`.gitignore`文件，添加忽略的目录，这些忽略文件将不会上传到远程仓库。

```
build/
install/
log/
.vscode/
```

## Git绑定远程仓库(Github)

### 密钥配置（Github）

想要在当前设备上传git仓库到远程仓库(Github)必要绑定Github的密钥，以获得权限。

```shell
# 1.输入以下命令不断回车
ssh-keygen -t rsa
# 2.获取公钥
cat ~/.ssh/id_rsa.pub
```

![image-20240915204625351](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20240915204625351.png)

复制上述内容至GitHub

![image-20240915204855019](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20240915204855019.png)

检查配置是否完成

```shell
ssh -T git@github.com
```

### 绑定仓库

```shell
# <your_repository_url>是你的GitHub仓库链接（HTTPS/SSH）
git remote add origin <your_repository_url>
```

!!!danger  
    GitHub仓库链接推荐使用`SSH`，因为GitHub 已于 **2021年8月13日** 移除了对 `HTTPS` 密码认证的支持，使用个人访问令牌等方法则较为麻烦。

### 管理远程仓库

若是在另一台设备维护同一个项目，一定 **先拉取仓库的最新内容** ，然后再添加新内容。

```shell
# 推送仓库最新内容
git push origin main
# 拉取仓库最新内容
git pull origin main
#-------------------------------------------
# 修改分支名称
git branch -m master main
```

### 克隆代码

克隆代码后，在本地也可以看到作者的上传过程，特别再vscode可以看的比较清楚。因此，若是自己的项目可以克隆后在其他设备维护，但前提是当前设备具有权限。

```shell
git clone <repository_url>
```

若下图所示的 `ROS2` 仓库管理，前部分是我在 `RDK X5` 实机上做的维护，后面是用虚拟机做的维护，可以说是无缝衔接。

![image-20250318203551039](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250318203551039.png)

## Git进阶使用

### 查看文件修改状态

```shell
git status
```

![image-20250318211322820](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250318211322820.png)

同时可以查看具体的修改位置

```shell
git diff 
```

![image-20250318211502529](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250318211502529.png)

### 撤销代码

① 并未添加到缓冲区，即未进行`git add`。

```shell
git checkout <文件>
```

② 已经添加到缓冲区，但为提交更改。

```shell
git reset 
```

③ 已经提交更改，为上传服务器。

使用`git log`查看日志

```shell
git log
```

![image-20250318212221953](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250318212221953.png)

将Git恢复到`修改依赖名称`的阶段，使用`git reset + commit`

```shell
git reset 41fb438af114aae1f182579422c2f115a7a8148d
```

![image-20250318212348254](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250318212348254.png)

### Git分支

Git分支可以用来管理项目的不版本，防止主分支版本混乱。

① 查看分支列表

```shell
git branch
```

② 创建新分支

```shell
git branch rolling
```

③ 切换分支

```shell
git checkout rolling
```

两个分支修改提交互不影响，如下图：我在`main`分支提交了README更新，但`rolling`依旧是创建时候的样子。

![image-20250318213558453](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250318213558453.png)

④ 合并分支

将`main`分支的修改同步到`rolling`分支，此时需要用到合并分支指令。

```
git merge main
```

![image-20250318213936585](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/image-20250318213936585.png)

⑤ 删除分支

```shell
git branch -D rolling
```

