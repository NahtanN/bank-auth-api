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
  pgm.createTable("transactions", {
    transaction_id: { type: "uuid", default: pgm.func("gen_random_uuid()") },
    user_sender_id: {
      type: "uuid",
      notNull: true,
      references: "users(user_id)",
    },
    user_receiver_id: {
      type: "uuid",
      notNull: true,
      references: "users(user_id)",
    },
    amount: { type: "int", notNull: true },
    description: { type: "varchar" },
    sender_balance_before: { type: "int" },
    sender_balance_after: { type: "int" },
    receiver_balance_before: { type: "int" },
    receiver_balance_after: { type: "int" },
    created_at: {
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
exports.down = (pgm) => { };
