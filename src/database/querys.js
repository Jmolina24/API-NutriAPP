export const queriesLogin = {
    getAllPlanActive:"call p_g_planes(?)",
    createNewUser: "call p_registro_usuario(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    sign: 'call p_login(?,?)',
    recoverkey: 'call p_recupera_clave(?)',
    changePassword: 'call p_r_cambia_clave(?,?)'
};

export const queriesProfile = {
    listProfileUser: "call p_l_perfil_usuario(?)",
    listSeguimientoHistorialUser: "call p_l_seguimientos_hist(?)",
    listHistorialPagosUser: "call p_l_historia_pagos(?)",
    listHistorialIMCUser: "call p_g_historial_imc_pg(?)",
    createSeguimientoUser: "call p_r_seguimiento (?,?,?,?,?,?,?,?)",
    listSeguimientosPendientes: "call p_l_seguimientos_pendientes",
    respondeSeguimiento: "call p_responde_seguimiento(?,?,?)"
};

export const queriesPayment = {
    p_registra_pago: "call p_registra_pago(?,?,?,?,?,?,?,?)",
    p_notifica_pago: "call p_notifica_pago(?)"
}