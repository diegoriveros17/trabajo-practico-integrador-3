export const applyOptional = (rules, esActualizacion) => {
  if (esActualizacion) {
    rules.forEach((rule) => rule.optional());
  }
  return rules;
};
