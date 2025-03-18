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
git config --global init.defaultBranch master
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

![image-20250301162703681](Git/image-20250301162703681.png)

### 忽略文件gitignore

在仓库根目录新建`.gitignore`文件，添加忽略的目录。

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

![image-20240915204625351](Git/image-20240915204625351.png)

复制上述内容至GitHub

![image-20240915204855019](Git/image-20240915204855019.png)

检查配置是否完成

```shell
ssh -T git@github.com
```

### 绑定仓库

```shell
# <your_repository_url>是你的GitHub仓库链接（https）
git remote add origin <your_repository_url>
```

### 管理远程仓库

若是在另一台设备维护同一个项目，一定先拉取仓库的最新内容，然后再添加新内容。

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

若下图所示的ROS2仓库管理，前部分是我在RDKX5实机上做的维护，后面是用虚拟机做的维护，可以说是无缝衔接。

![image-20250318203551039](Git/image-20250318203551039.png)