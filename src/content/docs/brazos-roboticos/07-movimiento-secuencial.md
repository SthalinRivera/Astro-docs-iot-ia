---
title: Ejemplo de movimiento secuencial
description: A reference page in my new Starlight docs site.
---

# 📌 Sweep (Barrido) de 16 Servos

Este ejemplo realiza un **barrido de 0° a 180° y de regreso a 0°** en **todos los servos simultáneamente**.

---

## 📌 Cálculo del Ancho de Pulso

Antes de empezar, es importante conocer el **ancho de pulso (duty)** para la posición **0°** y **180°**:

| Ángulo | Ancho de Pulso (ms) | Valor en Cuentas |
|--------|---------------------|------------------|
| 0°     | 0.7 ms             | 172              |
| 180°   | 2.3 ms             | 565              |

Si necesitas calcular otros valores de los extremos del servo, usa la siguiente fórmula:

```cpp
nCuentas = Pulso_ms * (frecuencia_Hz / 1000) * 4096
```

⚠️ Nota: A menudo se ajustan los valores mínimos (0°) y máximos (180°) para obtener el rango correcto.

## 📌  Código en Arduino

```cpp
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver servos = Adafruit_PWMServoDriver(0x40);

unsigned int pos0 = 172;  // Ancho de pulso en cuentas para posición 0°
unsigned int pos180 = 565; // Ancho de pulso en cuentas para posición 180°

void setup() {
  servos.begin();  
  servos.setPWMFreq(60); // Frecuencia PWM de 60Hz (T = 16.66ms)
}

void loop() {
  
  // Barrido de 0° a 180°
  for (int duty = pos0; duty < pos180; duty += 10) {
    for (int n = 0; n < 16; n++) {
      servos.setPWM(n, 0, duty);
    }   
  }
  delay(1000);
  
  // Barrido de 180° a 0°
  for (int duty = pos180; duty > pos0; duty -= 10) {
    for (int n = 0; n < 16; n++) {
      servos.setPWM(n, 0, duty);
    }   
  }
  delay(1000);
}

```