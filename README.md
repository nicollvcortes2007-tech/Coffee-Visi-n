# Coffee-Visi-n
Coffee+visión es un proyecto tecnológico nacido en el SENA, diseñado por aprendices apasionados por transformar el campo colombiano. Nuestra meta es cerrar la brecha digital en la agricultura, ofreciendo herramientas de visión artificial y análisis de datos que antes eran inalcanzables para el pequeño productor.

# 🚀 Guía de Desarrollo y Reglas del Repositorio

¡Hola equipo! Para que trabajemos de forma organizada, protejamos nuestro código y evitemos dolores de cabeza con Git, hemos activado **reglas de protección** en la rama principal (`main`). 

Como **cada uno de nosotros ya tiene su propia rama asignada**, el flujo de trabajo será muy sencillo pero estricto. Por favor, sigan estas reglas en su día a día.

---

## 🔒 Las Reglas del Repositorio

1. 🛑 **¡Prohibido hacer `push` directo a `main`!**
   La rama `main` está bloqueada. Si intentas hacer un `git push origin main`, GitHub rechazará tus cambios automáticamente.
2. 🚫 **Prohibido el uso de Force Push (`--force`)**
   Los comandos que fuerzan el subido de código están completamente inhabilitados para evitar que se borre accidentalmente el historial de commits o el trabajo de los demás.

---

## 🛠️ Ciclo de Trabajo Diario (Paso a Paso)

Cada vez que vayas a trabajar en tus tareas, debes seguir este orden en tu terminal:

### Paso 1: Sincroniza tu rama local 🔄
Antes de escribir código, muévete a tu rama personal y trae lo último que se haya aprobado en `main` para trabajar con el proyecto al día:
```bash
git checkout TU-RAMA-PERSONAL
git pull origin main

