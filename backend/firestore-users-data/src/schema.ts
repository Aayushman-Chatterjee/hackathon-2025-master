import * as Joi from 'joi';

const assetSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().required(),
  value: Joi.number().min(0).required(),
});

const liabilitySchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().required(),
  amount: Joi.number().min(0).required(),
  emi: Joi.number().min(0).max(Joi.ref('amount')).required(),
});

const goalSchema = Joi.object({
  id: Joi.string().required(),
  date: Joi.date().iso().required(),
  type: Joi.string().required(),
  amount: Joi.number().min(0).required(),
});

const investmentSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().required(),
  return: Joi.number().required(), // Ensures return is a percentage format (e.g., "6%")
  amount: Joi.number().min(0).required(),
});

const insuranceSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().required(),
  amount: Joi.number().min(0).required(),
});

const transactionSchema = Joi.object({
  id: Joi.string().required(),
  category: Joi.string().required(),
  amount: Joi.number().min(0).required(),
  transaction_date: Joi.date().iso().required(),
  transaction_type: Joi.string().valid('Debit', 'Credit').required(),
});

const profileScoreSchema = Joi.object({
  score: Joi.number().min(0).max(100).required(),
  last_updated: Joi.string().required(),
});

const basicInfoSchema = Joi.object({
  name: Joi.string().min(1).required(),
  age: Joi.number().min(0).required(),
  currency: Joi.string().required(),
  type: Joi.string().required(),
});

export const schema = Joi.object().keys({
  assets: Joi.array().items(assetSchema).optional(),
  liabilities: Joi.array().items(liabilitySchema).optional(),
  goals: Joi.array().items(goalSchema).optional(),
  investments: Joi.array().items(investmentSchema).optional(),
  insurances: Joi.array().items(insuranceSchema).optional(),
  transactions: Joi.array().items(transactionSchema).optional(),
  profile_score: profileScoreSchema.optional(),
  basic_info: basicInfoSchema.optional(),
  use_llm: Joi.boolean().optional(),
});

export const jobSchema = Joi.object().keys({
  progress: Joi.string().optional(),
  result_path: Joi.string().optional(),
  status: Joi.string().optional(),
});
