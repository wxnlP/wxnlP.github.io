## 目录
1. [构造函数调用机制](#构造函数调用机制)
2. [类继承核心语法](#类继承核心语法)
3. [继承中的关键特性](#继承中的关键特性)
4. [最佳实践建议](#最佳实践建议)
5. [完整代码示例](#完整代码示例)

---

## 构造函数调用机制

### 基本语法
```cpp
CanSender() : Node("can_sender") { 
    // 派生类构造函数体
}
```

### 核心要点

- **构造顺序**：基类构造 → 派生类成员初始化 → 派生类构造函数体
- **语法格式**：`派生类构造函数(参数) : 基类构造函数(参数), 成员变量初始化...`
- **必要性**：当基类没有默认构造函数时必须显式调用

### 场景对比

```c++
// 基类定义
class Base {
public:
    Base(int v) { /* 需要参数的构造函数 */ }
};

// 正确写法
class Derived : public Base {
public:
    Derived() : Base(42) {} // ✅ 显式调用
};

// 错误写法
class Derived : public Base {
public:
    Derived() { /* ❌ 缺少基类构造调用 */ }
};
```

------

## 类继承核心语法

### 基础继承结构

```c++
class 派生类名 : 访问说明符 基类名 {
    // 成员声明
};
```

### 访问控制符对比表

| 继承方式  | public成员 | protected成员 | private成员 |
| --------- | ---------- | ------------- | ----------- |
| public    | public     | protected     | 不可访问    |
| protected | protected  | protected     | 不可访问    |
| private   | private    | private       | 不可访问    |

### 多重继承

```c++
class InputDevice { /*...*/ };
class OutputDevice { /*...*/ };

class IOController : 
    public InputDevice, 
    public OutputDevice {
public:
    IOController() : InputDevice(), OutputDevice() {}
};
```

### 虚继承（解决菱形问题）

```c++
class Base { public: int data; };

class D1 : virtual public Base {};
class D2 : virtual public Base {};

class Final : public D1, public D2 {
public:
    Final() { data = 42; } // 唯一数据成员
};
```

------

## 继承中的关键特性

### 函数重写

```c++
class Shape {
public:
    virtual void draw() { 
        cout << "Drawing generic shape" << endl;
    }
};

class Circle : public Shape {
public:
    void draw() override { // C++11显式重写
        cout << "Drawing circle" << endl;
    }
};
```

### 类型转换操作

```c++
Base* ptr = new Derived();  // 向上转型
Derived* dptr = dynamic_cast<Derived*>(ptr); // 向下转型
```

------

## 最佳实践建议

1. **继承方式选择**
   - 优先使用public继承（符合is-a关系）
   - 避免protected/private继承（考虑组合替代）
2. **多态实现规范**
   - 基类析构函数声明为virtual
   - 使用override关键字明确重写意图
3. **设计原则**
   - 慎用多重继承（接口继承优先）
   - 避免过度使用protected成员
4. **代码安全**
   - 使用dynamic_cast时检查空指针
   - 虚继承仅用于解决菱形继承问题

------

## 完整代码示例

```c++
#include <iostream>
using namespace std;

// 基类
class Animal {
public:
    Animal(string name) : name_(name) {}
    virtual ~Animal() = default;
    
    virtual void speak() {
        cout << "Animal sound!" << endl;
    }

protected:
    string name_;
};

// 派生类
class Dog : public Animal {
public:
    Dog(string name) : Animal(name) {} 
    
    void speak() override {
        cout << name_ << " says: Wang Wang!" << endl;
    }
    
    void fetch() {
        cout << name_ << " fetches the ball" << endl;
    }
};

int main() {
    Dog myDog("Buddy");
    myDog.speak();    // 输出：Buddy says: Wang Wang!
    myDog.fetch();    // 输出：Buddy fetches the ball
    
    Animal* animalPtr = &myDog;
    animalPtr->speak(); // 多态调用
    return 0;
}
```