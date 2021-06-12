import {
  Relationship,
  RelationshipType
} from '../../types/data-types/relationship'

export const getRelationshipType = (
  type: RelationshipType,
  relationships: Relationship[]
): Relationship[] =>
  relationships.filter((relationship) => relationship.type === type)
