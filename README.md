# Palabras Encadenadas - Trabajo Final Integrador

Este proyecto es un juego de **Palabras Encadenadas** desarrollado con **React** para el Trabajo Final Integrador (TFI) de la materia Interfaces de Usuario (1°C 2026).

## 🎮 Descripción del Juego

El objetivo es formar la cadena más larga posible de palabras válidas antes de que se agote el tiempo de 15 segundos por turno. Cada nueva palabra ingresada debe cumplir las siguientes reglas:

* Debe existir en el diccionario español (validado mediante una API provista por la cátedra).
* No puede haber sido utilizada anteriormente durante la partida.
* Debe comenzar con la última letra de la palabra válida anterior.

Por cada letra de una palabra válida, el jugador obtiene 1 punto. 

## ⚙️ Requisitos Previos

Para ejecutar este proyecto, necesitas tener instalado en tu computadora:
* **Node.js** (versión 16 o superior).
* **npm** (el gestor de paquetes que viene incluido con Node.js).

## 🚀 Instalación y Ejecución Local

Seguí los pasos para descargar, instalar y ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   Abrí tu terminal y ejecutá el siguiente comando para descargar el proyecto:
   ```bash
   git clone https://github.com/ManuMenager/unq-ui-emanuel-menager-trabajo-final.git

2. **Navegar al directorio del proyecto:**
   Ingresá a la carpeta que se acaba de crear:
   ```bash
   cd unq-ui-tu-nombre-trabajo-final

3. **Instalar las dependencias:**
   Descargá todas las librerías necesarias para que la aplicación funcione ejecutando:
   ```bash
   npm install
   

4. **Ejecutar la aplicación:**
   Iniciá el servidor de desarrollo local con el siguiente comando:
   ```bash
   npm run dev

5. **Jugar:**
   La terminal te mostrará una dirección web (http://localhost:5173). Hacé clic en el enlace o cópialo y pégalo en tu navegador para comenzar a jugar.