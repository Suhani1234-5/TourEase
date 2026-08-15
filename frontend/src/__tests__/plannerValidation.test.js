import { expect, test } from 'vitest';
import { validatePlannerForm } from '../utils/plannerValidation';

test('valid form submission', () => {
  const form = {
    destination: 'Paris',
    budget: '50000',
    days: '7',
    travelType: 'luxury',
    travelers: '2',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(true);
  expect(result.errors).toEqual({});
});

test('missing destination', () => {
  const form = {
    destination: '',
    budget: '50000',
    days: '7',
    travelType: 'luxury',
    travelers: '2',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.destination).toBe('Destination is required');
});

test('invalid destination (too short)', () => {
  const form = {
    destination: 'P',
    budget: '50000',
    days: '7',
    travelType: 'luxury',
    travelers: '2',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.destination).toBe('Enter a valid destination name');
});

test('missing budget', () => {
  const form = {
    destination: 'Paris',
    budget: '',
    days: '7',
    travelType: 'luxury',
    travelers: '2',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.budget).toBe('Budget is required');
});

test('invalid budget (NaN)', () => {
  const form = {
    destination: 'Paris',
    budget: 'abc',
    days: '7',
    travelType: 'luxury',
    travelers: '2',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.budget).toBe('Budget is required');
});

test('budget too low', () => {
  const form = {
    destination: 'Paris',
    budget: '500',
    days: '7',
    travelType: 'luxury',
    travelers: '2',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.budget).toBe('Minimum budget is ₹1,000');
});

test('budget too high', () => {
  const form = {
    destination: 'Paris',
    budget: '60000000',
    days: '7',
    travelType: 'luxury',
    travelers: '2',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.budget).toBe('Budget seems too high — please check');
});

test('missing days', () => {
  const form = {
    destination: 'Paris',
    budget: '50000',
    days: '',
    travelType: 'luxury',
    travelers: '2',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.days).toBe('At least 1 day is required');
});

test('invalid days (less than 1)', () => {
  const form = {
    destination: 'Paris',
    budget: '50000',
    days: '0',
    travelType: 'luxury',
    travelers: '2',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.days).toBe('At least 1 day is required');
});

test('days too high', () => {
  const form = {
    destination: 'Paris',
    budget: '50000',
    days: '35',
    travelType: 'luxury',
    travelers: '2',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.days).toBe('Maximum trip length is 30 days');
});

test('missing travel type', () => {
  const form = {
    destination: 'Paris',
    budget: '50000',
    days: '7',
    travelType: '',
    travelers: '2',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.travelType).toBe('Select a travel type');
});

test('missing travelers', () => {
  const form = {
    destination: 'Paris',
    budget: '50000',
    days: '7',
    travelType: 'luxury',
    travelers: '',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.travelers).toBe('At least 1 traveler');
});

test('invalid travelers (less than 1)', () => {
  const form = {
    destination: 'Paris',
    budget: '50000',
    days: '7',
    travelType: 'luxury',
    travelers: '0',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.travelers).toBe('At least 1 traveler');
});

test('too many travelers', () => {
  const form = {
    destination: 'Paris',
    budget: '50000',
    days: '7',
    travelType: 'luxury',
    travelers: '25',
    interests: ['art', 'food'],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.travelers).toBe('Maximum 20 travelers');
});

test('missing interests', () => {
  const form = {
    destination: 'Paris',
    budget: '50000',
    days: '7',
    travelType: 'luxury',
    travelers: '2',
    interests: [],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(result.errors.interests).toBe('Select at least one interest');
});

test('multiple validation errors', () => {
  const form = {
    destination: '',
    budget: 'abc',
    days: '0',
    travelType: '',
    travelers: '0',
    interests: [],
  };

  const result = validatePlannerForm(form);
  expect(result.valid).toBe(false);
  expect(Object.keys(result.errors)).toHaveLength(6);
  expect(result.errors.destination).toBe('Destination is required');
  expect(result.errors.budget).toBe('Budget is required');
  expect(result.errors.days).toBe('At least 1 day is required');
  expect(result.errors.travelType).toBe('Select a travel type');
  expect(result.errors.travelers).toBe('At least 1 traveler');
  expect(result.errors.interests).toBe('Select at least one interest');
});