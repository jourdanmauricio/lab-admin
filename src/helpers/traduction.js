export function traduction(text) {
  switch (text) {
    case "actionDeleteProd":
      return "Eliminar productos";
    case "changeStatusProd":
      return "Modificar estado";
    case "changePriceProd":
      return "Modificar precio";
    case "active":
      return "Activo";
    case "paused":
      return "Pausado";
    case "closed":
      return "Finalizado";
    case "under_review":
      return "Revisión";
    case "WARRANTY_TYPE":
      return "Tipo de garantía";
    case "WARRANTY_TIME":
      return "Tiempo";
    case "PURCHASE_MAX_QUANTITY":
      return "Cantidad máxima por compra";
    case "MANUFACTURING_TIME":
      return "Tiempo de elaboración";
  }
}
