Hacienda Pantanal — Sistema de Gestión Agrícola
Sistema digital de gestión y seguimiento de campo para operación de palma aceitera híbrida.
Ubicación: Quinindé, Esmeraldas, Ecuador
Operación: 5 fincas — Los Corrales, Andino, Chipo, Castañeda, Marujita
Responsable: Ing. Oscar Jiménez
Asesor técnico: Ing. Oliver Cedeño

Aplicaciones
ArchivoDescripciónURLgestion-agricola.htmlDashboard + formulario de rondas de campoVer appproduccion-dashboard.htmlDashboard de producción y cosechaVer appindex.htmlPágina de inicio / navegación entre appsVer app

Scripts (Apps Script — Google Sheets)
ArchivoHoja conectadaDescripciónscripts/gestion-agricola-appsscript.gsSeguimiento Campo — Pantanal 2026Recibe registros de rondas de campo (35 columnas, hoja "Registros")
URL del deploy activo (NO modificar):
https://script.google.com/macros/s/AKfycbxfQLFt4hMUlhrdFkfz-cnghpcWjYNBqxCai4sWew-IBS0JPGXcw6lLTqm8kqrA5Iss/exec

⚠️ Esta URL está hardcodeada en gestion-agricola.html. Si se crea un nuevo deploy, la URL cambia y el formulario deja de funcionar. Siempre usar "Nueva versión" sobre el deploy existente.


Protocolo de deploy seguro

Hacer cambios en Apps Script
Implementar → Administrar implementaciones → editar → Nueva versión
Probar enviando un registro de prueba desde el formulario
Confirmar que aparece en la hoja "Registros"
Copiar el código actualizado y hacer commit en este repo con mensaje descriptivo

NUNCA:

Eliminar ni re-subir el archivo de Google Sheets
Crear un nuevo deploy desde cero
Hacer cambios en producción sin respaldar primero aquí


Estructura del repositorio
produccionpalma-app/
├── index.html                          ← Navegación principal
├── gestion-agricola.html               ← App de gestión de campo
├── produccion-dashboard.html           ← App de producción
├── scripts/
│   ├── gestion-agricola-appsscript.gs  ← Backup Apps Script campo
│   └── CHANGELOG.md                    ← Historial de cambios
└── README.md                           ← Este archivo

Sistema de calificación de polinizadores (100 pts)
CriterioPuntosInflorescencias correctas (% × 35)35 ptsCalidad de formación de racimos10 ptsDosis ANA (Óptima=10, Deficiente/Exceso=5)10 ptsApertura correcta de inflorescencia5 ptsRendimiento ha/día10 ptsEvaluación técnica (técnica + cobertura + marcado + equipos JACO)30 pts
Umbral de alerta: puntaje < 70 pts → notificación automática

Última actualización del README: abril 2026
### Estado actual — Abril 2026

**Formulario (5 pasos)**
- Paso 1 (cosecha) opcional — permite rondas sin cosecha
- Paso 3 (sanidad): maleza Corona y Chapia con % independientes
- Validaciones activas en pasos 0 y 3

**Dashboard**
- KPIs: peso promedio, % polinización correcta, nota promedio
- Sección Gestión agronómica muestra Corona/Chapia · Poda por finca
- Tendencia semanal con sparklines (últimas 6 semanas)
- Filtro por mes y por semana

**Modo offline**
- Cola IndexedDB — guarda registros sin señal
- Sincronización automática al conectar WiFi
- Indicador visual en topbar

**Apps Script**
- Fecha guardada como texto YYYY-MM-DD (sin conversión UTC)
- Columna AJ: Tipo maleza (Corona X% · Chapia Y%)
- Alertas por email: nota baja, plaga crítica, deficiencia, maleza urgente, poda
- Resumen semanal automático cada lunes 7am
- Health check diario 8am

**Protocolo de deploy (CRÍTICO)**
- Nunca eliminar ni re-subir el archivo de Google Sheets
- Apps Script: siempre "Nueva versión" — nunca nuevo deploy
- URL hardcodeada en HTML: `AKfycbxfQLFt4hMUlhrdFkfz-...` — no modificar
- Backup del Apps Script en: `scripts/gestion-agricola-appsscript.gs`
