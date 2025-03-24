---
title: Moviendo los servomotores en posiciones diferentes
description: Moviendo los servomotores en posiciones diferentes
---



En muchas aplicaciones, los servomotores estarán en diferentes posiciones. Para este caso, es mejor crear una **función** que calcule y envíe el valor en cuentas al servo. De esta manera, podemos manipular el servo desde `loop()` usando valores entre **0° y 180°**.

---

## 📌 Función para Controlar el Servo

La siguiente función permite enviar un **ángulo** a cualquier servomotor:

```cpp
void setServo(uint8_t n_servo, int angulo) {
  int duty;
  duty = map(angulo, 0, 180, pos0, pos180);
  servos.setPWM(n_servo, 0, duty);  
}

```
Con esta función, podemos indicar el ángulo al que queremos que se posicione cada servo.


## 📌 Código en Arduino
El siguiente sketch mueve los servomotores cada segundo a posiciones establecidas:


```cpp
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver servos = Adafruit_PWMServoDriver(0x40);

unsigned int pos0 = 172;  // Ancho de pulso para posición 0°
unsigned int pos180 = 565; // Ancho de pulso para posición 180°

void setup() {
  servos.begin();  
  servos.setPWMFreq(60); // Frecuencia PWM de 60Hz (T = 16.66ms)
}

void setServo(uint8_t n_servo, int angulo) {
  int duty;
  duty = map(angulo, 0, 180, pos0, pos180);
  servos.setPWM(n_servo, 0, duty);  
}

void loop() {
    setServo(0, 30);
    setServo(2, 90);
    setServo(4, 180);
    setServo(6, 120);
    setServo(8, 0);
    setServo(10, 30);
    setServo(12, 90);
    setServo(14, 170);
    delay(1000);

    setServo(1, 30);
    setServo(3, 90);
    setServo(5, 180);
    setServo(7, 120);
    setServo(9, 30);
    setServo(11, 90);
    setServo(13, 180);
    setServo(15, 120);
    delay(1000);

    setServo(0, 120);
    setServo(2, 180);
    setServo(4, 90);
    setServo(6, 60);
    setServo(8, 45);
    setServo(10, 160);
    setServo(12, 170);
    setServo(14, 30);
    delay(1000);

    setServo(1, 120);
    setServo(3, 0);
    setServo(5, 90);
    setServo(7, 60);
    setServo(9, 120);
    setServo(11, 180);
    setServo(13, 0);
    setServo(15, 30);
    delay(1000);
}

```

## 📌 Ajuste de Ancho de Pulso para Servomotores Diferentes

En algunos casos, los valores mínimos y máximos del ancho de pulso pueden variar según el modelo del servo, incluso si son del mismo fabricante.
Por ejemplo:

Ángulo	Servo A (ms)	Servo B (ms)
0°	0.7 ms	1.0 ms
180°	2.3 ms	2.5 ms

Para corregir esto, debemos declarar valores independientes para cada uno de los 16 servos:

```cpp
unsigned int pos0[16]  = {172, 172, 172, 246, 246, 172, 246, 200, 200, 150, 160, 172, 172, 172, 200, 246}; 
unsigned int pos180[16] = {565, 256, 256, 492, 492, 565, 492, 550, 550, 600, 590, 565, 565, 565, 550, 492}; 
```
## 📌 Modificación de la Función setServo()
Ahora, para convertir de ángulo a duty cycle, usaremos los valores individuales de cada servo:

```cpp
void setServo(uint8_t n_servo, int angulo) {
  int duty;
  duty = map(angulo, 0, 180, pos0[n_servo], pos180[n_servo]);
  servos.setPWM(n_servo, 0, duty);  
}
```

Si deseas trabajar con valores de 0 a 255 (en lugar de 0 a 180), puedes modificar la función para adaptarla a este nuevo rango.

