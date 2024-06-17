# STM32通信

## 一、USART串口通信

> STM32--串口通信

### 1.1 通信协议

- **通信的目的：**将一个设备的数据传送到另一个设备，扩展硬件系统
- **通信协议：**制定通信的规则，通信双方按照协议规则进行数据收发

| **名称** | **引脚**             | **双工** | **时钟** | **电平** | **设备** |
| -------- | -------------------- | -------- | -------- | -------- | -------- |
| USART    | TX、RX               | 全双工   | 异步     | 单端     | 点对点   |
| I2C      | SCL、SDA             | 半双工   | 同步     | 单端     | 多设备   |
| SPI      | SCLK、MOSI、MISO、CS | 全双工   | 同步     | 单端     | 多设备   |
| CAN      | CAN_H、CAN_L         | 半双工   | 异步     | 差分     | 多设备   |
| USB      | DP、DM               | 半双工   | 异步     | 差分     | 点对点   |

> 双工：指通信双方是否可以同时进行双向通信（发送和接收）。
>
> 单工：数据只能从一个设备到另一个设备，不能反着来。
>
> 时钟： I2C 和 SPI 有单独的时钟线，所以是同步。
>
> 电平：单端信号，即引脚的高低电平是相对GND的电压差，所以需要共地。

### 1.2 串口通信简介

- 串口是一种应用十分广泛的通讯接口，串口成本低、容易使用、通信线路简单，可实现两个设备的互相通信
- 单片机的串口可以使单片机与单片机、单片机与电脑、单片机与各式各样的模块互相通信，极大地扩展了单片机的应用范围，增强了单片机系统的硬件实力

![1706363962945](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706363962945.png)

![USB转串口](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/USB转串口.png)

#### 1.2.1硬件电路

- 简单双向串口通信有两根通信线（发送端TX和接收端RX）
- TX与RX要交叉连接
- 当只需单向的数据传输时，可以只接一根通信线
- 当电平标准不一致时，需要加电平转换芯片

![1706364052710](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706364052710.png)

#### 1.2.2 电平标准 ####

- 电平标准是数据1和数据0的表达方式，是传输线缆中人为规定的电压与数据的对应关系，串口常用的电平标准有如下三种：
- TTL电平：+3.3V或+5V表示1，0V表示0
- RS232电平：-3 至 -15V表示1，+3 至 +15V表示0
- RS485电平：两线压差+2至+6V表示1，-2 至 -6V表示0（差分信号）

#### 1.2.3 串口参数及时序 ####

- **波特率：**串口通信的速率
- **起始位：**标志一个数据帧的开始，**固定为低电平**
- **数据位：**数据帧的有效载荷，1为高电平，0为低电平，低位先行
- **校验位：**用于数据验证，根据数据位计算得来(无校验、奇校验--即保持二进制数据1的个数为奇数、偶校验)
- **停止位：**用于数据帧间隔，**固定为高电平**

![1706365185213](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706365185213.png)

#### 1.2.4 串口时序 ####

![1706364301642](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706364301642.png)

### 1.3 USART简介 ###

- USART（Universal Synchronous/Asynchronous Receiver/Transmitter）通用同步/异步收发器
- USART是STM32内部集成的硬件外设，可根据数据寄存器的一个字节数据自动生成数据帧时序，从TX引脚发送出去，也可自动接收RX引脚的数据帧时序，拼接为一个字节数据，存放在数据寄存器里
- 自带波特率发生器，最高达4.5Mbits/s
- 可配置数据位长度（8/9）、停止位长度（0.5/1/1.5/2）
- 可选校验位（无校验/奇校验/偶校验）
- 支持同步模式、硬件流控制、DMA、智能卡、IrDA、LIN
- STM32F103C8T6 USART资源： USART1、 USART2、 USART3

#### 1.3.1 USART框图 ####

![1706364443610](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706364443610.png)

#### 1.3.2 USART基本结构 ####

![1706365964060](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706365964060.png)

#### 1.3.3 数据帧 ####

![1706366018154](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706366018154.png)

![1706366029738](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706366029738.png)

#### 1.3.4 起始位侦测 ####

![1706366050574](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706366050574.png)

![1706366062786](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706366062786.png)

#### 1.3.6 波特率发生器 ####

- 发送器和接收器的波特率由波特率寄存器BRR里的DIV确定
- 计算公式：波特率 = f_PCLK2/1 / (16 * DIV)​

![1706366102368](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706366102368.png)

### 1.4 USART代码示例 ###

```C
#include "stm32f10x.h"                  // Device header
#include <stdio.h>
#include <stdarg.h>

uint8_t Serial_RxData;		//定义串口接收的数据变量
uint8_t Serial_RxFlag;		//定义串口接收的标志位变量

/**
  * 函    数：串口初始化
  * 参    数：无
  * 返 回 值：无
  */
void Serial_Init(void)
{
	/*开启时钟*/
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1, ENABLE);	//开启USART1的时钟
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);	//开启GPIOA的时钟
	
	/*GPIO初始化*/
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_9;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);					//将PA9引脚初始化为复用推挽输出
	
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_10;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);					//将PA10引脚初始化为上拉输入
	
	/*USART初始化*/
	USART_InitTypeDef USART_InitStructure;					//定义结构体变量
	USART_InitStructure.USART_BaudRate = 9600;				//波特率
	USART_InitStructure.USART_HardwareFlowControl = USART_HardwareFlowControl_None;	//硬件流控制，不需要
	USART_InitStructure.USART_Mode = USART_Mode_Tx | USART_Mode_Rx;	//模式，发送模式和接收模式均选择
	USART_InitStructure.USART_Parity = USART_Parity_No;		//奇偶校验，不需要
	USART_InitStructure.USART_StopBits = USART_StopBits_1;	//停止位，选择1位
	USART_InitStructure.USART_WordLength = USART_WordLength_8b;		//字长，选择8位
	USART_Init(USART1, &USART_InitStructure);				//将结构体变量交给USART_Init，配置USART1
	
	/*中断输出配置*/
	USART_ITConfig(USART1, USART_IT_RXNE, ENABLE);			//开启串口接收数据的中断
	
	/*NVIC中断分组*/
	NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2);			//配置NVIC为分组2
	
	/*NVIC配置*/
	NVIC_InitTypeDef NVIC_InitStructure;					//定义结构体变量
	NVIC_InitStructure.NVIC_IRQChannel = USART1_IRQn;		//选择配置NVIC的USART1线
	NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;			//指定NVIC线路使能
	NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 1;		//指定NVIC线路的抢占优先级为1
	NVIC_InitStructure.NVIC_IRQChannelSubPriority = 1;		//指定NVIC线路的响应优先级为1
	NVIC_Init(&NVIC_InitStructure);							//将结构体变量交给NVIC_Init，配置NVIC外设
	
	/*USART使能*/
	USART_Cmd(USART1, ENABLE);								//使能USART1，串口开始运行
}

/**
  * 函    数：串口发送一个字节
  * 参    数：Byte 要发送的一个字节
  * 返 回 值：无
  */
void Serial_SendByte(uint8_t Byte)
{
	USART_SendData(USART1, Byte);		//将字节数据写入数据寄存器，写入后USART自动生成时序波形
	while (USART_GetFlagStatus(USART1, USART_FLAG_TXE) == RESET);	//等待发送完成
	/*下次写入数据寄存器会自动清除发送完成标志位，故此循环后，无需清除标志位*/
}

/**
  * 函    数：串口发送一个数组
  * 参    数：Array 要发送数组的首地址
  * 参    数：Length 要发送数组的长度
  * 返 回 值：无
  */
void Serial_SendArray(uint8_t *Array, uint16_t Length)
{
	uint16_t i;
	for (i = 0; i < Length; i ++)		//遍历数组
	{
		Serial_SendByte(Array[i]);		//依次调用Serial_SendByte发送每个字节数据
	}
}

/**
  * 函    数：串口发送一个字符串
  * 参    数：String 要发送字符串的首地址
  * 返 回 值：无
  */
void Serial_SendString(char *String)
{
	uint8_t i;
	for (i = 0; String[i] != '\0'; i ++)//遍历字符数组（字符串），遇到字符串结束标志位后停止
	{
		Serial_SendByte(String[i]);		//依次调用Serial_SendByte发送每个字节数据
	}
}

/**
  * 函    数：次方函数（内部使用）
  * 返 回 值：返回值等于X的Y次方
  */
uint32_t Serial_Pow(uint32_t X, uint32_t Y)
{
	uint32_t Result = 1;	//设置结果初值为1
	while (Y --)			//执行Y次
	{
		Result *= X;		//将X累乘到结果
	}
	return Result;
}

/**
  * 函    数：串口发送数字
  * 参    数：Number 要发送的数字，范围：0~4294967295
  * 参    数：Length 要发送数字的长度，范围：0~10
  * 返 回 值：无
  */
void Serial_SendNumber(uint32_t Number, uint8_t Length)
{
	uint8_t i;
	for (i = 0; i < Length; i ++)		//根据数字长度遍历数字的每一位
	{
		Serial_SendByte(Number / Serial_Pow(10, Length - i - 1) % 10 + '0');	//依次调用Serial_SendByte发送每位数字
	}
}

/**
  * 函    数：使用printf需要重定向的底层函数
  * 参    数：保持原始格式即可，无需变动
  * 返 回 值：保持原始格式即可，无需变动
  */
int fputc(int ch, FILE *f)
{
	Serial_SendByte(ch);			//将printf的底层重定向到自己的发送字节函数
	return ch;
}

/**
  * 函    数：自己封装的prinf函数
  * 参    数：format 格式化字符串
  * 参    数：... 可变的参数列表
  * 返 回 值：无
  */
void Serial_Printf(char *format, ...)
{
	char String[100];				//定义字符数组
	va_list arg;					//定义可变参数列表数据类型的变量arg
	va_start(arg, format);			//从format开始，接收参数列表到arg变量
	vsprintf(String, format, arg);	//使用vsprintf打印格式化字符串和参数列表到字符数组中
	va_end(arg);					//结束变量arg
	Serial_SendString(String);		//串口发送字符数组（字符串）
}

/**
  * 函    数：获取串口接收标志位
  * 参    数：无
  * 返 回 值：串口接收标志位，范围：0~1，接收到数据后，标志位置1，读取后标志位自动清零
  */
uint8_t Serial_GetRxFlag(void)
{
	if (Serial_RxFlag == 1)			//如果标志位为1
	{
		Serial_RxFlag = 0;
		return 1;					//则返回1，并自动清零标志位
	}
	return 0;						//如果标志位为0，则返回0
}

/**
  * 函    数：获取串口接收的数据
  * 参    数：无
  * 返 回 值：接收的数据，范围：0~255
  */
uint8_t Serial_GetRxData(void)
{
	return Serial_RxData;			//返回接收的数据变量
}

/**
  * 函    数：USART1中断函数
  * 参    数：无
  * 返 回 值：无
  * 注意事项：此函数为中断函数，无需调用，中断触发后自动执行
  *           函数名为预留的指定名称，可以从启动文件复制
  *           请确保函数名正确，不能有任何差异，否则中断函数将不能进入
  */
void USART1_IRQHandler(void)
{
	if (USART_GetITStatus(USART1, USART_IT_RXNE) == SET)		//判断是否是USART1的接收事件触发的中断
	{
		Serial_RxData = USART_ReceiveData(USART1);				//读取数据寄存器，存放在接收的数据变量
		Serial_RxFlag = 1;										//置接收标志位变量为1
		USART_ClearITPendingBit(USART1, USART_IT_RXNE);			//清除USART1的RXNE标志位
																//读取数据寄存器会自动清除此标志位
																//如果已经读取了数据寄存器，也可以不执行此代码
	}
}

```



### 1.5 数据包接收 ###

#### 1.5.1 数据模式 ####

- HEX模式/十六进制模式/二进制模式：以原始数据的形式显示
- 文本模式/字符模式：以原始数据编码后的形式显示

![asc](.\STM32四大通信协议\asc.png)

![数据模式](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/数据模式.png)

#### 1.5.2 HEX数据包 ####

- **固定包长，含包头包尾**

![1706366291211](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706366291211.png)

- **可变包长，含包头包尾**

![1706366317290](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706366317290.png)

#### 1.5.3 文本数据包 ####

- **固定包长，含包头包尾**

![1706366411492](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706366411492.png)

- **可变包长，含包头包尾**

![1706366433207](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706366433207.png)

#### 1.5.4 HEX数据包接收 ####

![接收hex数据包](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/接收hex数据包.png)

#### 1.5.5 文本数据包接收 ####

![接收文本数据包](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/接收文本数据包.png)

### 1.6 数据包代码示例 ###

#### 1.6.1 HEX数据包 ####

```C
void USART1_IRQHandler(void)
{
	static uint8_t RxState = 0;		//定义表示当前状态机状态的静态变量
	static uint8_t pRxPacket = 0;	//定义表示当前接收数据位置的静态变量
	if (USART_GetITStatus(USART1, USART_IT_RXNE) == SET)		//判断是否是USART1的接收事件触发的中断
	{
		uint8_t RxData = USART_ReceiveData(USART1);				//读取数据寄存器，存放在接收的数据变量
		
		/*使用状态机的思路，依次处理数据包的不同部分*/
		
		/*当前状态为0，接收数据包包头*/
		if (RxState == 0)
		{
			if (RxData == 0xFF)			//如果数据确实是包头
			{
				RxState = 1;			//置下一个状态
				pRxPacket = 0;			//数据包的位置归零
			}
		}
		/*当前状态为1，接收数据包数据*/
		else if (RxState == 1)
		{
			Serial_RxPacket[pRxPacket] = RxData;	//将数据存入数据包数组的指定位置
			pRxPacket ++;				//数据包的位置自增
			if (pRxPacket >= 4)			//如果收够4个数据
			{
				RxState = 2;			//置下一个状态
			}
		}
		/*当前状态为2，接收数据包包尾*/
		else if (RxState == 2)
		{
			if (RxData == 0xFE)			//如果数据确实是包尾部
			{
				RxState = 0;			//状态归0
				Serial_RxFlag = 1;		//接收数据包标志位置1，成功接收一个数据包
			}
		}
		
		USART_ClearITPendingBit(USART1, USART_IT_RXNE);		//清除标志位
	}
}

```

#### 1.6.2 文本数据包 ####

```C
void USART1_IRQHandler(void)
{
	static uint8_t RxState = 0;		//定义表示当前状态机状态的静态变量
	static uint8_t pRxPacket = 0;	//定义表示当前接收数据位置的静态变量
	if (USART_GetITStatus(USART1, USART_IT_RXNE) == SET)	//判断是否是USART1的接收事件触发的中断
	{
		uint8_t RxData = USART_ReceiveData(USART1);			//读取数据寄存器，存放在接收的数据变量
		
		/*使用状态机的思路，依次处理数据包的不同部分*/
		
		/*当前状态为0，接收数据包包头*/
		if (RxState == 0)
		{
			if (RxData == '@' && Serial_RxFlag == 0)		//如果数据确实是包头，并且上一个数据包已处理完毕
			{
				RxState = 1;			//置下一个状态
				pRxPacket = 0;			//数据包的位置归零
			}
		}
		/*当前状态为1，接收数据包数据，同时判断是否接收到了第一个包尾*/
		else if (RxState == 1)
		{
			if (RxData == '\r')			//如果收到第一个包尾
			{
				RxState = 2;			//置下一个状态
			}
			else						//接收到了正常的数据
			{
				Serial_RxPacket[pRxPacket] = RxData;		//将数据存入数据包数组的指定位置
				pRxPacket ++;			//数据包的位置自增
			}
		}
		/*当前状态为2，接收数据包第二个包尾*/
		else if (RxState == 2)
		{
			if (RxData == '\n')			//如果收到第二个包尾
			{
				RxState = 0;			//状态归0
				Serial_RxPacket[pRxPacket] = '\0';			//将收到的字符数据包添加一个字符串结束标志
				Serial_RxFlag = 1;		//接收数据包标志位置1，成功接收一个数据包
			}
		}
		
		USART_ClearITPendingBit(USART1, USART_IT_RXNE);		//清除标志位
	}
}
```

## 二、I2C通信 ##

> STM32--I2C通信

### 2.1 I2C通信简介 ###

- I2C（Inter IC Bus）是由Philips公司开发的一种通用数据总线
- 两根通信线：SCL（Serial Clock）、SDA（Serial Data）
- 同步，半双工
- 带数据应答
- 支持总线挂载多设备（一主多从、多主多从）

#### 2.1.1 硬件电路 ####

- 所有I2C设备的SCL连在一起，SDA连在一起
- 设备的SCL和SDA均要配置成开漏输出模式
- SCL和SDA各添加一个上拉电阻，阻值一般为4.7KΩ左右

![1706263977088](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706263977088.png)

![1706263989395](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706263989395.png)

#### 2.1.2 I2C时序基本单元 ####

- **起始条件：**SCL高电平期间，SDA从高电平切换到低电平
- **终止条件：**SCL高电平期间，SDA从低电平切换到高电平

![1706264194346](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706264194346.png)

- **发送一个字节：**SCL低电平期间，主机将数据位依次放到SDA线上（高位先行），然后释放SCL，从机将在SCL高电平期间读取数据位，所以SCL高电平期间SDA不允许有数据变化，依次循环上述过程8次，即可发送一个字节

![1706264284743](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706264284743.png)

- **接收一个字节：**SCL低电平期间，从机将数据位依次放到SDA线上（高位先行），然后释放SCL，主机将在SCL高电平期间读取数据位，所以SCL高电平期间SDA不允许有数据变化，依次循环上述过程8次，即可接收一个字节（主机在接收之前，需要释放SDA）

![1706264383307](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706264383307.png)

- **发送应答：**主机在接收完一个字节之后，在下一个时钟发送一位数据，数据0表示应答，数据1表示非应答
- **接收应答：**主机在发送完一个字节之后，在下一个时钟接收一位数据，判断从机是否应答，数据0表示应答，数据1表示非应答（主机在接收之前，需要释放SDA）

![1706264434067](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706264434067.png)

#### 2.1.3 I2C时序 ####

- **指定地址写**
- 对于指定设备（Slave Address），在指定地址（Reg Address）下，写入指定数据（Data）

![1706264556589](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706264556589.png)

- **当前地址读**
- 对于指定设备（Slave Address），在当前地址指针指示的地址下，读取从机数据（Data）

![1706265129206](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706265129206.png)

- **指定地址读**
- 对于指定设备（Slave Address），在指定地址（Reg Address）下，读取从机数据（Data）

![1706265164365](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706265164365.png)

### 2.2 MPU6050简介 ###

#### 2.2.1 陀螺仪介绍 ####

- MPU6050是一个6轴姿态传感器，可以测量芯片自身X、Y、Z轴的加速度、角速度参数，通过数据融合，可进一步得到姿态角，常应用于平衡车、飞行器等需要检测自身姿态的场景
- 3轴加速度计（Accelerometer）：测量X、Y、Z轴的加速度
- 3轴陀螺仪传感器（Gyroscope）：测量X、Y、Z轴的角速度

![1706265567624](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706265567624.png)

![1706265575585](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706265575585.png)

![1706265587929](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706265587929.png)

#### 2.2.2 MPU6050参数 ####

- 16位ADC采集传感器的模拟信号，量化范围：-32768~32767
- 加速度计满量程选择：±2、±4、±8、±16（g）
- 陀螺仪满量程选择： ±250、±500、±1000、±2000（°/sec）
- 可配置的数字低通滤波器
- 可配置的时钟源
- 可配置的采样分频
- I2C从机地址：1101000（AD0=0） 1101001（AD0=1）

#### 2.2.3 硬件电路 ####

| **引脚** | **功能**        |
| -------- | --------------- |
| VCC、GND | 电源            |
| SCL、SDA | I2C通信引脚     |
| XCL、XDA | 主机I2C通信引脚 |
| AD0      | 从机地址最低位  |
| INT      | 中断信号输出    |

![1706265831995](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706265831995.png)

![1706265861339](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706265861339.png)

### 2.3 软件模拟I2C ###

所谓软件模拟I2C即使用代码手动拉高拉低电平，实现I2C时序操作，可以随意选择SDA和SCL引脚使用更加灵活。

#### 2.3.1 I2C文件 ####

创建I2C.c文件，编写I2C基本时序

```c
#include "stm32f10x.h"                  // Device header
#include "MyI2C.h"
#include "Delay.h"


void MyI2C_W_SDA(uint8_t BitValue)
{
	GPIO_WriteBit(SDA_Port, SDA_Pin, (BitAction)BitValue);
	Delay_us(10);
}

void MyI2C_W_SCL(uint8_t BitValue)
{
	GPIO_WriteBit(SCL_Port, SCL_Pin, (BitAction)BitValue);
	Delay_us(10);
}

uint8_t MyI2C_R_SDA(void)
{
	uint8_t BitValue;
	BitValue = GPIO_ReadInputDataBit(SDA_Port, SDA_Pin);
	Delay_us(10);
	return BitValue;
}


void MyI2C_Init(void)
{
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_OD;
	GPIO_InitStructure.GPIO_Pin = SDA_Pin|SCL_Pin;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	
	GPIO_Init(SDA_Port, &GPIO_InitStructure);
	GPIO_SetBits(SDA_Port, SDA_Pin|SCL_Pin);
}

void MyI2C_Start(void)
{
	//起始条件:SCL高电平期间,SDA从高电平切换到低电平
	MyI2C_W_SDA(1);
	MyI2C_W_SCL(1);
	MyI2C_W_SDA(0);
	//SCL拉低,为--收发--数据做准备
	MyI2C_W_SCL(0);
}

void MyI2C_Stop(void)
{
	//终止条件:SCL高电平期间,SDA从低电平切换到高电平
	MyI2C_W_SDA(0);
	MyI2C_W_SCL(1);
	MyI2C_W_SDA(1);
}

void MyI2C_SendByte(uint8_t Byte)
{
	uint8_t i;
	for(i=0; i<8; i++)
	{
		//第一种写法：
		MyI2C_W_SDA(Byte & (0x80 >> i));  //0x80=1000 0000
		//第二种写法
//		if((Byte & (0x80 >> i))==0) MyI2C_W_SDA(0);
//		else MyI2C_W_SDA(1);
		//拉高SCL读取数据
		MyI2C_W_SCL(1);
		//拉低,让SDA放数据
		MyI2C_W_SCL(0);
	}
}

uint8_t MyI2C_ReceiveByte(void)
{
	uint8_t i, Byte=0x00;
//	MyI2C_W_SCL(0);
	MyI2C_W_SDA(1);
	for(i=0; i<8; i++)
	{
		//读取数据
		MyI2C_W_SCL(1);
		if(MyI2C_R_SDA() == 1) {Byte |=(0x80 >> i);} //0x00=0000 0000
		MyI2C_W_SCL(0);
	}	
	return Byte;
}


void MyI2C_SendAck(uint8_t AckBit)
{
	//发送应答
	MyI2C_W_SDA(AckBit);
	//读取应答
	MyI2C_W_SCL(1);
	//进入下一个时序
	MyI2C_W_SCL(0);
}

uint8_t MyI2C_ReceiveAck(void)
{
	uint8_t AckBit;
	//发送应答
	MyI2C_W_SDA(1);
	//读取应答
	MyI2C_W_SCL(1);
	AckBit = MyI2C_R_SDA();
	//进入下一个时序
	MyI2C_W_SCL(0);
	return AckBit;
}
```

I2C.h文件定义引脚和函数声明

```c
#ifndef __MYI2C_H__
#define __MYI2C_H__
#include "stm32f10x.h" 

#define SDA_Pin GPIO_Pin_11
#define SCL_Pin GPIO_Pin_10
#define SCL_Port GPIOB
#define SDA_Port GPIOB

void MyI2C_Init(void);
uint8_t MyI2C_R_SDA(void);
void MyI2C_W_SCL(uint8_t BitValue);
void MyI2C_W_SDA(uint8_t BitValue);
void MyI2C_Start(void);
void MyI2C_Stop(void);
void MyI2C_SendByte(uint8_t Byte);
uint8_t MyI2C_ReceiveByte(void);
void MyI2C_SendAck(uint8_t AckBit);
uint8_t MyI2C_ReceiveAck(void);

#endif
```

#### 2.3.2 Mpu6050文件 ####

创建Mpu6050.c文件，编写MPU6050操作函数

```c
#include "stm32f10x.h"                  // Device header
#include "MyI2C.h"
#include "Mpu6050.h"

#define MPU_Address 0xD0  //MPU6050的寻址 + R( Bit(0) )

void MPU6050_Init(void)
{
	//初始化I2C引脚
	MyI2C_Init();
	
	//配置寄存器
	MPU6050_WriteReg(MPU6050_PWR_MGMT_1, 0x01);
	MPU6050_WriteReg(MPU6050_PWR_MGMT_2, 0x00);
	MPU6050_WriteReg(MPU6050_SMPLRT_DIV, 0x09);
	MPU6050_WriteReg(MPU6050_CONFIG, 0x06);
	MPU6050_WriteReg(MPU6050_GYRO_CONFIG, 0x18);
	MPU6050_WriteReg(MPU6050_ACCEL_CONFIG, 0x18);
}


void MPU6050_WriteReg(uint8_t RegAddress, uint8_t Byte)
{
	MyI2C_Start();
	//-1-指定从机的寻址 + R/W
	MyI2C_SendByte(MPU_Address);
	//接收应答
	MyI2C_ReceiveAck();
	//-2-指定要写入寄存器地址
	MyI2C_SendByte(RegAddress);
	MyI2C_ReceiveAck();
	//-3-发送数据(一个字节)
	MyI2C_SendByte(Byte);
	MyI2C_ReceiveAck();
	MyI2C_Stop();
}


uint8_t MPU6050_ReadReg(uint8_t RegAddress)
{
	uint8_t Data;
	
	MyI2C_Start();
	MyI2C_SendByte(MPU_Address);
	MyI2C_ReceiveAck();
	MyI2C_SendByte(RegAddress);
	MyI2C_ReceiveAck();
	
	MyI2C_Start();
	MyI2C_SendByte(MPU_Address | 0x01);
	MyI2C_ReceiveAck();
	Data = MyI2C_ReceiveByte();
	MyI2C_SendAck(1);
	MyI2C_Stop();
	
	return Data;
}
uint8_t MPU6050_GetID(void)
{
	return MPU6050_ReadReg(MPU6050_WHO_AM_I);
}
/**
  * 函    数：MPU6050获取数据
  * 参    数：AccX AccY AccZ 加速度计X、Y、Z轴的数据，使用输出参数的形式返回，范围：-32768~32767
  * 参    数：GyroX GyroY GyroZ 陀螺仪X、Y、Z轴的数据，使用输出参数的形式返回，范围：-32768~32767
  * 返 回 值：无
  */
void MPU6050_GetData(int16_t *AccX, int16_t *AccY, int16_t *AccZ, 
						int16_t *GyroX, int16_t *GyroY, int16_t *GyroZ)
{
	uint8_t DataH, DataL;								//定义数据高8位和低8位的变量
	
	DataH = MPU6050_ReadReg(MPU6050_ACCEL_XOUT_H);		//读取加速度计X轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_ACCEL_XOUT_L);		//读取加速度计X轴的低8位数据
	*AccX = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
	
	DataH = MPU6050_ReadReg(MPU6050_ACCEL_YOUT_H);		//读取加速度计Y轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_ACCEL_YOUT_L);		//读取加速度计Y轴的低8位数据
	*AccY = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
	
	DataH = MPU6050_ReadReg(MPU6050_ACCEL_ZOUT_H);		//读取加速度计Z轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_ACCEL_ZOUT_L);		//读取加速度计Z轴的低8位数据
	*AccZ = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
	
	DataH = MPU6050_ReadReg(MPU6050_GYRO_XOUT_H);		//读取陀螺仪X轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_GYRO_XOUT_L);		//读取陀螺仪X轴的低8位数据
	*GyroX = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
	
	DataH = MPU6050_ReadReg(MPU6050_GYRO_YOUT_H);		//读取陀螺仪Y轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_GYRO_YOUT_L);		//读取陀螺仪Y轴的低8位数据
	*GyroY = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
	
	DataH = MPU6050_ReadReg(MPU6050_GYRO_ZOUT_H);		//读取陀螺仪Z轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_GYRO_ZOUT_L);		//读取陀螺仪Z轴的低8位数据
	*GyroZ = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
}
```

> MPU6050_GetData函数的使用方法见[主函数](#2.3.3main主函数)代码，采用了指针做形参传递的方法。

创建Mpu6050.h文件，定义MPU6050各个寄存器地址

```c
#ifndef __MPU6050_H__
#define __MPU6050_H__
//#include "stm32f10x.h" 

#define	MPU6050_SMPLRT_DIV		0x19
#define	MPU6050_CONFIG			0x1A
#define	MPU6050_GYRO_CONFIG		0x1B
#define	MPU6050_ACCEL_CONFIG	0x1C

#define	MPU6050_ACCEL_XOUT_H	0x3B
#define	MPU6050_ACCEL_XOUT_L	0x3C
#define	MPU6050_ACCEL_YOUT_H	0x3D
#define	MPU6050_ACCEL_YOUT_L	0x3E
#define	MPU6050_ACCEL_ZOUT_H	0x3F
#define	MPU6050_ACCEL_ZOUT_L	0x40
#define	MPU6050_TEMP_OUT_H		0x41
#define	MPU6050_TEMP_OUT_L		0x42
#define	MPU6050_GYRO_XOUT_H		0x43
#define	MPU6050_GYRO_XOUT_L		0x44
#define	MPU6050_GYRO_YOUT_H		0x45
#define	MPU6050_GYRO_YOUT_L		0x46
#define	MPU6050_GYRO_ZOUT_H		0x47
#define	MPU6050_GYRO_ZOUT_L		0x48

#define	MPU6050_PWR_MGMT_1		0x6B
#define	MPU6050_PWR_MGMT_2		0x6C
#define	MPU6050_WHO_AM_I		0x75

uint8_t MPU6050_GetID(void);
void MPU6050_Init(void);
void MPU6050_WriteReg(uint8_t RegAddress, uint8_t Byte);
uint8_t MPU6050_ReadReg(uint8_t RegAddress);
void MPU6050_GetData(int16_t *AccX, int16_t *AccY, int16_t *AccZ, 
						int16_t *GyroX, int16_t *GyroY, int16_t *GyroZ);

#endif
```

#### 2.3.3main主函数 ####

```c
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "MPU6050.h"

uint8_t ID;								//定义用于存放ID号的变量
int16_t AX, AY, AZ, GX, GY, GZ;			//定义用于存放各个数据的变量

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	MPU6050_Init();		//MPU6050初始化
	
	/*显示ID号*/
	OLED_ShowString(1, 1, "ID:");		//显示静态字符串
	ID = MPU6050_GetID();				//获取MPU6050的ID号
	OLED_ShowHexNum(1, 4, ID, 2);		//OLED显示ID号
	
	while (1)
	{
		MPU6050_GetData(&AX, &AY, &AZ, &GX, &GY, &GZ);		//获取MPU6050的数据
		OLED_ShowSignedNum(2, 1, AX, 5);					//OLED显示数据
		OLED_ShowSignedNum(3, 1, AY, 5);
		OLED_ShowSignedNum(4, 1, AZ, 5);
		OLED_ShowSignedNum(2, 8, GX, 5);
		OLED_ShowSignedNum(3, 8, GY, 5);
		OLED_ShowSignedNum(4, 8, GZ, 5);
	}
}
```



### 2.4 I2C硬件外设 ###

- STM32内部集成了硬件I2C收发电路，可以由硬件自动执行时钟生成、起始终止条件生成、应答位收发、数据收发等功能，减轻CPU的负担
- 支持多主机模型
- 支持7位/10位地址模式
- 支持不同的通讯速度，标准速度(高达100 kHz)，快速(高达400 kHz)
- 支持DMA
- 兼容SMBus协议
- STM32F103C8T6 硬件I2C资源：I2C1、I2C2

#### 2.4.1 I2C框图 ####

![1706267084943](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706267084943.png)

#### 2.4.2 I2C基本结构 ####

![1706267260181](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706267260181.png)

#### 2.4.3 主机发送 ####

![1706267294207](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706267294207.png)

#### 2.4.4 主机接收 ####

![1706267321796](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706267321796.png)

### 2.5 硬件I2C ###

保持I2C文件代码不编，修改Mpu6050.c的配置代码

```c
#include "stm32f10x.h"                  // Device header
#include "MyI2C.h"
#include "Mpu6050.h"

#define SDA_Pin GPIO_Pin_11
#define SCL_Pin GPIO_Pin_10
#define SCL_Port GPIOB
#define SDA_Port GPIOB
#define MPU_Address 0xD0  //MPU6050的寻址 + R( Bit(0) )

void MPU6050_WaitEvent(I2C_TypeDef* I2Cx, uint32_t I2C_EVENT)
{
	uint32_t Timeout;
	Timeout = 10000;
	while (I2C_CheckEvent(I2Cx, I2C_EVENT) != SUCCESS)
	{
		Timeout --;
		if (Timeout == 0)
		{
			break;
		}
	}
}

void MPU6050_Init(void)
{
	//初始化I2C引脚
	//替换MyI2C_Init();
	RCC_APB1PeriphClockCmd(RCC_APB1Periph_I2C2, ENABLE);
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);
	
	GPIO_InitTypeDef GPIO_InitStrcture;
	GPIO_InitStrcture.GPIO_Mode = GPIO_Mode_AF_OD;
	GPIO_InitStrcture.GPIO_Pin = SDA_Pin|SCL_Pin;
	GPIO_InitStrcture.GPIO_Speed = GPIO_Speed_50MHz;
	
	GPIO_Init(SDA_Port, &GPIO_InitStrcture);
	
	I2C_InitTypeDef I2C_InitStructure;
	I2C_InitStructure.I2C_Ack = I2C_Ack_Enable;
	I2C_InitStructure.I2C_AcknowledgedAddress = I2C_AcknowledgedAddress_7bit;
	I2C_InitStructure.I2C_ClockSpeed = 50000;
	I2C_InitStructure.I2C_DutyCycle = I2C_DutyCycle_2;
	I2C_InitStructure.I2C_Mode = I2C_Mode_I2C;
	I2C_InitStructure.I2C_OwnAddress1 = 0x00;
	
	I2C_Init(I2C2, &I2C_InitStructure);
	I2C_Cmd(I2C2, ENABLE); //使能I2C2
	
	//配置寄存器
	MPU6050_WriteReg(MPU6050_PWR_MGMT_1, 0x01);	//电源管理寄存器1，取消睡眠模式，选择时钟源为X轴陀螺仪
	MPU6050_WriteReg(MPU6050_PWR_MGMT_2, 0x00);	//电源管理寄存器2，保持默认值0，所有轴均不待机
	MPU6050_WriteReg(MPU6050_SMPLRT_DIV, 0x09);		//采样率分频寄存器，配置采样率
	MPU6050_WriteReg(MPU6050_CONFIG, 0x06);			//配置寄存器，配置DLPF
	MPU6050_WriteReg(MPU6050_GYRO_CONFIG, 0x18);	//陀螺仪配置寄存器，选择满量程为±2000°/s
	MPU6050_WriteReg(MPU6050_ACCEL_CONFIG, 0x18);	//加速度计配置寄存器，选择满量程为±16g
}


void MPU6050_WriteReg(uint8_t RegAddress, uint8_t Byte)
{
	/*  软件I2C
	MyI2C_Start();
	//-1-指定从机的寻址 + R/W
	MyI2C_SendByte(MPU_Address);
	//接收应答
	MyI2C_ReceiveAck();
	//-2-指定要写入寄存器地址
	MyI2C_SendByte(RegAddress);
	MyI2C_ReceiveAck();
	//-3-发送数据(一个字节)
	MyI2C_SendByte(Byte);
	MyI2C_ReceiveAck();
	MyI2C_Stop();
	*/	
	//硬件I2C
	I2C_GenerateSTART(I2C2, ENABLE); 
	//等待EV5事件（主机模式已选择）
	MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_MODE_SELECT);
	I2C_Send7bitAddress(I2C2, MPU_Address, I2C_Direction_Transmitter);
	//等待EV6事件
	MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_TRANSMITTER_MODE_SELECTED);
	I2C_SendData(I2C2, RegAddress);
	//等待EV8事件
	MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_BYTE_TRANSMITTING);
	I2C_SendData(I2C2, Byte);
	//等待EV8-2事件
	MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_BYTE_TRANSMITTED);
	I2C_GenerateSTOP(I2C2, ENABLE);
}


uint8_t MPU6050_ReadReg(uint8_t RegAddress)
{
	uint8_t Data;
	/* 软件I2C
	MyI2C_Start();
	MyI2C_SendByte(MPU_Address);
	MyI2C_ReceiveAck();
	MyI2C_SendByte(RegAddress);
	MyI2C_ReceiveAck();
	
	MyI2C_Start();
	MyI2C_SendByte(MPU_Address | 0x01);
	MyI2C_ReceiveAck();
	Data = MyI2C_ReceiveByte();
	MyI2C_SendAck(1);
	MyI2C_Stop();
	*/
	//硬件I2C
	I2C_GenerateSTART(I2C2, ENABLE); 
	//等待EV5事件（主机模式已选择）
	MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_MODE_SELECT);
	I2C_Send7bitAddress(I2C2, MPU_Address, I2C_Direction_Transmitter);
	//等待EV6事件
	MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_TRANSMITTER_MODE_SELECTED);
	I2C_SendData(I2C2, RegAddress);
	//等待EV8-2事件
	MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_BYTE_TRANSMITTED);
	
	I2C_GenerateSTART(I2C2, ENABLE); 
	//等待EV5事件（主机模式已选择）
	MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_MODE_SELECT);
	
	I2C_Send7bitAddress(I2C2, MPU_Address, I2C_Direction_Receiver);
	//等待EV6事件
	MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_RECEIVER_MODE_SELECTED);
	//提前将--应答位置0--产生停止条件
	I2C_AcknowledgeConfig(I2C2, DISABLE);
	I2C_GenerateSTOP(I2C2, ENABLE);
	//等待EV7事件
	MPU6050_WaitEvent(I2C2, I2C_EVENT_MASTER_BYTE_RECEIVED);	
	
	Data = I2C_ReceiveData(I2C2);
	//应答位置1
	I2C_AcknowledgeConfig(I2C2, ENABLE);

	return Data;
}
uint8_t MPU6050_GetID(void)
{
	return MPU6050_ReadReg(MPU6050_WHO_AM_I);
}
/**
  * 函    数：MPU6050获取数据
  * 参    数：AccX AccY AccZ 加速度计X、Y、Z轴的数据，使用输出参数的形式返回，范围：-32768~32767
  * 参    数：GyroX GyroY GyroZ 陀螺仪X、Y、Z轴的数据，使用输出参数的形式返回，范围：-32768~32767
  * 返 回 值：无
  */
void MPU6050_GetData(int16_t *AccX, int16_t *AccY, int16_t *AccZ, 
						int16_t *GyroX, int16_t *GyroY, int16_t *GyroZ)
{
	uint8_t DataH, DataL;								//定义数据高8位和低8位的变量
	
	DataH = MPU6050_ReadReg(MPU6050_ACCEL_XOUT_H);		//读取加速度计X轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_ACCEL_XOUT_L);		//读取加速度计X轴的低8位数据
	*AccX = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
	
	DataH = MPU6050_ReadReg(MPU6050_ACCEL_YOUT_H);		//读取加速度计Y轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_ACCEL_YOUT_L);		//读取加速度计Y轴的低8位数据
	*AccY = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
	
	DataH = MPU6050_ReadReg(MPU6050_ACCEL_ZOUT_H);		//读取加速度计Z轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_ACCEL_ZOUT_L);		//读取加速度计Z轴的低8位数据
	*AccZ = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
	
	DataH = MPU6050_ReadReg(MPU6050_GYRO_XOUT_H);		//读取陀螺仪X轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_GYRO_XOUT_L);		//读取陀螺仪X轴的低8位数据
	*GyroX = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
	
	DataH = MPU6050_ReadReg(MPU6050_GYRO_YOUT_H);		//读取陀螺仪Y轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_GYRO_YOUT_L);		//读取陀螺仪Y轴的低8位数据
	*GyroY = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
	
	DataH = MPU6050_ReadReg(MPU6050_GYRO_ZOUT_H);		//读取陀螺仪Z轴的高8位数据
	DataL = MPU6050_ReadReg(MPU6050_GYRO_ZOUT_L);		//读取陀螺仪Z轴的低8位数据
	*GyroZ = (DataH << 8) | DataL;						//数据拼接，通过输出参数返回
}

```

main主函数代码

```c
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"
#include "MPU6050.h"

uint8_t ID;								//定义用于存放ID号的变量
int16_t AX, AY, AZ, GX, GY, GZ;			//定义用于存放各个数据的变量

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	MPU6050_Init();		//MPU6050初始化
	
	/*显示ID号*/
	OLED_ShowString(1, 1, "ID:");		//显示静态字符串
	ID = MPU6050_GetID();				//获取MPU6050的ID号
	OLED_ShowHexNum(1, 4, ID, 2);		//OLED显示ID号
	
	while (1)
	{
		MPU6050_GetData(&AX, &AY, &AZ, &GX, &GY, &GZ);		//获取MPU6050的数据
		OLED_ShowSignedNum(2, 1, AX, 5);					//OLED显示数据
		OLED_ShowSignedNum(3, 1, AY, 5);
		OLED_ShowSignedNum(4, 1, AZ, 5);
		OLED_ShowSignedNum(2, 8, GX, 5);
		OLED_ShowSignedNum(3, 8, GY, 5);
		OLED_ShowSignedNum(4, 8, GZ, 5);
	}
}


```

## 三、SPI通信 ##

> STM32--SPI通信

### 3.1 SPI通信简介 ###

- SPI（Serial Peripheral Interface）是由Motorola公司开发的一种通用数据总线
- 四根通信线：SCK（Serial Clock）、MOSI（Master Output Slave Input）、MISO（Master Input Slave Output）、SS（Slave Select）--
- 同步，全双工
- 支持总线挂载多设备（一主多从，**不支持**多主机）

#### 3.1.1 硬件电路 ####

- 所有SPI设备的SCK、MOSI、MISO分别连在一起
- 主机另外引出多条SS控制线，分别接到各从机的SS引脚
- 输出引脚配置为推挽输出，输入引脚配置为浮空或上拉输入

![1706277356750](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706277356750.png)

#### 3.1.2 移位示意图 ####

- 高位先行，高电平移出数据，低电平移入

![1706280036159](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706280036159.png)

#### 3.1.3 SPI时基单元 ####

- **起始条件：**SS从高电平切换到低电平
- **终止条件：**SS从低电平切换到高电平

![1706280340445](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706280340445.png)

SPI交换字节有多种模式可以选择，主要取决于CPOL(时钟极性)和CPHA(时钟相位)，一个四种组合方式。

- 交换一个字节**（模式0）**
- CPOL=0：空闲状态时，SCK为低电平
- CPHA=0：SCK第一个边沿移入数据，第二个边沿移出数据

![1706280519452](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706280519452.png)

- 交换一个字节**（模式1）**
- CPOL=0：空闲状态时，SCK为低电平
- CPHA=1：SCK第一个边沿移出数据，第二个边沿移入数据

![1706280584972](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706280584972.png)

- 交换一个字节**（模式2）**
- CPOL=1：空闲状态时，SCK为高电平
- CPHA=0：SCK第一个边沿移入数据，第二个边沿移出数据

![1706280625411](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706280625411.png)

- 交换一个字节**（模式3）**
- CPOL=1：空闲状态时，SCK为高电平
- CPHA=1：SCK第一个边沿移出数据，第二个边沿移入数据

![1706280660766](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706280660766.png)

#### 3.1.4 SPI时序 ####

- **发送指令**
- 向SS指定的设备，发送指令（0x06）

![1706280807159](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706280807159.png)

- 指定地址写
- 向SS指定的设备，发送写指令（0x02），随后在指定地址（Address[23:0]）下，写入指定数据（Data）

![1706280904218](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706280904218.png)

![1706280941789](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706280941789.png)

- 指定地址读
- 向SS指定的设备，发送读指令（0x03），  随后在指定地址（Address[23:0]）下，读取从机数据（Data）

> 与上图类似，将最后一步指令发送数据改为接收数据即可

### 3.2 W25Q64简介 ###

- W25Qxx系列是一种低成本、小型化、使用简单的非易失性存储器，常应用于数据存储、字库存储、固件程序存储等场景

- 存储介质：Nor Flash（闪存）

- 时钟频率：80MHz / 160MHz (Dual SPI) / 320MHz (Quad SPI)

- 存储容量（24位地址）：

  W25Q40：    4Mbit / 512KByte

  W25Q80：    8Mbit / 1MByte

  W25Q16：    16Mbit / 2MByte

  W25Q32：    32Mbit / 4MByte

  W25Q64：    64Mbit / 8MByte

  W25Q128：  128Mbit / 16MByte

  W25Q256：  256Mbit / 32MByte

![1706281198028](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706281198028.png)

#### 3.2.1 硬件电路 ####

![1706281226510](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706281226510.png)

![1706281236623](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706281236623.png)

| **引脚**   | **功能**            |
| ---------- | ------------------- |
| VCC、GND   | 电源（2.7~3.6V）    |
| CS（SS）   | SPI片选             |
| CLK（SCK） | SPI时钟             |
| DI（MOSI） | SPI主机输出从机输入 |
| DO（MISO） | SPI主机输入从机输出 |
| WP         | 写保护              |
| HOLD       | 数据保持            |

#### 3.2.2 W25Q64框图 ####

![1706281271396](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706281271396.png)

#### 3.2.3 Flash读写注意事项 ####

**写入操作时：**

- 写入操作前，必须先进行写使能
- 每个数据位只能由1改写为0，不能由0改写为1
- 写入数据前必须先擦除，擦除后，所有数据位变为1
- 擦除必须按最小擦除单元进行
- 连续写入多字节时，最多写入一页的数据，超过页尾位置的数据，会回到页首覆盖写入
- 写入操作结束后，芯片进入忙状态，不响应新的读写操作

**读取操作时：**

- 直接调用读取时序，无需使能，无需额外操作，没有页的限制，读取操作结束后不会进入忙状态，但不能在忙状态时读取

### 3.3 软件模拟SPI ###

#### 3.3.1 SPI文件 ####

创建MySPI.c文件，编写SPI基本时序单元

```c
#include "stm32f10x.h"                  // Device header

void MySPI_W_SS(uint8_t BitValue)
{
	GPIO_WriteBit(GPIOA, GPIO_Pin_4, (BitAction)BitValue);
}

void MySPI_W_MOSI(uint8_t BitValue)
{
	GPIO_WriteBit(GPIOA, GPIO_Pin_7, (BitAction)BitValue);
}

void MySPI_W_CLK(uint8_t BitValue)
{
	GPIO_WriteBit(GPIOA, GPIO_Pin_5, (BitAction)BitValue);
}

uint8_t MySPI_R_MISO(void)
{
	return GPIO_ReadInputDataBit(GPIOA, GPIO_Pin_6);
}


//主机输出引脚：SCK、MOSI、SS(复用推挽输出模式);主机输入引脚：MISO(上拉输入模式)
void MySPI_Init(void)
{
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);
	
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_4|GPIO_Pin_5|GPIO_Pin_7;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);
	
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);
	
	//初始化引脚电压(SPI0模式)
	MySPI_W_SS(1);
	MySPI_W_CLK(0);
}

void MySPI_Start(void)
{
	MySPI_W_SS(0);				//拉低SS，开始时序
}
void MySPI_Stop(void)
{
	MySPI_W_SS(1);				//拉高SS，终止时序
}

//
uint8_t MySPI_SwapByte(uint8_t ByteSend)
{
	uint8_t i,ByteReceive=0x00;
	for(i=0;i<8;i++)
	{
		//移出数据
		MySPI_W_MOSI(ByteSend & (0x80>>i));
		MySPI_W_CLK(1);
		//移入数据
		//当MISO为1时，置变量指定位为1，当MISO为0时，不做处理，指定位为默认的初值0
		if(MySPI_R_MISO()==1){ByteReceive |= (0x80>>i);}
		MySPI_W_CLK(0);
	}
	return ByteReceive;
}	

```

#### 3.3.2 W25Q64文件 ####

创建W25Q64.c文件，编写W25Q64操作函数

```c
#include "stm32f10x.h"                  // Device header
#include "MySPI.h"
#include "W25Q64.h"

void W25Q64_Init(void)
{
	MySPI_Init();
}

void W25Q64_GetID(uint8_t *MID, uint16_t *DID)
{
	MySPI_Start();
	MySPI_SwapByte(W25Q64_JEDEC_ID);
	*MID = MySPI_SwapByte(0xFF);
	*DID = MySPI_SwapByte(0xFF);
	//左移8位,后续获取底八位
	*DID<<=8;
	//取或“|”
	*DID |= MySPI_SwapByte(0xFF);
	MySPI_Stop();
}

/**
  * @brief  W25Q64写使能
  * @param  无
  * @retval 无
  */
void W25Q64_WriteEnable(void)
{
	MySPI_Start();
	MySPI_SwapByte(W25Q64_WRITE_ENABLE);
	MySPI_Stop();
}

/**
  * @brief  W25Q64等待“忙”状态
  * @param  无
  * @retval 无
  */
void W25Q64_WaitBusy(void)
{
	uint32_t Timeout;
	MySPI_Start();
	//读状态寄存器1的最后一位（1为忙）
	MySPI_SwapByte(W25Q64_READ_STATUS_REGISTER_1);
	while ((MySPI_SwapByte(W25Q64_DUMMY_BYTE) & 0x01)==1);
	
	Timeout = 100000;							//给定超时计数时间
	while ((MySPI_SwapByte(W25Q64_DUMMY_BYTE) & 0x01) == 0x01)	//循环等待忙标志位
	{
		Timeout --;								//等待时，计数值自减
		if (Timeout == 0)						//自减到0后，等待超时
		{
			/*超时的错误处理代码，可以添加到此处*/
			break;								//跳出等待，不等了
		}
	}
	
	MySPI_Stop();
}
/**
  * 函    数：W25Q64页编程
  * 参    数：Address 页编程的起始地址，范围：0x000000~0x7FFFFF
  * 参    数：DataArray	用于写入数据的数组
  * 参    数：Count 要写入数据的数量，范围：0~256
  * 返 回 值：无
  * 注意事项：写入的地址范围不能跨页
  */
void W25Q64_PageProgram(uint32_t Address, uint8_t *DataArray, uint8_t Count)
{
	uint32_t i;
	W25Q64_WriteEnable();
	MySPI_Start();
	MySPI_SwapByte(W25Q64_PAGE_PROGRAM);
	MySPI_SwapByte(Address>>16);
	MySPI_SwapByte(Address>>8);
	MySPI_SwapByte(Address);
	for(i=0; i<Count; i++)
	{
		MySPI_SwapByte(DataArray[i]);
	}
	
	MySPI_Stop();
	W25Q64_WaitBusy();
}

/**
  * 函    数：W25Q64扇区擦除（4KB）
  * 参    数：Address 指定扇区的地址，范围：0x000000~0x7FFFFF
  * 返 回 值：无
  */
void W25Q64_SectorErase(uint32_t Address)
{	
	W25Q64_WriteEnable();
	MySPI_Start();

	MySPI_SwapByte(W25Q64_SECTOR_ERASE_4KB);
	MySPI_SwapByte(Address>>16);
	MySPI_SwapByte(Address>>8);
	MySPI_SwapByte(Address);

	MySPI_Stop();
	W25Q64_WaitBusy();
}

/**
  * 函    数：W25Q64读取数据
  * 参    数：Address 读取数据的起始地址，范围：0x000000~0x7FFFFF
  * 参    数：DataArray 用于接收读取数据的数组，通过输出参数返回
  * 参    数：Count 要读取数据的数量，范围：0~0x800000
  * 返 回 值：无
  */
void W25Q64_ReadData(uint32_t Address, uint8_t *DataArray, uint8_t Count)
{
	uint32_t i;
	MySPI_Start();
	MySPI_SwapByte(W25Q64_READ_DATA);
	MySPI_SwapByte(Address>>16);
	MySPI_SwapByte(Address>>8);
	MySPI_SwapByte(Address);
	for(i=0; i<Count; i++)
	{
		DataArray[i] = MySPI_SwapByte(W25Q64_DUMMY_BYTE);
	}
	
	MySPI_Stop();
}


```

在W25Q64.h文件，记录W25Q64寄存器地址

```c
#ifndef __W25Q64_H__
#define __W25Q64_H__

#include "stm32f10x.h" 

#define W25Q64_WRITE_ENABLE							0x06
#define W25Q64_WRITE_DISABLE						0x04
#define W25Q64_READ_STATUS_REGISTER_1				0x05
#define W25Q64_READ_STATUS_REGISTER_2				0x35
#define W25Q64_WRITE_STATUS_REGISTER				0x01
#define W25Q64_PAGE_PROGRAM							0x02
#define W25Q64_QUAD_PAGE_PROGRAM					0x32
#define W25Q64_BLOCK_ERASE_64KB						0xD8
#define W25Q64_BLOCK_ERASE_32KB						0x52
#define W25Q64_SECTOR_ERASE_4KB						0x20
#define W25Q64_CHIP_ERASE							0xC7
#define W25Q64_ERASE_SUSPEND						0x75
#define W25Q64_ERASE_RESUME							0x7A
#define W25Q64_POWER_DOWN							0xB9
#define W25Q64_HIGH_PERFORMANCE_MODE				0xA3
#define W25Q64_CONTINUOUS_READ_MODE_RESET			0xFF
#define W25Q64_RELEASE_POWER_DOWN_HPM_DEVICE_ID		0xAB
#define W25Q64_MANUFACTURER_DEVICE_ID				0x90
#define W25Q64_READ_UNIQUE_ID						0x4B
#define W25Q64_JEDEC_ID								0x9F
#define W25Q64_READ_DATA							0x03
#define W25Q64_FAST_READ							0x0B
#define W25Q64_FAST_READ_DUAL_OUTPUT				0x3B
#define W25Q64_FAST_READ_DUAL_IO					0xBB
#define W25Q64_FAST_READ_QUAD_OUTPUT				0x6B
#define W25Q64_FAST_READ_QUAD_IO					0xEB
#define W25Q64_OCTAL_WORD_READ_QUAD_IO				0xE3

#define W25Q64_DUMMY_BYTE							0xFF


void W25Q64_Init(void);
void W25Q64_GetID(uint8_t *MID, uint16_t *DID);
void W25Q64_SectorErase(uint32_t Address);
void W25Q64_ReadData(uint32_t Address, uint8_t *DataArray, uint8_t Count);
void W25Q64_PageProgram(uint32_t Address, uint8_t *DataArray, uint8_t Count);

#endif


```

### 3.4 SPI硬件外设 ###

- STM32内部集成了硬件SPI收发电路，可以由硬件自动执行时钟生成、数据收发等功能，减轻CPU的负担
- 可配置8位/16位数据帧、高位先行/低位先行
- 时钟频率： fPCLK / (2, 4, 8, 16, 32, 64, 128, 256)
- 支持多主机模型、主或从操作
- 可精简为半双工/单工通信
- 支持DMA
- 兼容I2S协议
- STM32F103C8T6 硬件SPI资源：SPI1、SPI2

#### 3.4.1 SPI框图 ####

![1706282048455](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706282048455.png)

#### 3.4.2 SPI基本结构 ####

![1706282079465](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706282079465.png)

#### 3.4.3 主模式全双工连续传输 ####

![1706282124802](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706282124802.png)

#### 3.4.4 非连续传输 ####

![1706282162689](https://raw.githubusercontent.com/wxnlP/pic/main/STM32Serial/1706282162689.png)

### 3.5硬件SPI ###

修改MySPI.c文件

```c
#include "stm32f10x.h"                  // Device header

void MySPI_W_SS(uint8_t BitValue)
{
	GPIO_WriteBit(GPIOA, GPIO_Pin_4, (BitAction)BitValue);
}

void MySPI_W_MOSI(uint8_t BitValue)
{
	GPIO_WriteBit(GPIOA, GPIO_Pin_7, (BitAction)BitValue);
}

void MySPI_W_CLK(uint8_t BitValue)
{
	GPIO_WriteBit(GPIOA, GPIO_Pin_5, (BitAction)BitValue);
}

uint8_t MySPI_R_MISO(void)
{
	return GPIO_ReadInputDataBit(GPIOA, GPIO_Pin_6);
}


//主机输出引脚：SCK、MOSI、SS(复用推挽输出模式);主机输入引脚：MISO(上拉输入模式)
void MySPI_Init(void)
{
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_SPI1, ENABLE);

	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_4;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);
	
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);
	
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_5|GPIO_Pin_7;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure);
	
//	//初始化引脚电压(SPI0模式)
//	MySPI_W_SS(1);
//	MySPI_W_CLK(0);
	SPI_InitTypeDef SPI_InitStructure;
	SPI_InitStructure.SPI_Mode = SPI_Mode_Master;  //主机模式
	SPI_InitStructure.SPI_BaudRatePrescaler = SPI_BaudRatePrescaler_128;  //分频系数
	SPI_InitStructure.SPI_CPHA = SPI_CPHA_1Edge; //CPHA=0
	SPI_InitStructure.SPI_CPOL = SPI_CPOL_Low;  //CPOL=0,SPI模式0
	SPI_InitStructure.SPI_CRCPolynomial = 7;
	SPI_InitStructure.SPI_DataSize = SPI_DataSize_8b; //8位数据帧
	SPI_InitStructure.SPI_Direction = SPI_Direction_2Lines_FullDuplex; //全双工
	SPI_InitStructure.SPI_FirstBit = SPI_FirstBit_MSB; //高位先行
	SPI_InitStructure.SPI_NSS = SPI_NSS_Soft; //软件模拟SS引脚
	
	SPI_Init(SPI1, &SPI_InitStructure);
	SPI_Cmd(SPI1, ENABLE);
	MySPI_W_SS(1); //SS默认高电平
	
}

void MySPI_Start(void)
{
	MySPI_W_SS(0);				//拉低SS，开始时序
}
void MySPI_Stop(void)
{
	MySPI_W_SS(1);				//拉高SS，终止时序
}

//
uint8_t MySPI_SwapByte(uint8_t ByteSend)
{
//	uint8_t i,ByteReceive=0x00;
//	for(i=0;i<8;i++)
//	{
//		//移出数据
//		MySPI_W_MOSI(ByteSend & (0x80>>i));
//		MySPI_W_CLK(1);
//		//移入数据
//		//当MISO为1时，置变量指定位为1，当MISO为0时，不做处理，指定位为默认的初值0
//		if(MySPI_R_MISO()==1){ByteReceive |= (0x80>>i);}
//		MySPI_W_CLK(0);
//	}
//	return ByteReceive;
	
	while (SPI_I2S_GetFlagStatus(SPI1, SPI_I2S_FLAG_TXE) == RESET);
	SPI_I2S_SendData(SPI1, ByteSend);
	
	while (SPI_I2S_GetFlagStatus(SPI1, SPI_I2S_FLAG_RXNE) == RESET);
	
	return SPI_I2S_ReceiveData(SPI1);
}	

```

## 四、CAN总线 ##

> STM32--CAN总线

























