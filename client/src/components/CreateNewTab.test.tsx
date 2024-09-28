import CreateNewTab from './CreateNewTab';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('CreateNewTab', () => {
  it('should render', () => {
    render(
      <MemoryRouter initialEntries={['/create-new/tab']}>
        <CreateNewTab tabs={[]} />
      </MemoryRouter>
    );

    // Check for expected text or elements in the rendered output
    expect(screen.getByTestId('create-new-tab')).toBeInTheDocument();
  });
});