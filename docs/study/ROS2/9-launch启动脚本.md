---
comments: true
---

## 9.1 launch启动多个文件

ROS2提供了python、xml、yaml三种格式编写launch启动脚本，推荐使用python编写。

使用launch启动C++服务示例的三个节点：

```python
import launch
import launch_ros


def generate_launch_description():
    """节点定义函数，函数名固定不可改变"""
    action_node_turtle_service = launch_ros.actions.Node(
        # 功能包名称
        package="patrol_service_cpp",
        # 可执行文件名称
        executable="patrol_service",
        # 输出方式，screen、log、both三种
        output="screen"
    )
    action_node_turtle_client = launch_ros.actions.Node(
        # 功能包名称
        package="patrol_service_cpp",
        # 可执行文件名称
        executable="patrol_client",
        # 输出方式，screen、log、both三种
        output="screen"
    )
    action_node_turtlesim_node = launch_ros.actions.Node(
        # 功能包名称
        package="turtlesim",
        # 可执行文件名称
        executable="turtlesim_node",
        # 输出方式，screen、log、both三种
        output="both"
    )
    # 合成启动描述
    launch_description = launch.LaunchDescription([
        action_node_turtle_client,
        action_node_turtle_client,
        action_node_turtlesim_node
    ])
    return launch_description

```

配置C++的`CMakeLists.txt`编译内容

```cmake
# launch
install(DIRECTORY launch
  DESTINATION share/${PROJECT_NAME}
)
```

若是python的功能包，则配置如下内容

```python
from glob import glob
...
	data_files=[
        ...
        ('share/' + package_name + '/launch', glob('launch/*.launch.py'))
    ],
```

## 9.2 launch传递参数

步骤如下：

1. 声明一个launch参数。
2. 使用launch参数 "替换" 节点的参数值。
3. 将声明的launch参数添加到启动描述中。

```python
import launch
import launch_ros


def generate_launch_description():
    """节点定义函数，函数名固定不可改变"""
    # 1.声明一个launch参数
    action_declare_arg_background_r = launch.actions.DeclareLaunchArgument(
        # 参数名
        "launch_arg_bg_r",
        # 默认值
        default_value="100"
    )
	# 动作节点声明
    action_node_turtle_service = launch_ros.actions.Node(
        # 功能包名称
        package="patrol_service_cpp",
        # 可执行文件名称
        executable="patrol_service",
        # 输出方式，screen、log、both三种
        output="screen",
    )
    # 动作节点声明
    action_node_turtle_client = launch_ros.actions.Node(
        # 功能包名称
        package="patrol_service_cpp",
        # 可执行文件名称
        executable="patrol_client",
        # 输出方式，screen、log、both三种
        output="screen"
    )
    # 动作节点声明
    action_node_turtlesim_node = launch_ros.actions.Node(
        # 功能包名称
        package="turtlesim",
        # 可执行文件名称
        executable="turtlesim_node",
        # 输出方式，screen、log、both三种
        output="both",
        # 2.添加参数, 1.节点参数；2.替换launch参数
        parameters=[{
            "background_r": launch.substitutions.LaunchConfiguration("launch_arg_bg_r", default="100")}]
    )
    # 合成启动描述
    launch_description = launch.LaunchDescription([
        # 3.添加参数动作
        action_declare_arg_background_r,
        action_node_turtle_service,
        action_node_turtle_client,
        action_node_turtlesim_node
    ])
    return launch_description

```

## 9.3 launch进阶

launch有动作、条件、替换三大组件，其中动作和替换前面我们已经使用了一部分内容，本节将介绍剩余一些常用方法。

- **动作** ：定义在启动过程中要执行的具体操作，动作可以启动节点、调用终端命令、定时启动节点、打印日志等。
- **替换** ：动态生成配置值（如参数、路径、环境变量等）。
- **条件** ：控制动作是否执行（基于布尔表达式或环境变量）。

### 9.3.1 动作

```python
import launch
import launch.launch_description_sources
import launch_ros
from ament_index_python.packages import get_package_share_directory

def generate_launch_description():
    # 小海龟的一个launch文件路径
    multisim_launch_path = [get_package_share_directory("turtlesim"), "/launch/", "multisim.launch.py"]

    # 动作1-启动其他launch文件
    action_include_launch = launch.actions.IncludeLaunchDescription(
        # 填入launch文件地址(列表拼接)
        launch.launch_description_sources.PythonLaunchDescriptionSource(
            multisim_launch_path
        )
    )
    
    # 动作2-打印日志
    action_log_info = launch.actions.LogInfo(
        msg=str(multisim_launch_path)
    )

    # 动作3-执行终端命令
    action_cmd_ctrl = launch.actions.ExecuteProcess(
        # 单个指令，列表拼接，例如 ['ros2', 'topic', 'list']
        cmd=['rqt']
    )

    # 动作4-多个动作 组成 动作组
    action_group = launch.actions.GroupAction([
        # 动作5-定时器，定时第几秒启动什么指令
        launch.actions.TimerAction(period=2.0, actions=[action_include_launch]),
        launch.actions.TimerAction(period=4.0, actions=[action_cmd_ctrl])
    ])

    # 合成启动描述
    launch_description = launch.LaunchDescription([
        action_log_info,
        action_group
    ])
    return launch_description

```

### 9.3.2 替换和条件

使用替换和条件控制rqt的启动与否。

1. 声明rqt启动控制参数。
2. 替换launch参数。
3. 添加条件参数。

```python
import launch
import launch.launch_description_sources
import launch_ros
from ament_index_python.packages import get_package_share_directory

def generate_launch_description():
    # 1.声明rqt启动控制参数
    action_declare_arg_start_rqt = launch.actions.DeclareLaunchArgument(
        "launch_arg_start_rqt",
        default_value="False"
    )
    # 2.替换launch参数
    start_rqt = launch.substitutions.LaunchConfiguration(
        "launch_arg_start_rqt",
        default="False"
    )
    # 小海龟的一个launch文件路径
    multisim_launch_path = [get_package_share_directory("turtlesim"), "/launch/", "multisim.launch.py"]

    # 动作1-启动其他launch文件
    action_include_launch = launch.actions.IncludeLaunchDescription(
        # 填入launch文件地址(列表拼接)
        launch.launch_description_sources.PythonLaunchDescriptionSource(
            multisim_launch_path
        )
    )
    
    # 动作2-打印日志
    action_log_info = launch.actions.LogInfo(
        msg=str(multisim_launch_path)
    )

    # 动作3-执行终端命令
    action_cmd_ctrl = launch.actions.ExecuteProcess(
        # 3.添加条件
        condition=launch.conditions.IfCondition(start_rqt),
        # 单个指令，列表拼接，例如 ['ros2', 'topic', 'list']
        cmd=['rqt']
    )

    # 动作4-多个动作 组成 动作组
    action_group = launch.actions.GroupAction([
        # 动作5-定时器，定时第几秒启动什么指令
        launch.actions.TimerAction(period=2.0, actions=[action_include_launch]),
        launch.actions.TimerAction(period=4.0, actions=[action_cmd_ctrl])
    ])

    # 合成启动描述
    launch_description = launch.LaunchDescription([
        action_log_info,
        action_group
    ])
    return launch_description

```

