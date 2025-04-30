---
comments: true
---

## 1. PID原理

### 1.1 PID简介

- **PID是比例（Proportional）、积分（Integral）、微分（Differential）的缩写。**
- **PID是一种闭环控制算法，它动态改变施加到被控对象的输出值（Out），使得被控对象某一物理量的实际值（Actual），能够快速、准确、稳定地跟踪到指定的目标值（Target）。**
- **PID是一种基于误差（Error）调控的算法，其中规定：误差=目标值-实际值，PID的任务是使误差始终为 0 。**
- **PID对被控对象模型要求低，无需建模，即使被控对象内部运作规律不明确，PID也能进行调控。**

### 1.2 PID公式

**误差：** 


$$
error(t) = target(t) - actual(t)
$$


**输出值：**


$$
out(t) = K_p \cdot error(t) + K_i \int_0^t error(t) \, dt + K_d \cdot \frac{d \, error(t)}{dt}
$$


若用控制的语言表达则如下结构图：

![PID](https://tonmoon.obs.cn-east-3.myhuaweicloud.com/img/tonmoon/PID.png)

### 1.3 PID各项作用

**比例项（P）**

- 只含有比例项的PID输出值：

$$
out(t) = K_p \cdot error(t)
$$



- 比例项的输出值仅取决于 **当前时刻的误差** ，与历史时刻无关。
- 当前存在误差时，比例项输出一个与误差呈正比的值，当前不存在误差时，比例项输出 0 。
- 比例项权重越大，系统响应越快，但超调也会随之增加。
- 纯比例项控制时，系统一般会存在稳态误差，比例项越大，稳态误差越小，但并不能完全消除稳态误差。

!!!danger  
    由于纯比例项控制中，稳态误差难以完全消除，因此引入积分项。

**积分项（I）**

- 含有比例项和积分项的PID输出值：

$$
out(t) = K_p \cdot error(t) + K_i \int_0^t error(t) \, dt
$$

- 积分项的输出值取决于0~t所有时刻误差的积分， **与历史时刻有关** 。
- 积分项将历史所有时刻的误差累积，乘上积分项系数后作为积分项输出值。
- 积分项用于弥补纯比例项产生的稳态误差，若系统持续产生误差，则积分项会不断累积误差，直到控制器产生动作，让稳态误差消失。
- 积分项权重越大，稳态误差消失越快，但系统滞后性也会随之增加。

!!!danger  
    滞后性是因为纯积分项不能很地根据目标值改变输出力度，而是缓慢改变，因此这是积分项的一个缺陷；但对于电机速度控制来说PI项足矣，而电机位置控制则需要加上D项。

**微分项（D）**

- 含有比例项、积分项和微分项的PID输出值：

$$
out(t) = K_p \cdot error(t) + K_i \int_0^t error(t) \, dt + K_d \cdot \frac{d \, error(t)}{dt}
$$

- 微分项的输出值取决于当前时刻误差变化的斜率，与当前时刻附近 **误差变化的趋势有关** 。
- 当误差急剧变化时，微分项会负反馈输出相反的作用力，阻碍误差急剧变化。
- 斜率一定程度上反映了误差未来的变化趋势，这使得微分项具有 **“预测未来，提前调控”** 的特性。
- 微分项给系统增加阻尼，可以有效防止系统超调，尤其是惯性比较大的系统。
- 微分项权重越大，系统阻尼越大，但系统卡顿现象也会随之增加。

## 2. 离散化PID

### 2.1 PID离散化

设采样周期T，每个T时刻读取一次误差值：

- P项：系数 × 第 k 个 T时刻误差值
- I项：系数 × 周期T × 误差的累加和
- D项：系数 × 第 k 个T时刻的误差斜率（ 即（本次误差 -上次误差） / 周期T ）

因此，PID离散化后的公式如下：



$$
out(k) = K_p \cdot error(k) + K_i \cdot T \sum_{j=0}^k error(j) + K_d \cdot \frac{error(k) - error(k-1)}{T}
$$


若将T的值融入到各项系数中，则为另一个形式的公式：



$$
out(k) = K_p \cdot error(k) + K_i \cdot \sum_{j=0}^k error(j) + K_d \cdot ({error(k) - error(k-1)})
$$

### 2.2 位置式PID

位置式PID就是PID离散化后的PID公式：



$$
out(k) = K_p \cdot error(k) + K_i \cdot \sum_{j=0}^k error(j) + K_d \cdot ({error(k) - error(k-1)})
$$

### 2.3 增量式PID

第k个T时刻：



$$
out(k) = K_p \cdot error(k) + K_i \cdot \sum_{j=0}^k error(j) + K_d \cdot ({error(k) - error(k-1)})
$$


第k-1个T时刻：



$$
out(k-1) = K_p \cdot error(k-1) + K_i \cdot \sum_{j=0}^{k-1} error(j) + K_d \cdot ({error(k-1) - error(k-2)})
$$


两式相减，得到增量式PID：



$$
\Delta out(k) = K_p \cdot (error(k) - error(k-1)) + K_i\cdot error(k) + K_d \cdot (error(k) - 2 \cdot error(k-1) + error(k-2))
$$

### 2.4 两种PID差异

- 位置式PID直接输出的为本次输出值的全量；以占空比为例：20%、22%、18%。
- 增量式PID直接输出的为本次输出值相对于上一次输出值的增量；以占空比为例：+0%、+2%、-4%。

## 3. PID程序

### 3.1 定速控制

位置式PID程序，大量运用了结构体比全局变量更直观一些：

`pid.h`

```C
#ifndef ROBOT_V1_0_PID_H
#define ROBOT_V1_0_PID_H

#include <stdio.h>
#include <string.h>
#include "usart.h"
#include "encoder.h"
#include "motor.h"

/* PID可调的参数 */
typedef struct {
    float P;
    float I;
    float D;
    float Target;
} PID_Params;

/* PID需从外部获取的参数 */
typedef struct {
    float Cur_Error;
    float Pre_Error;
    float Cnt_Error;
    float Actual;
} PID_Error;

/* 储存PID计算结果，用于同时控制四个电机 */
typedef struct {
    float duty1;
    float duty2;
    float duty3;
    float duty4;
} Duty;

float PID_GetDuty(uint8_t Hx);
void PID_Func(Duty* pDuty);
void PID_SetTarget(float target);
float PID_GetActual(void);
void PID_SetP(float P);
void PID_SetI(float I);
void PID_SetD(float D);
void PID_SerialPlot(Duty* pDuty, char* message);

#endif //ROBOT_V1_0_PID_H

```

`pid.c`

```C
#include "pid.h"

static PID_Params pPID = {0.6, 0.1, 0, 0};
static PID_Error pError;

/* 获取PID计算结果 */
float PID_GetDuty(uint8_t Hx) {
    float duty;
//    int32_t value = Encoder_Read_CNT(Hx);
    /* 获取真实值 */
//    pError.Actual = Motor_CntToDuty(value);
    pError.Actual = Encoder_Read_CNT(Hx);
    /* 处理误差 */
    pError.Pre_Error = pError.Cur_Error;
    pError.Cur_Error = pPID.Target - pError.Actual;
    pError.Cnt_Error += pError.Cur_Error;
    /* PID算法 */
    duty = pPID.P * pError.Cur_Error + pPID.I * pError.Cnt_Error + pPID.D * (pError.Cur_Error - pError.Pre_Error);
    if ( duty > 100 ) { duty = 100; }
    if ( duty < -100 ) { duty = -100; }
    return duty;
}

/* 将计算结果运用于控制器 */
void PID_Func(Duty* pDuty) {
    Motor_SetSpeed(1,pDuty->duty1);
    Motor_SetSpeed(2,pDuty->duty2);
    Motor_SetSpeed(3,pDuty->duty3);
    Motor_SetSpeed(4,pDuty->duty4);
}

/* 设置目标值 */
void PID_SetTarget(float target) {
    Motor_SetSpeed(1, target);
    Motor_SetSpeed(2, target);
    Motor_SetSpeed(3, target);
    Motor_SetSpeed(4, target);
    pPID.Target = target;
}

/* 获取真实值 */
float PID_GetActual(void) {
    return pError.Actual;
}

/* 设置PID参数P */
void PID_SetP(float P) {
    pPID.P = P;
}

/* 设置PID参数I */
void PID_SetI(float I) {
    pPID.I = I;
}

/* 设置PID参数D */
void PID_SetD(float D) {
    pPID.D = D;
}

/* SerialPlot绘图交互 */
void PID_SerialPlot(Duty* pDuty, char* message) {
    sprintf(message, "%f,%f,%f,%f,%f\r\n", pDuty->duty1, pDuty->duty2, pDuty->duty3, pDuty->duty4, pPID.Target);
    HAL_UART_Transmit(&huart1, (uint8_t *) message, strlen(message), 1000);
}
```

单个电机调控，定时中断100ms执行PID计算：

```C
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim) {
    /* USER CODE BEGIN Callback 0 */
    static Duty duty;
    char message[100] = "";
    if (htim->Instance == TIM7) {
        /*  */
        duty.duty4 = PID_GetDuty(4);
        duty.duty1 = PID_GetActual();
        PID_Func(&duty);
        /*  */
        PID_SerialPlot(&duty, message);
    }
}
```

### 3.2 位置控制

只需要改动一点，`PID_GetDuty`函数中真实值的获取：

```C
// 定速控制
pError.Actual = Encoder_Read_CNT(Hx);
// 位置控制
pError.Actual += Encoder_Read_CNT(Hx);
```

