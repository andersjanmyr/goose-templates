'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('{{snakecase .NAME}}s', {
      id: { type: Sequelize.UUID, primaryKey: true },
      {{ range $key, $value := .DATA}}
      {{snakecase $key}}: {type: Sequelize.{{boacase $value}} },
      {{ end }}
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('{{snakecase .NAME}}s');
  }
};
