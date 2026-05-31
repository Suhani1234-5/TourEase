/**
 * Client-side validation for Smart Trip Planner form.
 * Returns { valid: boolean, errors: Record<string, string> }
 */
export function validatePlannerForm(form) {
  const errors = {};

  if (!form.destination?.trim()) {
    errors.destination = 'Destination is required';
  } else if (form.destination.trim().length < 2) {
    errors.destination = 'Enter a valid destination name';
  }

  const budget = Number(form.budget);
  if (!form.budget || Number.isNaN(budget)) {
    errors.budget = 'Budget is required';
  } else if (budget < 1000) {
    errors.budget = 'Minimum budget is ₹1,000';
  } else if (budget > 50000000) {
    errors.budget = 'Budget seems too high — please check';
  }

  const days = Number(form.days);
  if (!days || days < 1) {
    errors.days = 'At least 1 day is required';
  } else if (days > 30) {
    errors.days = 'Maximum trip length is 30 days';
  }

  if (!form.travelType) {
    errors.travelType = 'Select a travel type';
  }

  const travelers = Number(form.travelers);
  if (!travelers || travelers < 1) {
    errors.travelers = 'At least 1 traveler';
  } else if (travelers > 20) {
    errors.travelers = 'Maximum 20 travelers';
  }

  if (!form.interests?.length) {
    errors.interests = 'Select at least one interest';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
