---
title: Uso del Controlador PCA9685 para Servomotores
description: A reference page in my new Starlight docs site.
---

## Uso del Controlador PCA9685 para Servomotores

![Brazo Robótico](../../../assets/4119large.jpg)

El **PCA9685** fue diseñado para controlar LEDs por **PWM**, pero también se usa para **controlar servos**, ya que estos también funcionan con señales PWM. Su uso es muy común en robótica y automatización.

El **Módulo PCA9685** tiene pines en el orden correcto para conectar servos directamente, una bornera para alimentación de los servos y conectores para la parte lógica junto con los pines **I2C** para comunicarse con **Arduino**.

Además, podemos **establecer la dirección I2C** soldando los puentes **A0-A5**, lo que permite usar varios módulos PCA9685 en el mismo bus I2C.

![Brazo Robótico](../../../assets/controlador.jpg)
---

## 🔹 Características del PCA9685

✔️ **16 salidas PWM independientes** con **12 bits de resolución** (valores de **0 a 4095**).  
✔️ **Frecuencia máxima**: **1600 Hz**.  
✔️ **Interfaz de comunicación I2C**, compatible con Arduino y otros microcontroladores.  
✔️ **Control de servos con alimentación externa**.  


La salida PWM que envía el PCA9685 es de la siguiente forma:
![Brazo Robótico](../../../assets/Pulso%20PWM%20PCA9685.jpg)

Básicamente lo se tiene que establecer es la frecuencia de la señal PWM, frecuencia que será la misma para las 16 salidas PWM. Para establecer el ciclo de trabajo (Duty) tenemos que manipular el flanco de subida (Up) y flanco de bajada (Down), esto se configura individualmente para cada salida PWM, La resolución del PWM es de 12 bits (de 0 a 4095).

---

## 🔹 Conexión Entre Arduino y PCA9685

Para conectar el **PCA9685** con Arduino, utilizamos los siguientes pines:

| Módulo PCA9685 | Arduino Uno/Nano/Mini | Arduino Mega/DUE | Arduino Leonardo |
|---------------|------------------|---------------|----------------|
| **GND** | GND | GND | GND |
| **OE** | GND | GND | GND |
| **SCL** | A5 | 21 | 3 |
| **SDA** | A4 | 20 | 2 |
| **VCC** | 5V | 5V | 5V |
| **+V** | No conectado | No conectado | No conectado |

## 🔹 Alimentación del PCA9685 y los Servomotores

El **PCA9685** tiene dos pines de alimentación clave:

- **VCC**: Alimenta la **parte lógica del módulo** (debe conectarse a 5V de Arduino).  
- **V+**: Alimenta **los servomotores**, que deben usar una **fuente externa** del voltaje adecuado.  

📌 **Importante**:  
- **No conectar los servos a los 5V de Arduino**, ya que no proporciona suficiente corriente.  
- La mayoría de los servos trabajan entre **4.5V y 6V**.  
- Usaremos una **fuente externa de 5V / 5A** para alimentar los servos.  

### 🔹 Consideraciones sobre la Fuente de Alimentación

La corriente mínima de la fuente externa depende de:  
✔️ **El tipo de servomotores** utilizados.  
✔️ **La cantidad de servos conectados simultáneamente**.  

Dado que la corriente de un servomotor no es constante, es recomendable **sobredimensionar la fuente** para evitar caídas de voltaje o fallos de alimentación.  

### 🔹 Filtrado de Ruido en la Alimentación

Si la fuente no es estable o genera **ruido eléctrico**, se recomienda **soldar un condensador** en la placa del **PCA9685** para estabilizar la alimentación:

✔️ **1000uF** si se alimentan múltiples servos.  
✔️ **100uF por cada servomotor**, si se prefieren condensadores individuales.

---

## 🔹 Conexión Gráfica

![Brazo Robótico](../../../assets/4119large.jpg)

Las conexiones entre **Arduino, el PCA9685 y la fuente externa** son las siguientes:

| Módulo PCA9685 | Conexión |
|---------------|------------|
| **VCC** | **5V de Arduino** |
| **GND** | **GND de Arduino y GND de la Fuente** |
| **V+** | **+5V de la Fuente Externa** |
| **SDA** | **A4 (Arduino Uno) / 20 (Mega/DUE)** |
| **SCL** | **A5 (Arduino Uno) / 21 (Mega/DUE)** |

📌 **Notas:**
- **GND de la fuente externa** y **GND de Arduino** deben estar **conectados** para compartir referencia.
- Si la fuente **no es estable**, usar condensadores **electrolíticos de 1000uF** en la alimentación del módulo.

---

### 📌 Esquema de Conexión 📌



---

## 🔹 Instalación de la Librería PCA9685

Usaremos la **librería de Adafruit**, que se puede descargar desde GitHub:

🔗 [Descargar Librería PCA9685](https://github.com/adafruit/Adafruit-PWM-Servo-Driver-Library)

Para instalarla en **Arduino IDE**:
1. Ir a **Herramientas** → **Administrar bibliotecas**.
2. Buscar **Adafruit PWM Servo Driver**.
3. Hacer clic en **Instalar**.

---

## 🔹 Código de Configuración Inicial

Incluimos las librerías necesarias y creamos el objeto para el controlador:

```cpp
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver servos = Adafruit_PWMServoDriver(0x40);

void setup() {
  servos.begin();
  servos.setPWMFreq(60);  // Frecuencia de 60Hz para servos
}
