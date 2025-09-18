export async function getAliquotaIR(dias: number): Promise<number> {
    const aliquotasIR = {
        ate180: 0.225,    // 22,5%
        ate360: 0.2,      // 20%
        ate720: 0.175,    // 17,5%
        acima720: 0.15,   // 15%
    };

    if (dias <= 180) return aliquotasIR.ate180;
    if (dias <= 360) return aliquotasIR.ate360;
    if (dias <= 720) return aliquotasIR.ate720;
    return aliquotasIR.acima720;
}

export async function converterParaDias(tempo: number, unidade: "meses" | "anos"): Promise<number> {
    if (unidade === "anos") {
        return tempo * 365;
    }
    return tempo * 30;
}