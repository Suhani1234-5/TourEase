export function formatItinerary(itinerary) {
  const { destinations, activities } = itinerary;

  return (
    `✨ Here’s a trip idea for you:\n\n` +
    `📍 Destinations:\n` +
    destinations.map(d => `• ${d}`).join("\n") +
    `\n\n🎯 Suggested activities:\n` +
    activities.map(a => `• ${a}`).join("\n") +
    `\n\nWould you like to restart or change your preferences?`
  );
}
