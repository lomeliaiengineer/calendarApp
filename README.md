# Integración con la API de google calendar

## Variables a cambiar

[CALENDAR_ID]: Id del calendario de google calendar.

[CREDENDTIALS_JSON]: Json de la cuenta de servicio de google.

[CHANNEL_NAME]: Nombre del canal para las notificaciones.

[DOMAIN]: El dominio donde estará tu app
## Endpoints

* /google****

Este endpoint es utilizado para verficar que el dominio con el que trabajaremos es nuestro.

* /sendNotifications

Este endpoint llama a la api de google calendar para activar las notificaciones del calendario que hayamos seteado. Este endpoint puede modificarse para ser más dinámico.

* /notifications

Este es el endpoint que será llamado desde la api de google calendar cada vez que el calendario que hayamos seleccionado haya cambiado. Además, listará todos los eventos que hayan cambiado.

## Stack Tecnológico

* Node.js
* Google Calendar API

