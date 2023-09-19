import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TableOne from './TableOne';
import { mockData } from './mock.js';

import { fetchPeople, usePeople } from './useGetPeople.js';

jest.mock('./useGetPeople.js', () => ({
  fetchPeople: jest.fn(),
  usePeople: jest.fn() 
}));

describe('TableOne', () => {
  beforeEach(() => {
    usePeople.mockReturnValue({ data: mockData }); 
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders data correctly', async () => {
    const { getByText } = render(<TableOne handleClicked={jest.fn()} />);
    await waitFor(() => expect(getByText("John Doe")).toBeInTheDocument()); 
    expect(getByText("John Doe")).toBeInTheDocument();
  });
});
