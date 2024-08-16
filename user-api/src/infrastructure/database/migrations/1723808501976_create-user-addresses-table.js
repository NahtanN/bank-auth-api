/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("user_addresses", {
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users",
      referencesConstraintName: "fk_user_addresses_user_id_users",
    },
    address_id: {
      type: "uuid",
      notNull: true,
      references: "addresses",
      referencesConstraintName: "fk_user_addresses_address_id_addresses",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("user_addresses");
};
