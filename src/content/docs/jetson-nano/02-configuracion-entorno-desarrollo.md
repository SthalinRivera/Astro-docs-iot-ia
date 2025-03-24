---
title: Configuracion de entorno y desarrollo
description: Guía para identificar y solucionar errores comunes en el funcionamiento del brazo robótico de 6 grados de libertad.
---

#### 🖥️ Escribir la Imagen del Sistema Operativo en la Tarjeta microSD  

Lo primero que debemos hacer es preparar el sistema operativo. El **Jetson Nano** utiliza una tarjeta **microSD** como almacenamiento principal.  

---

### 🔹 Paso 1: Preparar la Tarjeta microSD  

1️⃣ **Toma tu lector de tarjetas SD/Micro SD** con conector USB estándar.  
2️⃣ **Introduce la tarjeta microSD de 64 min a 128 GB** en el adaptador.  
3️⃣ **Inserta el adaptador en el lector de tarjetas SD**.  

 ![Inserción de la tarjeta microSD](../../../assets/cad.jpeg)  

4️⃣ **Conecta el lector de tarjetas SD a tu PC**.  
5️⃣ **Verifica que el lector aparezca en la lista de discos** en tu PC y anota su letra de unidad (Ejemplo: `F:`).  

 ![Verificación en la lista de discos](../../../assets/card-pc.jpeg)  

---

### 🔹 Paso 2: Descargar la Imagen del Sistema  

🔹 Descarga el archivo de imagen de la tarjeta SD del **Jetson Nano Developer Kit** [Descarga el archivo de imagen de la tarjeta SD del Jetson Nano Developer Kit](https://developer.nvidia.com/jetson-nano-sd-card-image)
 (conocido como **JetPack**).  
🔹 Guarda el archivo en una ubicación accesible, como tu escritorio.  

💡 **Nota:** Es un archivo grande, la descarga puede tardar.  

<!-- 📷 ![Descargando el archivo de imagen](ruta-a-imagen-3.jpg)   -->

---

### 🔹 Paso 3: Formatear la Tarjeta microSD  

🔹 **Para Windows:**  

1️⃣ Descarga, instala y ejecuta el **Formateador de tarjetas SD**.   [Formateador de tarjetas de memoria SD para Windows ](https://www.sdcard.org/downloads/formatter_4/eula_windows/) 
2️⃣ Selecciona la unidad de la tarjeta microSD.  
3️⃣ Activa la opción **"Formato rápido"**.  
4️⃣ Deja **"Etiqueta de volumen"** en blanco.  
5️⃣ Haz clic en **"Formato"** y confirma con **"Sí"**.  
6️⃣ Espera hasta que aparezca la notificación de **formateo exitoso**.  

Aquí están las capturas de pantalla que tomé del proceso:
![Formato exitoso](../../../assets/SD-card-formatter-setup.jpg)  
![Formato exitoso](../../../assets/formatter01.jpg)  
![Formato exitoso](../../../assets/formatter02.jpg)  
![Formato exitoso](../../../assets/formatter03.jpg)  
![Formato exitoso](../../../assets/formatter04.jpg)  
![Formato exitoso](../../../assets/formatter05.jpg)  
![Formato exitoso](../../../assets/formatter06.jpg)  
![Formato exitoso](../../../assets/formatter07.jpg)  

---

Cuando reciba la notificación de que el formateo se realizó correctamente, cierre todas las ventanas abiertas.

---

### 🔹 Paso 4: Escribir la Imagen en la Tarjeta microSD  

🔹 Descarga, instala y ejecuta **Etcher**.   [Descargando e instalando Etcher ](https://www.balena.io/etcher) 

 ![Descargando e instalando Etcher](../../../assets/etcher-descargar.jpg)  
![Seleccionando la imagen del sistema](../../../assets//etcher-balena.jpg)  
1️⃣ **Haz clic en "Flash desde archivo"** y selecciona la imagen del Jetson Nano descargada.  

![Seleccionando la imagen del sistema](../../../assets/etcher-balena-select.jpg.png)  

2️⃣ **Selecciona el destino**, elige la unidad de la tarjeta SD (Ejemplo: `F:`).  

![Seleccionando el destino](../../../assets/etcher-jetson-nano.jpg)  

3️⃣ **Haz clic en "¡Flash!"** y espera a que termine el proceso.  

![Proceso de flasheo con Etcher](../../../assets/etcher-destino-sd.jpg)  

4️⃣ Una vez finalizado, **ignora cualquier advertencia de Windows** y **extrae la tarjeta microSD**.  

 ![Mensajes emergentes en Windows](../../../assets/close-windows.jpg)  

---

# ⚡ Configuración y Primer Arranque  

### 🔹 Paso 1: Preparar el Jetson Nano  

1️⃣ **Despliega el soporte de papel** y coloca el **Jetson Nano** dentro de la caja del kit de desarrollo.  

![Colocando el Jetson Nano](../../../assets/caja.jpeg)  

2️⃣ **Inserta la tarjeta microSD** con la imagen del sistema ya escrita.  

 ![Inserción de la tarjeta microSD en el Jetson Nano](../../../assets/sd-jetson-imagen.jpeg)  

3️⃣ **Verifica que el puente esté en los pines del cabezal J48**.  

![Diagrama de pines del Jetson Nano](../../../assets/puente-fuente-alimentacion.jpg)  

---

### 🔹 Paso 2: Conectar Periféricos  

1️⃣ **Conecta el Jetson Nano a un monitor** usando un cable HDMI.  

![Conectando el HDMI](../../../assets/hdmi.jpeg)  

2️⃣ **Conecta el teclado y el mouse** a los puertos USB del Jetson Nano.  

![Conectando teclado y mouse](../../../assets/teclado.jpeg)  

---

### 🔹 Paso 3: Encender el Jetson Nano  

1️⃣ **Obtén una fuente de alimentación** compatible (5V/4A, OD 5,5 mm, ID 2,1 mm).  
2️⃣ **Conéctala al puerto de alimentación del Jetson Nano**.  

![Conectando la fuente de alimentación](../../../assets/fuente-alientacion.jpeg)  

3️⃣ El **Jetson Nano se encenderá automáticamente**.  
4️⃣ **Espera 1 minuto** hasta que el sistema arranque.  

<!-- 📷 ![Arranque del sistema](ruta-a-imagen-17.jpg)   -->

---

💡 **¡Felicidades!** 🎉 Tu Jetson Nano está listo para la configuración inicial. 🚀  

En el siguiente paso, configuraremos **WiFi y las actualizaciones del sistema**.  
