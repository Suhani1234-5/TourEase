import { describe, expect, it } from 'vitest';
import { validatePlannerForm } from './plannerValidation';

const baseForm = {
  destination: 'Goa',
  budget: 50000,
  days: 5,
  travelType: 'solo',
  travelers: 2,
  interests: ['Beach'],
};

const buildForm = (overrides = {}) => ({
  ...baseForm,
  ...overrides,
});

describe('validatePlannerForm', () => {
  it('accepts a valid form', () => {
    expect(validatePlannerForm(buildForm())).toEqual({
      valid: true,
      errors: {},
    });
  });

  it.each([
    [{ destination: '' }, 'destination', 'Destination is required'],
    [{ destination: ' ' }, 'destination', 'Destination is required'],
    [{ destination: 'A' }, 'destination', 'Enter a valid destination name'],
  ])('validates destination rules', (overrides, field, message) => {
    const result = validatePlannerForm(buildForm(overrides));

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual({ [field]: message });
  });

  it.each([
    [{ budget: undefined }, 'Budget is required'],
    [{ budget: '' }, 'Budget is required'],
    [{ budget: 'abc' }, 'Budget is required'],
    [{ budget: 999 }, 'Minimum budget is'],
    [{ budget: 50000001 }, 'Budget seems too high'],
  ])('validates budget rules', (overrides, messageFragment) => {
    const result = validatePlannerForm(buildForm(overrides));

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('budget');
    expect(result.errors.budget).toContain(messageFragment);
  });

  it.each([
    [{ budget: 1000 }, true],
    [{ budget: 50000000 }, true],
  ])('accepts budget boundaries', (overrides) => {
    const result = validatePlannerForm(buildForm(overrides));

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it.each([
    [{ days: undefined }],
    [{ days: '' }],
    [{ days: 'abc' }],
    [{ days: 0 }],
  ])('validates missing or invalid days', (overrides) => {
    const result = validatePlannerForm(buildForm(overrides));

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual({
      days: 'At least 1 day is required',
    });
  });

  it.each([
    [{ days: 1 }],
    [{ days: 30 }],
  ])('accepts day boundaries', (overrides) => {
    const result = validatePlannerForm(buildForm(overrides));

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('rejects trips longer than 30 days', () => {
    const result = validatePlannerForm(buildForm({ days: 31 }));

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual({
      days: 'Maximum trip length is 30 days',
    });
  });

  it('requires a travel type', () => {
    const result = validatePlannerForm(buildForm({ travelType: '' }));

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual({
      travelType: 'Select a travel type',
    });
  });

  it.each([
    [{ travelers: 1 }],
    [{ travelers: 20 }],
  ])('accepts traveler boundaries', (overrides) => {
    const result = validatePlannerForm(buildForm(overrides));

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('rejects more than 20 travelers', () => {
    const result = validatePlannerForm(buildForm({ travelers: 21 }));

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual({
      travelers: 'Maximum 20 travelers',
    });
  });

  it('requires at least one interest', () => {
    const result = validatePlannerForm(buildForm({ interests: [] }));

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual({
      interests: 'Select at least one interest',
    });
  });

  it('accepts valid interests', () => {
    const result = validatePlannerForm(buildForm({ interests: ['Food'] }));

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('reports multiple validation errors at once', () => {
    const result = validatePlannerForm(
      buildForm({
        destination: '',
        budget: '',
        days: '',
        travelType: '',
        travelers: '',
        interests: [],
      })
    );

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual({
      destination: 'Destination is required',
      budget: 'Budget is required',
      days: 'At least 1 day is required',
      travelType: 'Select a travel type',
      travelers: 'At least 1 traveler',
      interests: 'Select at least one interest',
    });
  });
});
