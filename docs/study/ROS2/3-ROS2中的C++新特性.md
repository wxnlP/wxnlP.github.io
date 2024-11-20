# 特别篇 ROS2中的C++新特性

> 此篇章对于后续ROS2语法的理解有很重要的帮助，一定仔细理解学习。该笔记是在听完fishros的ROS2书籍课程后总结，示例内容不完全一样，若有不懂，可以观看fishros的B站视频[《ROS 2机器人开发从入门到实践》2.5.2用得到的C++新特性](https://www.bilibili.com/video/BV1CRWWeoEso/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=9360af603fa540663a17ba65dbad6a7d)

## 1. 自动类型判断（auto）

`auto` 是一种关键字，允许编译器根据变量的初始值自动推导其类型。在一般的工程中，只有`int` 、 `float` 、 `char*` 等数据类型则体现不出来它的便捷，但是在ROS 2 中普遍存在名称很长的数据类型，比如 ：

```c++
auto node = std::make_shared<MiniPublisher>("publisher_cpp_node");
// 此时node的数据类型应该是 std::shared_ptr<MiniPublisher> 
// 若不使用auto，则应该写出下面这样，显然会麻烦很多。
std::shared_ptr<MiniPublisher> node = std::make_shared<MiniPublisher>("publisher_cpp_node");
```

## 2. 智能共享指针（make_shared）

智能共享指针 `std::make_shared` ，在C++ 11 标准时引入，创建一个对象并返回一个指向该对象的 `std::shared_ptr`。它简化了动态内存分配的过程，并具有性能和安全性上的优势。

```shell
auto ptr = std::make_shared<T>(constructor_args...);
```

- **`T`**: 指定的对象类型。

- **`constructor_args...`** : 传递给对象 `T` 的构造函数参数。

后续最经常使用的一个场景就是，在初始化节点对象时：

```c++
/*创建一个对象 node
  使用 auto 自动判断数据类型
  指向 MiniPublisher 
  传递一个参数，即节点名称
*/
auto node = std::make_shared<MiniPublisher>("publisher_cpp_node");
```

有对比才有伤害，共享指针与普通指针对比：

```c++
#include <iostream>
#include <memory>

int main()
{
    // 共享指针
    auto p1 = std::make_shared<std::string>("共享指针。");
    std::cout << "p1引用计数:" << p1.use_count() << "，p1的地址:"<< p1.get() << std::endl;
    auto p2 = p1;
    std::cout << "p2引用计数:" << p2.use_count() << "，p2的地址:"<< p2.get() << std::endl;
    // 普通指针
    int* p3 = new int(3);
    int** p4 = &p3;
    std::cout <<"p3的地址:"<< &p3 << std::endl;
    std::cout <<"p4的地址:"<< &p4 << std::endl;
	delete p3;  // 释放 p3 指向的内存
    p3 = nullptr; // 避免悬挂指针
    return 0;
}
// 返回值
/*p1引用计数:1，p1的地址:0x5b4e5e87fec0
  p2引用计数:2，p2的地址:0x5b4e5e87fec0
  p3的地址:0x7fff273f9fe0
  p4的地址:0x7fff273f9fe8*/
```

 **普通指针 vs. 共享指针**

| **对比点**     | **普通指针**               | **共享指针**                      |
| -------------- | -------------------------- | --------------------------------- |
| **内存管理**   | 需要显式调用 `delete`      | 自动管理内存，引用计数为 0 时释放 |
| **共享所有权** | 需要手动管理多个指针的关系 | 支持共享所有权                    |
| **异常安全**   | 异常时可能导致内存泄漏     | 自动释放内存，无泄漏              |
| **复杂性**     | 手动管理容易出错           | 提供更高的代码安全性              |
| **性能**       | 更高效，但容易出错         | 稍有性能开销，但更安全            |
| **使用场景**   | 适合简单场景               | 适合复杂资源共享场景              |

## 3. Lamada表达式

```c++
[capture](parameter_list) -> return_type {
    // 函数体
};
```

- **capture**
  - 指定 Lambda 表达式如何捕获外部作用域的变量
  - 捕获列表用于定义如何访问外部变量：
    - `[ ]`：不捕获任何外部变量。
    - `[x]`：按值捕获变量 `x`。
    - `[&x]`：按引用捕获变量 `x`。
    - `[=]`：按值捕获所有外部变量。
    - `[&]`：按引用捕获所有外部变量。
    - `[this]`：捕获当前类的 `this` 指针。
- **parameter_list**
  - 传递给 Lambda 的参数
- **return_type**
  - 返回类型

示例:

```c++
int main()
{
    // 无捕获
    auto add1 = [](int a, int b) -> int
    {
        return a + b;
    };
    int sum1 = add1(1, 4);
    // 捕获x，y参数
    int x = 10, y = 20;
    auto add2 = [x, y]() -> int
    {
        return x + y;
    };
    int sum2 = add2();
    std::cout << "sum1:" << sum1 << "--sum2" << sum2 << std::endl;

    return 0;
}
// out: sum1:5--sum230
```

## 4.函数包装器

```c++
#include <iostream>
#include <functional>

// 自由函数
void file_free_func(const std::string filename) 
{
    std::cout << "自由函数" << filename << std::endl;
}

class FileSave
{
public:
    // 成员函数
    void member_func(const std::string filename)
    {
        std::cout << "成员函数" << filename << std::endl;
    }
};


int main()
{
    FileSave file_save;
    // lamada函数
    auto file_lamada_func = [](const std::string &filename) -> void
    {
        std::cout << "lamada函数" << filename << std::endl;
    };

    /*原始调用方式
        file_free_func("aini.txt");
        file_save.member_func("aini.txt");
        file_lamada_func("aini.txt");
    */
    
    // 自由函数放进函数包装器
    std::function<void(const std::string&)> save1 = file_free_func;
    // lamada函数放进函数包装器
    std::function<void(const std::string&)> save2 = file_lamada_func;
    // 成员函数放进函数包装器
    /*关于std::bind参数
    1-成员函数，2-对象，3-占位符（根据成员函数需要的参数决定）
    */
    std::function<void(const std::string&)> save3 = std::bind(&FileSave::member_func, &file_save, std::placeholders::_1);
    // 包装后统一调用方式
    save1("aini.txt");
    save2("aini.txt");
    save3("aini.txt");

    return 0;
}
```

cout

```
自由函数aini.txt
lamada函数aini.txt
成员函数aini.txt
```

