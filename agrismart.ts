import {
  pgTable,
  text,
  serial,
  integer,
  real,
  boolean,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// ─── Crops ────────────────────────────────────────────────────
export const cropsTable = pgTable("crops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  variety: text("variety"),
  season: text("season").notNull(),
  sowingDate: date("sowing_date"),
  harvestDate: date("harvest_date"),
  area: real("area"),
  areaUnit: text("area_unit"),
  status: text("status").notNull().default("growing"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCropSchema = createInsertSchema(cropsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertCrop = z.infer<typeof insertCropSchema>;
export type Crop = typeof cropsTable.$inferSelect;

// ─── Disease Detections ───────────────────────────────────────
export const diseaseDetectionsTable = pgTable("disease_detections", {
  id: serial("id").primaryKey(),
  cropName: text("crop_name").notNull(),
  imageUrl: text("image_url"),
  imageBase64: text("image_base64"),
  diseaseName: text("disease_name"),
  confidence: real("confidence"),
  severity: text("severity"),
  symptoms: text("symptoms"),
  organicTreatment: text("organic_treatment"),
  chemicalTreatment: text("chemical_treatment"),
  fertilizerRecommendation: text("fertilizer_recommendation"),
  preventiveMeasures: text("preventive_measures"),
  recoveryTime: text("recovery_time"),
  aiResponse: text("ai_response"),
  aiResponseTelugu: text("ai_response_telugu"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDiseaseDetectionSchema = createInsertSchema(
  diseaseDetectionsTable,
).omit({ id: true, createdAt: true });
export type InsertDiseaseDetection = z.infer<
  typeof insertDiseaseDetectionSchema
>;
export type DiseaseDetection = typeof diseaseDetectionsTable.$inferSelect;

// ─── Market Prices ────────────────────────────────────────────
export const marketPricesTable = pgTable("market_prices", {
  id: serial("id").primaryKey(),
  cropName: text("crop_name").notNull(),
  mspPrice: real("msp_price"),
  marketPrice: real("market_price").notNull(),
  unit: text("unit").notNull(),
  market: text("market").notNull(),
  district: text("district"),
  state: text("state"),
  trend: text("trend"),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMarketPriceSchema = createInsertSchema(
  marketPricesTable,
).omit({ id: true, createdAt: true });
export type InsertMarketPrice = z.infer<typeof insertMarketPriceSchema>;
export type MarketPrice = typeof marketPricesTable.$inferSelect;

// ─── Irrigation Schedules ─────────────────────────────────────
export const irrigationSchedulesTable = pgTable("irrigation_schedules", {
  id: serial("id").primaryKey(),
  cropId: integer("crop_id"),
  cropName: text("crop_name").notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  waterAmount: real("water_amount"),
  method: text("method").notNull(),
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertIrrigationScheduleSchema = createInsertSchema(
  irrigationSchedulesTable,
).omit({ id: true, createdAt: true });
export type InsertIrrigationSchedule = z.infer<
  typeof insertIrrigationScheduleSchema
>;
export type IrrigationSchedule = typeof irrigationSchedulesTable.$inferSelect;

// ─── Farm Diary ───────────────────────────────────────────────
export const diaryEntriesTable = pgTable("diary_entries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  cropId: integer("crop_id"),
  cropName: text("crop_name"),
  weather: text("weather"),
  temperature: real("temperature"),
  imageUrl: text("image_url"),
  entryDate: date("entry_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDiaryEntrySchema = createInsertSchema(
  diaryEntriesTable,
).omit({ id: true, createdAt: true });
export type InsertDiaryEntry = z.infer<typeof insertDiaryEntrySchema>;
export type DiaryEntry = typeof diaryEntriesTable.$inferSelect;

// ─── Government Schemes ───────────────────────────────────────
export const governmentSchemesTable = pgTable("government_schemes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  benefit: text("benefit"),
  eligibility: text("eligibility"),
  applicationUrl: text("application_url"),
  deadline: date("deadline"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGovernmentSchemeSchema = createInsertSchema(
  governmentSchemesTable,
).omit({ id: true, createdAt: true });
export type InsertGovernmentScheme = z.infer<
  typeof insertGovernmentSchemeSchema
>;
export type GovernmentScheme = typeof governmentSchemesTable.$inferSelect;

// ─── Land Marketplace ─────────────────────────────────────────
export const landListingsTable = pgTable("land_listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  listingType: text("listing_type").notNull(),
  area: real("area").notNull(),
  areaUnit: text("area_unit").notNull(),
  price: real("price").notNull(),
  priceUnit: text("price_unit").notNull(),
  district: text("district").notNull(),
  village: text("village"),
  state: text("state").notNull(),
  soilType: text("soil_type"),
  waterSource: text("water_source"),
  ownerName: text("owner_name").notNull(),
  ownerPhone: text("owner_phone"),
  isVerified: boolean("is_verified").notNull().default(false),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLandListingSchema = createInsertSchema(
  landListingsTable,
).omit({ id: true, createdAt: true });
export type InsertLandListing = z.infer<typeof insertLandListingSchema>;
export type LandListing = typeof landListingsTable.$inferSelect;

// ─── Community Posts ──────────────────────────────────────────
export const communityPostsTable = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  likes: integer("likes").notNull().default(0),
  tags: text("tags"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCommunityPostSchema = createInsertSchema(
  communityPostsTable,
).omit({ id: true, createdAt: true });
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;
export type CommunityPost = typeof communityPostsTable.$inferSelect;

// ─── Expenses ─────────────────────────────────────────────────
export const expensesTable = pgTable("expenses", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  amount: real("amount").notNull(),
  date: date("date").notNull(),
  cropId: integer("crop_id"),
  cropName: text("crop_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertExpenseSchema = createInsertSchema(expensesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertExpense = z.infer<typeof insertExpenseSchema>;
export type Expense = typeof expensesTable.$inferSelect;

// ─── Soil Analyses ────────────────────────────────────────────
export const soilAnalysesTable = pgTable("soil_analyses", {
  id: serial("id").primaryKey(),
  ph: real("ph"),
  nitrogen: real("nitrogen"),
  phosphorus: real("phosphorus"),
  potassium: real("potassium"),
  organicCarbon: real("organic_carbon"),
  location: text("location"),
  cropId: integer("crop_id"),
  aiRecommendation: text("ai_recommendation"),
  fertilizerSchedule: text("fertilizer_schedule"),
  suitableCrops: text("suitable_crops"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSoilAnalysisSchema = createInsertSchema(
  soilAnalysesTable,
).omit({ id: true, createdAt: true });
export type InsertSoilAnalysis = z.infer<typeof insertSoilAnalysisSchema>;
export type SoilAnalysis = typeof soilAnalysesTable.$inferSelect;

// ─── Notifications ────────────────────────────────────────────
export const notificationsTable = pgTable("notifications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNotificationSchema = createInsertSchema(
  notificationsTable,
).omit({ id: true, createdAt: true });
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notificationsTable.$inferSelect;
