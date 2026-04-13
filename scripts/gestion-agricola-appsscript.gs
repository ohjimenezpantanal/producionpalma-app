const SHEET_REG = "Registro de Producción";
const SHEET_DASH = "Dashboard";
const SHEET_REP = "Reportes";
const FILA_DATOS = 5;
 
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const reg = ss.getSheetByName(SHEET_REG);
  const dash = ss.getSheetByName(SHEET_DASH);
  const rep = ss.getSheetByName(SHEET_REP);
 
  const result = {
    ok: true,
    kpis: getKPIs(dash),
    fincas: getFincasData(dash, rep),
    lotes: getLotesData(rep),
    semanas: getSemanasData(reg)
  };
 
  const json = JSON.stringify(result);
  const callback = e && e.parameter && e.parameter.callback;
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
 
function getKPIs(dash) {
  if (!dash) return {};
  return {
    totalKg:         dash.getRange("B6").getValue(),
    totalRacimos:    dash.getRange("E6").getValue(),
    kgRacimo:        parseFloat(dash.getRange("B7").getValue()).toFixed(2),
    meta:            dash.getRange("H6").getValue(),
    mejorMes:        dash.getRange("B8").getValue(),
    kgMejorMes:      dash.getRange("E8").getValue(),
    fincaLider:      dash.getRange("H8").getValue(),
    mejorKgRacFinca: dash.getRange("E7").getValue()
  };
}
 
function getFincasData(dash, rep) {
  if (!dash) return [];
  const FINCAS = ["Los Corrales", "Chipo", "Castañeda", "Andino", "Marujita"];
  return FINCAS.map(function(finca, fi) {
    const dashRow = 11 + fi;
    const repRow  = 6 + fi;
    const totalCell = dash.getRange(dashRow, 14).getValue();
    const parts = String(totalCell).split(" / ");
    const totalKg = parseFloat(String(parts[0]).replace(/\./g,'').replace(',','.')) || 0;
    const kgRacimo = parts[1] && parts[1] !== '—' ? parts[1].replace(',','.') : null;
    const meses = [];
    for (var m = 2; m <= 13; m++) {
      meses.push(Number(rep ? rep.getRange(repRow, m).getValue() : 0) || 0);
    }
    return { finca, totalKg, kgRacimo, meses: meses.slice(0,12) };
  });
}
 
function getLotesData(rep) {
  if (!rep) return [];
  const lotes = [];
  const FINCAS_LOTES = [
    { finca: "Los Corrales", startRow: 24, count: 6 },
    { finca: "Chipo",        startRow: 32, count: 6 },
    { finca: "Castañeda",    startRow: 40, count: 6 },
    { finca: "Andino",       startRow: 48, count: 6 },
    { finca: "Marujita",     startRow: 56, count: 6 }
  ];
  FINCAS_LOTES.forEach(function(f) {
    for (var i = 0; i < f.count; i++) {
      const row = f.startRow + i;
      const lote = rep.getRange(row, 1).getValue();
      if (!lote || String(lote).startsWith('TOTAL')) break;
      const kg = Number(rep.getRange(row, 2).getValue()) || 0;
      const racimos = Number(rep.getRange(row, 3).getValue()) || 0;
      const kgRacimo = rep.getRange(row, 4).getValue();
      const estado = rep.getRange(row, 6).getValue();
      if (kg > 0 || racimos > 0) {
        lotes.push({
          finca: f.finca, lote: String(lote), kg, racimos,
          kgRacimo: kgRacimo && kgRacimo !== '—' ? parseFloat(String(kgRacimo).replace(',','.')) : null,
          estado: String(estado || '—')
        });
      }
    }
  });
  return lotes;
}
 
function getSemanasData(reg) {
  if (!reg) return [];
  const lastRow = reg.getLastRow();
  if (lastRow < FILA_DATOS) return [];
  const data = reg.getRange(FILA_DATOS, 1, lastRow - FILA_DATOS + 1, 12).getValues();
  const semMap = {};
  data.forEach(function(row) {
    const fecha = row[0]; const semana = row[1]; const finca = row[2];
    const racimos = Number(row[4]) || 0; const kg = Number(row[5]) || 0; const kgRacimo = row[6];
    if (!fecha || !(fecha instanceof Date) || !semana) return;
    const key = String(semana);
    if (!semMap[key]) semMap[key] = { semana: key, kg: 0, racimos: 0, kgRacimo: null, fincas: {} };
    semMap[key].kg += kg;
    semMap[key].racimos += racimos;
    if (kgRacimo && !isNaN(parseFloat(kgRacimo))) semMap[key].kgRacimo = parseFloat(kgRacimo).toFixed(2);
    if (finca) semMap[key].fincas[finca] = (semMap[key].fincas[finca] || 0) + kg;
  });
  return Object.values(semMap)
    .filter(function(s) { return s.kg > 0 || s.racimos > 0; })
    .sort(function(a, b) { return Number(a.semana) - Number(b.semana); });
}
 
