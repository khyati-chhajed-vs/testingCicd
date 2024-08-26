export const getProjectAndUnitDetails = (bindParams: any[]) => {
  const query = `
    select * from tbl_units tu join tbl_project tp on tu.project_id = tp.project_id where tu.unit_id = ? and tu.project_id = ?
    `;
  return { query, bindParams };
};
