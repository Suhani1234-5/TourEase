export function getItinerary(preferences) {
  const { destinationType, budget, duration } = preferences;

  const rules = {
    beach: {
      low: {
        short: {
          destinations: ["Gokarna"],
          activities: ["Beach walks", "Local food"]
        },
        medium: {
          destinations: ["Goa"],
          activities: ["Beaches", "Street food", "Sunset views"]
        },
        long: {
          destinations: ["Andaman Islands"],
          activities: ["Snorkeling", "Island hopping"]
        }
      },
      medium: {
        short: {
          destinations: ["Goa"],
          activities: ["Baga Beach", "Cafe hopping", "Sunset cruise"]
        },
        medium: {
          destinations: ["Pondicherry"],
          activities: ["French town tour", "Beach cafes"]
        },
        long: {
          destinations: ["Andaman Islands"],
          activities: ["Scuba diving", "Island hopping"]
        }
      },
      high: {
        short: {
          destinations: ["Alibaug"],
          activities: ["Luxury resorts", "Private beaches"]
        },
        medium: {
          destinations: ["Maldives"],
          activities: ["Overwater villas", "Snorkeling"]
        },
        long: {
          destinations: ["Bali"],
          activities: ["Surfing", "Temple visits"]
        }
      }
    },

    mountains: {
      low: {
        short: {
          destinations: ["Manali"],
          activities: ["Local sightseeing", "Nature walks"]
        },
        medium: {
          destinations: ["Kasol"],
          activities: ["Hiking", "Cafes"]
        },
        long: {
          destinations: ["Leh"],
          activities: ["Road trips", "Monastery visits"]
        }
      },
      medium: {
        short: {
          destinations: ["Coorg"],
          activities: ["Coffee plantations", "Waterfalls"]
        },
        medium: {
          destinations: ["Munnar"],
          activities: ["Tea gardens", "Scenic views"]
        },
        long: {
          destinations: ["Spiti Valley"],
          activities: ["Camping", "Star gazing"]
        }
      }
    },

    city: {
      medium: {
        short: {
          destinations: ["Jaipur"],
          activities: ["City tour", "Street food"]
        },
        medium: {
          destinations: ["Bangalore"],
          activities: ["Cafes", "Local markets"]
        },
        long: {
          destinations: ["Delhi"],
          activities: ["Museums", "Food walks"]
        }
      }
    },

    nature: {
      low: {
        short: {
          destinations: ["Coorg"],
          activities: ["Nature walks", "Waterfalls"]
        }
      }
    }
  };

  return (
    rules?.[destinationType]?.[budget]?.[duration] || {
      destinations: ["Staycation"],
      activities: ["Relax", "Explore nearby places"]
    }
  );
}
