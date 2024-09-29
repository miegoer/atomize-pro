import CreateNewTab from './CreateNewTab';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { createTab } from '../ApiService';
import exp from 'constants';

jest.mock('../ApiService', () => ({
  createTab: jest.fn(), // Mock createTab function
}));

describe('CreateNewTab', () => {

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/create-new/tab']}>
        <CreateNewTab tabs={[]} />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    expect(screen.getByTestId('create-new-tab')).toBeInTheDocument();
  });

  it('should create a tab with a name and icon when the submit button is clicked', () => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.click(screen.getByTestId('Sprout'));
    fireEvent.click(screen.getByRole('button'));

    expect(createTab).toHaveBeenCalledWith(expect.objectContaining({
      name: 'test',
      icon: 'test-file-stub',
    }))
  });

  test('that input tab is empty on render', () => {
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('that no icon is selected on render', () => {
    const icons = screen.getAllByRole("img");

    icons.forEach((icon) => {
      expect(icon).not.toHaveClass("icon-chosen");
    });
  });

  test('that error is displayed when no name is entered', () => {
    window.alert = jest.fn();
    fireEvent.click(screen.getByRole('button'));
    expect(window.alert).toHaveBeenCalledWith('Please choose a name for your tab');
  });

  test('that error is displayed when no icon is selected', () => {
    window.alert = jest.fn();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button'));
    expect(window.alert).toHaveBeenCalledWith('Please choose an icon');
  });

  test('that the icon background changes on hover', () => {
      fireEvent.mouseOver(screen.getAllByRole("img")[0]);
      expect(screen.getAllByRole("img")[0]).toHaveStyle({
      backgroundColor: expect.stringMatching(/^#4b25bd$/),
    });
  });

});