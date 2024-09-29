import CreateNewTab from './CreateNewTab';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { createTab } from '../ApiService';

jest.mock('../ApiService', () => ({
  createTab: jest.fn(), // Mock createTab function
}));

describe('CreateNewTab', () => {

  /*
  
  - input should be empty
  - no icon should be selected
  - error should be displayed when no name is entered
  - error should be displayed when no icon is selected
  - tab should fire createTab API service
  - icon should change on hover

  */

  it('should render', () => {
    render(
      <MemoryRouter initialEntries={['/create-new/tab']}>
        <CreateNewTab tabs={[]} />
      </MemoryRouter>
    );

    
    expect(screen.getByTestId('create-new-tab')).toBeInTheDocument();
  });

  it('should create a tab with a name and icon', () => {
    render(
      <MemoryRouter initialEntries={['/create-new/tab']}>
        <CreateNewTab tabs={[]} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.click(screen.getByTestId('Sprout'));
    fireEvent.click(screen.getByRole('button'));

    expect(createTab).toHaveBeenCalledWith(expect.objectContaining({
      name: 'test',
      icon: 'test-file-stub',
    }))

  })

});