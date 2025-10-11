import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const id = uuid().primaryKey().defaultRandom();
const createdAt = timestamp({ withTimezone: true }).defaultNow();
const updatedAt = timestamp({ withTimezone: true }).$onUpdate(() => new Date());

export const orderStatuses = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
] as const;
export type OrderStatus = (typeof orderStatuses)[number];
const OrderStatusEnum = pgEnum("order-statuses", orderStatuses);

export const roles = ["USER", "ADMIN"] as const;
export type Role = (typeof roles)[number];
const RolesEnum = pgEnum("roles", roles);

export const UserTable = pgTable("users", {
  id,
  name: varchar({ length: 50 }).notNull(),
  email: text().notNull().unique(),
  imageUrl: text(),
  role: RolesEnum().default("USER"),
  createdAt,
  updatedAt,
});

export const UserRelations = relations(UserTable, ({ many }) => ({
  products: many(ProductTable),
  orders: many(OrderTable),
  addresses: many(AddressTable),
}));

export const ProductTable = pgTable("products", {
  id,
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  name: varchar({ length: 100 }).notNull(),
  priceInCents: integer().notNull(),
  description: text().notNull(),
  isAvailableForPurchase: boolean().notNull().default(true),
  imageUrl: text(),
  weightInGrams: integer().notNull(),
  dimensions: text().notNull(),
  sku: text().notNull().unique(),
  stockQuantity: integer().notNull().default(0),
  createdAt,
  updatedAt,
});

export const ProductRelations = relations(ProductTable, ({ many, one }) => ({
  user: one(UserTable, {
    fields: [ProductTable.userId],
    references: [UserTable.id],
  }),
  orders: many(OrderTable),
}));

export const OrderTable = pgTable("orders", {
  id,
  pricePaidInCents: integer().notNull(),
  createdAt,
  updatedAt,
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  productId: uuid()
    .notNull()
    .references(() => ProductTable.id, { onDelete: "restrict" }),
  shippingAddressId: uuid()
    .notNull()
    .references(() => AddressTable.id, { onDelete: "set null" }),
  status: OrderStatusEnum().default("PENDING"),
});

export const OrderRelations = relations(OrderTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [OrderTable.userId],
    references: [UserTable.id],
  }),
  product: one(ProductTable, {
    fields: [OrderTable.productId],
    references: [ProductTable.id],
  }),
  shippingAddress: one(AddressTable, {
    fields: [OrderTable.shippingAddressId],
    references: [AddressTable.id],
  }),
}));

export const AddressTable = pgTable("addresses", {
  id,
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  fullName: text().notNull(),
  city: text().notNull(),
  state: text(),
  country: text().notNull(),
  phoneNumber: text(),
  createdAt,
  updatedAt,
  // user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  // orders       Order[]
});

export const AddressRelations = relations(AddressTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [AddressTable.userId],
    references: [UserTable.id],
  }),
  orders: many(OrderTable),
}));
