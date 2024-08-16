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
  pgm.createTable("users", {
    user_id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      primaryKey: true,
    },
    name: {
      type: "varchar(255)",
      notNull: true,
    },
    email: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },
    cpf: {
      type: "varchar",
      notNull: true,
      unique: true,
    },
    accepted_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("(current_timestamp at time zone 'utc')"),
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
  pgm.dropTable("users");
};
