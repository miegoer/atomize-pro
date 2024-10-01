import ProgressBar from './ProgressBar';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { updateGoalProgress } from "../../ApiService";

jest.mock('../../ApiService', () => ({
  updateGoalProgress: jest.fn(), // Mock updateGoalProgress function
}));

/* 

- should render x
- have the correct goal name x
- update the correct percentage on input x
- should only update to the max percentage

*/

describe('ProgressBar', () => {
  beforeEach(() => {
    let assignMock = jest.fn();

    render(
      <MemoryRouter initialEntries={['/testTab']}>
            <ProgressBar goal={{
              type: 'Progress Bar', 
              color: 'orange-gradient', 
              complete: false,
              tab: 'testTab', 
              list: 'testList', 
              name: 'testGoal', 
              id: 1, 
              order_no: 1, 
              last_completed: null, 
              active: true,
              current: 0,
              goal_number: 3,
              units: 2
            }}/>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('should have the correct goal name', () => {
    expect(screen.getByText('testGoal')).toBeInTheDocument();
  });

  it('should update the correct percentage on input', () => {
    fireEvent.change(screen.getByTestId('progress-value'), { target: { value: 1 } });
    fireEvent.click(screen.getByTestId('progress-button'));
    expect(screen.getByTestId('progress-output')).toHaveTextContent('1 / 3 2 — 33.33%');
  });

  it('should only update to the max percentage', () => {
    fireEvent.change(screen.getByTestId('progress-value'), { target: { value: 4 } });
    fireEvent.click(screen.getByTestId('progress-button'));
    expect(screen.getByTestId('progress-output')).toHaveTextContent('3 / 3 2 — 100.00%');
  });
});