export const serializeData = (data) => {
  return data.map((item) => {
    return {
      ...item,
      costPerSession: item.costPerSession ? item.costPerSession.toNumber() : null,
      birthdate: item.birthdate ? item.birthdate.toISOString() : null,
    };
  });
};
