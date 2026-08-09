import { describe, expect, it } from "vitest";
import { validatePlannerForm } from "./plannerValidation";

describe("validatePlannerForm", () => {
  it("accepts a valid planner form", () => {
    const form = {
      destination: "Paris",
      budget: 50000,
      days: 5,
      travelType: "Solo",
      travelers: 2,
      interests: ["Food", "Culture"],
    };

    expect(validatePlannerForm(form)).toEqual({
      valid: true,
      errors: {},
    });
  });

  it("rejects a missing destination", () => {
    const form = {
      destination: "",
      budget: 50000,
      days: 5,
      travelType: "Solo",
      travelers: 2,
      interests: ["Food"],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.destination).toBe("Destination is required");
  });

  it("rejects a destination shorter than two characters", () => {
    const form = {
      destination: "A",
      budget: 50000,
      days: 5,
      travelType: "Solo",
      travelers: 2,
      interests: ["Food"],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.destination).toBe("Enter a valid destination name");
  });

  it("accepts the minimum valid budget, days, and travelers", () => {
    const form = {
      destination: "Goa",
      budget: 1000,
      days: 1,
      travelType: "Solo",
      travelers: 1,
      interests: ["Beach"],
    };

    expect(validatePlannerForm(form)).toEqual({
      valid: true,
      errors: {},
    });
  });

  it("accepts the maximum valid budget, days, and travelers", () => {
    const form = {
      destination: "Goa",
      budget: 50000000,
      days: 30,
      travelType: "Family",
      travelers: 20,
      interests: ["Beach"],
    };

    expect(validatePlannerForm(form)).toEqual({
      valid: true,
      errors: {},
    });
  });

  it("rejects a budget below the minimum", () => {
    const form = {
      destination: "Goa",
      budget: 999,
      days: 5,
      travelType: "Solo",
      travelers: 2,
      interests: ["Beach"],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.budget).toBe("Minimum budget is ₹1,000");
  });

  it("rejects a budget above the maximum", () => {
    const form = {
      destination: "Goa",
      budget: 50000001,
      days: 5,
      travelType: "Solo",
      travelers: 2,
      interests: ["Beach"],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.budget).toBe("Budget seems too high — please check");
  });

  it("rejects a trip longer than 30 days", () => {
    const form = {
      destination: "Goa",
      budget: 50000,
      days: 31,
      travelType: "Solo",
      travelers: 2,
      interests: ["Beach"],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.days).toBe("Maximum trip length is 30 days");
  });

  it("rejects more than 20 travelers", () => {
    const form = {
      destination: "Goa",
      budget: 50000,
      days: 5,
      travelType: "Group",
      travelers: 21,
      interests: ["Beach"],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.travelers).toBe("Maximum 20 travelers");
  });

  it("rejects an empty travel type", () => {
    const form = {
      destination: "Goa",
      budget: 50000,
      days: 5,
      travelType: "",
      travelers: 2,
      interests: ["Beach"],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.travelType).toBe("Select a travel type");
  });

  it("rejects empty interests", () => {
    const form = {
      destination: "Goa",
      budget: 50000,
      days: 5,
      travelType: "Solo",
      travelers: 2,
      interests: [],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.interests).toBe("Select at least one interest");
  });

  it("rejects a missing budget", () => {
    const form = {
      destination: "Goa",
      budget: "",
      days: 5,
      travelType: "Solo",
      travelers: 2,
      interests: ["Beach"],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.budget).toBe("Budget is required");
  });

  it("rejects a non-numeric budget", () => {
    const form = {
      destination: "Goa",
      budget: "not-a-number",
      days: 5,
      travelType: "Solo",
      travelers: 2,
      interests: ["Beach"],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.budget).toBe("Budget is required");
  });

  it("rejects missing trip duration", () => {
    const form = {
      destination: "Goa",
      budget: 50000,
      days: "",
      travelType: "Solo",
      travelers: 2,
      interests: ["Beach"],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.days).toBe("At least 1 day is required");
  });

  it("rejects invalid traveler count", () => {
    const form = {
      destination: "Goa",
      budget: 50000,
      days: 5,
      travelType: "Solo",
      travelers: 0,
      interests: ["Beach"],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors.travelers).toBe("At least 1 traveler");
  });

  it("returns multiple validation errors for invalid input", () => {
    const form = {
      destination: "",
      budget: 500,
      days: 31,
      travelType: "",
      travelers: 21,
      interests: [],
    };

    const result = validatePlannerForm(form);

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual({
      destination: "Destination is required",
      budget: "Minimum budget is ₹1,000",
      days: "Maximum trip length is 30 days",
      travelType: "Select a travel type",
      travelers: "Maximum 20 travelers",
      interests: "Select at least one interest",
    });
  });
});
