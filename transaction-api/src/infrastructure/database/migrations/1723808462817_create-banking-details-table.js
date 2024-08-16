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
  pgm.createTable("banking_details", {
    banking_details_id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      primaryKey: true,
    },
    account: { type: "varchar", notNull: true },
    agency: { type: "varchar", notNull: true },
    balance: { type: "int", default: 0 },
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users",
      referencesConstraintName: "fk_banking_details_user_id_users",
    },
    created_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("(current_timestamp at time zone 'utc')"),
    },
    updated_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("(current_timestamp at time zone 'utc')"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("banking_details");
};
