import Sets from "./Sets";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { updateGoalProgress } from "../../ApiService";

jest.mock('../../ApiService', () => ({
  updateGoalProgress: jest.fn(), // Mock updateGoalProgress function
}));

/* 

- render x
- have the correct goal name x
- update on clicking checkbox x
- show the correct amount of complete sets x
- not go over the given amount of sets

*/

describe('Sets', () => {

  beforeEach(() => {
    let assignMock = jest.fn();

    render(
      <MemoryRouter initialEntries={['/testTab']}>
            <Sets goal={{
              type: 'Sets', 
              color: 'purple', 
              complete: false,
              completed_sets: 1, 
              tab: 'testTab', 
              list: 'testList', 
              name: 'testGoal', 
              id: 1, 
              order_no: 1, 
              last_completed: null, 
              active: true,
              sets: 3,
              reps: 2
            }}/>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    expect(screen.getByTestId('set-container')).toBeInTheDocument();
  });

  it('should have the correct goal name', () => {
    expect(screen.getByText('testGoal')).toBeInTheDocument();
  });

  it('should update on clicking set button', async () => {
    fireEvent.click(screen.getByTestId('set-button-0'));
    expect(updateGoalProgress).toHaveBeenCalledWith('testGoal', 'Sets', 1);
  }); 

  it('should show the correct amount of complete sets', () => {
    expect(screen.getByTestId('set-button-0')).toHaveClass('complete-set');
  });

})

describe('SetsBadPath', () => {
  beforeEach(() => {
    let assignMock = jest.fn();

    render(
      <MemoryRouter initialEntries={['/testTab']}>
            <Sets goal={{
              type: 'Sets', 
              color: 'purple', 
              complete: false,
              completed_sets: 4, 
              tab: 'testTab', 
              list: 'testList', 
              name: 'testGoal', 
              id: 1, 
              order_no: 1, 
              last_completed: null, 
              active: true,
              sets: 3,
              reps: 2
            }}/>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should not go over the given amount of sets', () => {
    expect(screen.getByTestId('set-button-2')).toHaveClass('complete-set');
  });
})