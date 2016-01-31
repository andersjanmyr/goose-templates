'use strict';
const sequelize = require('sequelize');

const {{camelcase .NAME}} = sequelize.define('{{snakecase .NAME}}s', {
  id: { type: Sequelize.UUID, primaryKey: true },
  {{ range $key, $value := .DATA}}
  {{dromedarcase $key}}: { field: '{{snakecase $key}}' type: Sequelize.{{boacase $value}} },
  {{ end }}
  createdAt: { field: 'created_at', type: Sequelize.DATE },
  updatedAt: { field: 'updated_at', type: Sequelize.DATE }
});

module.exports = {{camelcase .NAME}};
