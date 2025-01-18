// Helper functions for building search queries
export function buildSearchTerms(query: string) {
  const term = query.trim().toLowerCase();
  return {
    searchTerm: `%${term}%`,
    conditions: [
      `name.ilike.%${term}%`,
      `description.ilike.%${term}%`,
      `offers.title.ilike.%${term}%`,
      `offers.description.ilike.%${term}%`
    ]
  };
}