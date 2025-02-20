---
comments: true
---

## 1. UART理论

推荐阅读：[第九章 UART - 小李 的知识库](https://tonmoon.top/study/STM32/9.URAT串口通信/#931-usart)

Hi3861引脚及复用表：

| Pins | Group | 默认功能 | 复用功能                                                     |
| :--- | :---- | :------- | :----------------------------------------------------------- |
| 1    | IO10  | SPI_SCK  | I2C0_SDA/UART2_CTS_N/SDIO_D3/SPI0_CK/PWM1_OUT/I2S0_TX        |
| 2    | IO12  | SPI_NSS  | UART2_RXD/SDIO_CLK/SPI0_CSN/PWM3_OUT/RF_RX_EN_EXT/I2S0_BCLK  |
| 3    | NC    | -        | -                                                            |
| 4    | IO14  | GPIO     | SSI_CLK/UART0_RXD/UART2_CTS_N/SDIO_D1/PWM5_OUT/I2C0_SCL      |
| 5    | IO13  | ADC      | SSI_DATA/UART0_TXD/UART2_RTS_N/SDIO_D0/PWM4_OUT/I2C0_SDA/I2S0_WS |
| 6    | IO02  | DAC      | UART1_RTS_N/SPI1_TXD/JTAG_TRSTN/PWM2_OUT/SSI_CLK             |
| 7    | IO07  | GPIO     | UART1_CTS_N/SPI0_RXD/PWM0_OUT/I2S0_BCLK                      |
| 8    | IO08  | GPIO     | UART1_RTS_N/SPI0_TXD/PWM1_OUT/I2S0_WS/WLAN_ACTIVE            |
| 9    | IO01  | IIC_SCL  | UART1_RXD/SPI1_RXD/JTAG_TCK/PWM4_OUT/I2C1_SCL/               |
| 10   | IO00  | IIC_SDA  | UART1_TXD/SPI1_CK/JTAG_TDO/PWM3_OUT/I2C1_SDA                 |
| 11   | IO03  | GPIO     | UART0_TXD/UART1_CTS_N/SPI1_CSN/JTAG_TDI/PWM5_OUT/I2C1_SDA/SSI_DATA |
| 12   | IO05  | UART_RX  | UART1_RXD/SPI0_CSN/PWM2_OUT/I2S0_MCLK                        |
| 13   | IO06  | UART_TX  | UART1_TXD/SPI0_CK/PWM3_OUT/I2S0_TX                           |
| 14   | IO04  | GPIO     | UART0_RXD/JTAG_TMS/PWM1_OUT/I2C1_SCL                         |
| 15   | IO09  | SPI_MOSI | I2C0_SCL/UART2_RTS_N/SDIO_D2/SPI0_TXD/PWM0_OUT/I2S0_MCLK     |
| 16   | IO11  | SPI_MISO | UART2_TXD/SDIO_CMD/SPI0_RXD/PWM2_OUT/RF_TX_EN_EXT/I2S0_RX    |

## 2. UART简单收发

```C
#include <stdio.h>
#include "ohos_init.h"
#include "iot_gpio.h"
#include "iot_uart.h"
#include "iot_errno.h"
#include "hi_io.h"
#include "cmsis_os2.h"

/**
 * uart_demo/uart_demo.c
 * 串口接收信息，并将接收的信息发送回去
 */

#define UART_ID        1
#define UART_TX_PIN    6
#define UART_RX_PIN    5

static void Uart1Init(void)
{
    /* 复用UART1到GPIO5、GPIO6 */
    IoTGpioInit(UART_TX_PIN);
    IoTGpioInit(UART_RX_PIN);
    hi_io_set_func(UART_TX_PIN, HI_IO_FUNC_GPIO_6_UART1_TXD);
    hi_io_set_func(UART_RX_PIN, HI_IO_FUNC_GPIO_5_UART1_RXD);
    /* 配置UART1的属性 */
    IotUartAttribute uartAttr = {
        // 波特率
        .baudRate = 9600,
        // 数据位长度
        .dataBits = IOT_UART_DATA_BIT_8,
        // 停止位长度
        .stopBits = IOT_UART_STOP_BIT_1,
        // 奇偶校验
        .parity = IOT_UART_PARITY_NONE,
        // 发送且接收
        .rxBlock = IOT_UART_BLOCK_STATE_BLOCK,
        .txBlock = IOT_UART_BLOCK_STATE_BLOCK,
        .pad = 0,
    };
    if (IoTUartInit(UART_ID, &uartAttr) != IOT_SUCCESS) {
        printf("[ERROR] UART INIT ERR.\r\n");
    }
}

static void UartTask(void* arg)
{
    /* 初始化串口 */
    Uart1Init();

    uint8_t data[64] = {0};
    while (1) 
    {
        if (IoTUartRead(UART_ID, data, sizeof(data)) < 0) {
            printf("[ERROR] IoTUartRead ERR.\r\n");
        } else {
            printf("[INFO] IoTUartRead RTT.\r\n");
        }
        osDelay(200);
        if (IoTUartWrite(UART_ID, data, 1) < 0) {
            printf("[ERROR] IoTUartWrite ERR.\r\n");
        } else {
            printf("[INFO] IoTUartWrite RTT.\r\n");
        }
        osDelay(200);
    }
}

/* 入口函数 */
static void UartEntry(void)
{
     osThreadAttr_t attr = {
        .name = "UartTask",
        .stack_size = 1024,
        .priority = osPriorityNormal
    };
    if (osThreadNew(UartTask, NULL, &attr) == NULL) {
        printf("[ERROR] Thread Create Faild.\r\n");
    } else {
        printf("[INFO] Thread Create RT.\r\n");
    }
}

SYS_RUN(UartEntry);
```

**模块编译脚本**

```
static_library("uart_demo") {
    sources = [
        "uart_demo.c"
    ]
    include_dirs = [
        # include "ohos_init.h"
        "//utils/native/lite/include",
        # include CMSIS-RTOS API V2 for OpenHarmony1.0+
        "//kernel/liteos_m/kal/cmsis",
        # include IoT硬件设备操作接口 for OpenHarmony1.0+：
        "//base/iot_hardware/peripheral/interfaces/kits",
    ]
}
```

**APP编译脚本**

```
3import("//build/lite/config/component/lite_component.gni")

lite_component("app") {
    features = [
        "gn_practice/application:gn_app",
        "gn_practice/driver:gn_driver",
        "gn_practice/library:gn_library",
        "kv_store_demo:kv_store_demo",
        "file_demo:file_demo",
        "thread_demo:thread_demo",
        "timer_demo:timer_demo",
        "mutex_demo:mutex_demo",
        # GPIO模块
        "gpio_demo:gpio_demo",
        # ADC模块
        "adc_demo:adc_demo",
        # OLED模块
        "oled_demo:oled_demo",
        # UART模块
        "uart_demo:uart_demo"
    ]
}

```

## 3. 发送复杂信息

使用`sprintf`或`snprintf`函数将字符、数字封装成一段字符串。

```C
static void UartTask(void* arg)
{
    /* 初始化串口 */
    Uart1Init();
    int value = 1;
    unsigned char buffer[64] = {0};
    snprintf(buffer, sizeof(buffer),"[INFO] AT+LOCK=%d\r\n", value);
    while (1) 
    {
        if (IoTUartWrite(UART_ID, buffer, strlen(buffer)) < 0) {
            printf("[ERROR] IoTUartWrite ERR.\r\n");
        } else {
            printf("[INFO] IoTUartWrite RTT.\r\n");
        }
        osDelay(100);
    }
}
```

