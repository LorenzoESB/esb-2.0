"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAliquotaIR = getAliquotaIR;
exports.converterParaDias = converterParaDias;
async function getAliquotaIR(dias) {
    const aliquotasIR = {
        ate180: 0.225,
        ate360: 0.2,
        ate720: 0.175,
        acima720: 0.15,
    };
    if (dias <= 180)
        return aliquotasIR.ate180;
    if (dias <= 360)
        return aliquotasIR.ate360;
    if (dias <= 720)
        return aliquotasIR.ate720;
    return aliquotasIR.acima720;
}
async function converterParaDias(tempo, unidade) {
    if (unidade === 'anos') {
        return tempo * 365;
    }
    return tempo * 30;
}
//# sourceMappingURL=converters.js.map