---
title: Alimentación y Cableado del Brazo Robótico
description: Guía rápida sobre la conexión eléctrica y alimentación del brazo robótico de 6DOF.
---



## ⚡ Requisitos de Alimentación

El brazo robótico requiere una fuente de energía estable para operar correctamente. Se recomienda:

- **Voltaje**: 5V - 6V DC (según los servomotores utilizados).
- **Corriente**: Al menos 2A - 5A (dependiendo del número y tipo de servos).
- **Fuente recomendada**: Adaptador de corriente o batería LiPo de 7.4V con regulador a 5V.

## 📌 Conexión de Servomotores

Cada servomotor tiene tres cables:

1. **Rojo**: Alimentación (+5V o +6V).
2. **Negro o marrón**: Tierra (GND).
3. **Amarillo o blanco**: Señal PWM (conectado al controlador PCA9685 o directamente a Arduino).

**Ejemplo de conexión con PCA9685:**
- **V+** → Conectar a fuente de 5V - 6V.
- **GND** → Conectar a GND de la fuente y del Arduino.
- **SCL y SDA** → Conectar a los pines correspondientes de Arduino (A4 y A5 en Arduino Uno).

## 🔋 Alimentación del PCA9685

El módulo PCA9685 puede ser alimentado de dos formas:

1. **Por el pin VCC (5V) desde Arduino** → Solo recomendado para pruebas.
2. **Por el terminal de alimentación externa (V+ y GND)** → Para uso estable con servos de alto consumo.

> **⚠️ Importante:** Nunca conectar directamente servomotores al Arduino, ya que no puede suministrar la corriente suficiente.

## 🔄 Distribución de Cables

- Mantén los cables organizados con bridas o espirales de sujeción.
- Separa los cables de alimentación y señal para evitar interferencias.
- Si usas una batería LiPo, usa un regulador de voltaje para proteger los componentes.

---

🚀 **Tu brazo robótico está listo para moverse!** Asegúrate de verificar todas las conexiones antes de encenderlo.
