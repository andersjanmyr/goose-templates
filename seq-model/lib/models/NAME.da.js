'use strict';
module.exports = function(sequelize, DataTypes) {
  const {{camelcase .NAME}} = sequelize.define('{{snakecase .NAME}}s', {
    id: { type: DataTypes.UUID, primaryKey: true },
    {{ range $key, $value := .DATA}}
    {{dromedarcase $key}}: { field: '{{snakecase $key}}', type: DataTypes.{{boacase $value}} },
    {{ end }}
    createdAt: { field: 'created_at', type: DataTypes.DATE },
    updatedAt: { field: 'updated_at', type: DataTypes.DATE }
  });
  return {{camelcase .NAME}};
};
