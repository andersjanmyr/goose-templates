'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('{{snakecase .NAME}}', {
      id: { type: Sequelize.UUID, primaryKey: true },
      {{ range $key, $value := .DATA}}
      {{dromedarcase $key}}: {type: Sequelize.{{boacase $value}} },
      {{ end }}
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('{{snakecase .NAME}}');
  }
};
