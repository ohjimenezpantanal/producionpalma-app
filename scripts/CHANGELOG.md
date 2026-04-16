## [2026-04-16] — Sesión de campo con técnico

### Correcciones
- Fix fecha UTC: se eliminó conversión `new Date()` en Apps Script — fecha ya no llega como 31/12/1969
- Fix cosecha opcional: paso 1 sin validación obligatoria — permite rondas sin cosecha
- Fix botones paso 5: eliminado botón redundante, quedan solo "Nueva ronda de campo" y "Ver dashboard"
- Fix flujo post-registro: "Nueva ronda de campo" arranca desde paso 0 limpio sin conflicto

### Nuevas funcionalidades
- Maleza Corona y Chapia con porcentaje independiente en el formulario
- Dashboard muestra badge Corona/Chapia con color de alerta (verde/amber/rojo)
- Badge maleza numérico eliminado del dashboard (evita redundancia)
- Resumen paso 4 muestra texto descriptivo de maleza ("Corona 25% · Chapia 75%")
- Columna "Tipo maleza" (AJ) agregada en Sheets y Apps Script

### Infraestructura
- Modo offline restaurado con cola IndexedDB
- Sincronización automática al reconectar WiFi
- Indicador de estado online/offline/syncing en topbar

# Changelog — Scripts Hacienda Pantanal

Historial de cambios de los Apps Script conectados al sistema de gestión agrícola.

Formato de versiones: `MAYOR.MENOR.PARCHE`  
- **MAYOR** — cambio estructural (nuevas hojas, rediseño de columnas)  
- **MENOR** — nueva funcionalidad (nueva columna, nueva validación, nuevo trigger)  
- **PARCHE** — corrección de bug o ajuste menor  

---

## gestion-agricola-appsscript.gs

### [1.0.0] — 2026-04-13
- Backup inicial del script en producción
- Recibe POST desde `gestion-agricola.html` (formulario 5 pasos)
- Escribe en hoja "Registros" — 35 columnas (A=Fecha … AI=Observaciones)
- Hoja conectada: "Seguimiento Campo — Pantanal 2026"
- Deploy activo: `AKfycbxfQLFt4hMUlhrdFkfz-cnghpcWjYNBqxCai4sWew-IBS0JPGXcw6lLTqm8kqrA5Iss`

---

## Próximas mejoras planificadas

- [ ] Alertas automáticas por email si puntaje polinizador < 70 pts
- [ ] Notificación si se detecta plaga crítica (>50% palmas afectadas)
- [ ] Health check diario que verifica que el endpoint responde
- [ ] Validación de campos obligatorios en el servidor (doble capa)

---

## Guía rápida de mensajes de commit

```
feat: agrega columna X en paso Y del formulario
fix: corrige cálculo de puntaje polinizador
chore: backup rutinario post-deploy vX.X.X
refactor: reorganiza estructura de columnas en hoja Registros
alert: agrega trigger de email para puntaje crítico
```

---

*Repositorio: ohjimenezpantanal/produccionpalma-app*
