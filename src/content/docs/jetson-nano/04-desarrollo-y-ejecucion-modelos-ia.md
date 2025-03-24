---
title: Desarrollo y Ejecución de Modelos de IA 
description: Guía para identificar y solucionar errores comunes en el funcionamiento del brazo robótico de 6 grados de libertad.
---


# Jetson Nano

## 1. Instalación Jetpack y Configuración Inicial

[Tutorial en YouTube - Click aquí](https://www.youtube.com/watch?v=6uqM6ltCLlE&list=PLsjK_a5MFguIUJJ1GPt1I2eN6cihKg2kG)

## 2. Detección de Objetos Hello World desde Docker

[Tutorial en YouTube - Click aquí](https://www.youtube.com/watch?v=6uqM6ltCLlE&list=PLsjK_a5MFguIUJJ1GPt1I2eN6cihKg2kG)

```bash
git clone --recursive https://github.com/dusty-nv/jetson-inference
cd jetson-inference
docker/run.sh
cd build/aarch64/bin
```

Para ejecutar los demos en la carpeta `bin`:

```bash
./video-viewer /dev/video0
./segnet /dev/video0
./detectnet /dev/video0
./depthnet /dev/video0
./posenet /dev/video0
```

## 3. Entrenamiento de SSD-Mobilenet

[Tutorial en YouTube - Click aquí](https://www.youtube.com/watch?v=HXFVexBPjMk&list=PLsjK_a5MFguIUJJ1GPt1I2eN6cihKg2kG&index=3)

### Configuración de Memoria Swap

```bash
sudo systemctl disable nvzramconfig
sudo fallocate -l 4G /mnt/4GB.swap
sudo mkswap /mnt/4GB.swap
sudo swapon /mnt/4GB.swap
```

Agregar la siguiente línea al final del archivo `/etc/fstab` para que los cambios sean permanentes:

```plaintext
/mnt/4GB.swap  none  swap  sw 0  0
```

### Descarga de Imágenes para Entrenamiento

```bash
python3 open_images_downloader.py --max-images=2500 --class-names "Apple,Orange,Banana,Strawberry,Grape,Pear,Pineapple,Watermelon" --data=data/fruit
```

### Entrenamiento de la Red

```bash
python3 train_ssd.py --data=data/fruit --model-dir=models/fruit --batch-size=4 --epochs=30
```

### Conversión del Modelo a ONNX para TensorRT

```bash
python3 onnx_export.py --model-dir=models/fruit
```

### Prueba del Modelo en Imágenes

```bash
detectnet --model=models/fruit/ssd-mobilenet.onnx --labels=models/fruit/labels.txt --input-blob=input_0 --output-cvg=scores --output-bbox=boxes "/jetson-inference/python/training/detection/ssd/data/fruit/test/*.jpg" /jetson-inference/data/images/test/fruit_%i.jpg
```

### Prueba en Tiempo Real con Webcam

```bash
detectnet --model=models/fruit/ssd-mobilenet.onnx --labels=models/fruit/labels.txt --input-blob=input_0 --output-cvg=scores --output-bbox=boxes /dev/video0
```

## 4. Entrenamiento para Detección de Mascarillas + Etiquetado de Dataset

[Tutorial en YouTube - Click aquí](https://www.youtube.com/watch?v=HC8bq3fFoTk&list=PLsjK_a5MFguIUJJ1GPt1I2eN6cihKg2kG&index=5)

### Etiquetado del Dataset

```bash
camera-capture /dev/video0
```

### Entrenamiento de la Red

```bash
python3 train_ssd.py --dataset-type=voc --data=data/Mask/ --model-dir=models/Mask --batch-size=2 --epochs=10
```

### Conversión del Modelo a ONNX para TensorRT

```bash
python3 onnx_export.py --model-dir=models/Mask/
```

### Prueba en Tiempo Real con Webcam

```bash
detectnet --model=models/Mask/ssd-mobilenet.onnx --labels=models/Mask/labels.txt --input-blob=input_0 --output-cvg=scores --output-bbox=boxes /dev/video0
```

## 5. Construcción de Código para Detección de Objetos en Jetson Nano

[Tutorial en YouTube - Click aquí](https://colab.research.google.com/drive/1PrzHKE0yKtyGWIlWIC5OAZv4ywMGDDTZ?usp=sharing)

### Montar el Docker con el Modelo Entrenado

```bash
sudo mkdir my_project
sudo chmod -R a+rwx my_project
cd jetson-inference
docker/run.sh --volume ~/my_project:/my_project
```

### Código en Python (`my_detection.py`)

```python
import jetson.inference
import jetson.utils

net = jetson.inference.detectNet("ssd-mobilenet-v2", [
    "--model=/my_project/ssd-mobilenet.onnx",
    "--labels=/my_project/labels.txt",
    "--input-blob=input_0",
    "--output-cvg=scores",
    "--output-bbox=boxes"
])

camera = jetson.utils.videoSource("/dev/video0")
display = jetson.utils.videoOutput("display://0")

while display.IsStreaming():
    img = camera.Capture()
    detections = net.Detect(img)
    display.Render(img)
    display.SetStatus("Object Detection | Network {:.0f} FPS".format(net.GetNetworkFPS()))
```

### Prueba del Código

```bash
python3 /my_project/my_detection.py
```

## 6. Entrenamiento de Modelo SSD en Google Colab

[Tutorial en YouTube - Parte 1](https://www.youtube.com/watch?v=KOcY-Ga0ZSo&list=PLsjK_a5MFguIUJJ1GPt1I2eN6cihKg2kG&index=9)

[Tutorial en YouTube - Parte 2](https://www.youtube.com/watch?v=2YVeCy393Kg&list=PLsjK_a5MFguIUJJ1GPt1I2eN6cihKg2kG&index=10)

[Entrenamiento en Colab](https://colab.research.google.com/drive/1PrzHKE0yKtyGWIlWIC5OAZv4ywMGDDTZ?usp=sharing)

```bash
docker/run.sh --volume ~/my_project:/my_project
python3 onnx_export.py --model-dir=models/Chess
detectnet --model=models/Chess/ssd-mobilenet.onnx --labels=models/Chess/labels.txt --input-blob=input_0 --output-cvg=scores --output-bbox=boxes /dev/video0
python3 /my_project/Chess.py
```

## 7. Inferencia de Modelo SSD en Video (.mp4) con Modificación de Threshold

### Captura de Video desde Archivo

```python
camera = cv2.VideoCapture("/my_project/video1.mp4")
```

### Modificación del Threshold usando `argparse`

```bash
python3 /my_project/Chess.py --threshold 0.7


```
