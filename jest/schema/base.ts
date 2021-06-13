import Joi from 'joi'
import { TranslatedField } from '../../types/data-types/language'
import { ApiBase } from '../../types/api'
import { relationshipSchema } from './relationship'
import { ResponseError } from '../../types/response'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const apiBase = <Name, T>(
  name: Name,
  attributes: T
): Joi.ObjectSchema<ApiBase<Name, T>> =>
  Joi.object<ApiBase<Name, T>>({
    id: Joi.string().required(),
    type: Joi.string().valid(name).required(),
    attributes: attributes
  })

export const responseErrorSchema = Joi.object<ResponseError>({
  id: Joi.string().required(),
  status: Joi.number().required(),
  title: Joi.string().required(),
  detail: Joi.string().required(),
  context: Joi.object().allow(null).optional()
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const apiResponse = (t: Record<string, unknown>) =>
  Joi.object({
    result: Joi.string().valid('ok', 'error'),
    relationships: Joi.array().items(relationshipSchema),
    errors: Joi.array().items(responseErrorSchema),
    ...t
  })

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const apiResponseList = (t: Record<string, unknown>) =>
  Joi.object({
    results: Joi.array().items(apiResponse(t)).required(),
    limit: Joi.number().required(),
    offset: Joi.number().required(),
    total: Joi.number().required()
  })

export const translatedFieldSchema = Joi.object<TranslatedField>({
  en: Joi.string().required()
}).unknown()
