import React from 'react';
import '@testing-library/jest-dom';
import 'jest-environment-jsdom';

// Increase timeout for async operations
jest.setTimeout(10000);

// Mock localStorage with proper typing
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
} as Storage;

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock Carbon components with proper React typing
jest.mock('@carbon/react', () => {
  const actual = jest.requireActual('@carbon/react');
  return {
    ...actual,
    InlineLoading: () => React.createElement('div', { 'data-testid': 'loading' }, 'Loading...')
  };
});

// Add missing globals
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
