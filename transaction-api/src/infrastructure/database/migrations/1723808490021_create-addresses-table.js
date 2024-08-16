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
  pgm.createTable("addresses", {
    address_id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      primaryKey: true,
    },
    zipcode: {
      type: "varchar(10)",
      notNull: true,
    },
    state: {
      type: "varchar(2)",
      notNull: true,
    },
    city: {
      type: "varchar(200)",
      notNull: true,
    },
    neighborhood: {
      type: "varchar(255)",
      notNull: true,
    },
    street: {
      type: "varchar(255)",
      notNull: true,
    },
    number: {
      type: "varchar(50)",
    },
    complement: {
      type: "varchar(100)",
    },
    created_by: {
      type: "uuid",
      notNull: true,
      references: "users",
      referencesConstraintName: "fk_addresses_created_by_users",
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
    deleted_at: {
      type: "timestamp with time zone",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("addresses");
};
