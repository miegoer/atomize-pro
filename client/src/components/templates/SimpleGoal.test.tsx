import SimpleGoal from "./SimpleGoal";
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { updateGoalProgress } from "../../ApiService";

jest.mock('../../ApiService', () => ({
  updateGoalProgress: jest.fn(), // Mock updateGoalProgress function
}));

describe('SimpleGoal', () => {

  beforeEach(() => {
    let assignMock = jest.fn();
    window.location = ({ assign: assignMock as any }) as Location;

    render(
      <MemoryRouter initialEntries={['/testTab']}>
            <SimpleGoal goal={{
              type: 'Simple List', 
              color: 'red', 
              complete: false, 
              tab: 'testTab', 
              list: 'testList', 
              name: 'testGoal', 
              id: 1, 
              order_no: 1, 
              last_completed: null, 
              active: true
            }}/>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    expect(screen.getByTestId('simple-goal')).toBeInTheDocument();
  });

  it('should update checkbox on click', () => {
    fireEvent.click(screen.getByTestId('simple-goal-checkbox'));
    expect(updateGoalProgress).toHaveBeenCalledWith('testGoal', 'Simple List', true);
  });

  it('should have the correct goal name', () => {
    expect(screen.getByText('testGoal')).toBeInTheDocument();
  });

  it('should be the correct color', () => {
    expect(screen.getByTestId('simple-goal-background')).toHaveStyle({
      backgroundColor: expect.stringMatching(/^#f13647$/),
    })
  });
});

describe('SimpleGoalPreChecked', () => {
  beforeEach(() => {
    let assignMock = jest.fn();
    window.location = ({ assign: assignMock as any }) as Location;

    render(
      <MemoryRouter initialEntries={['/testTab']}>
        <SimpleGoal goal={{
          type: 'Simple List', 
          color: 'red', 
          complete: true, 
          tab: 'testTab', 
          list: 'testList', 
          name: 'testGoal', 
          id: 1, 
          order_no: 1, 
          last_completed: null, 
          active: true
        }}/>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render checked when complete = true', () => {
    expect(screen.getByTestId('simple-goal-checkbox')).toHaveStyle({
      backgroundColor: expect.stringMatching(/^#B8FF8C$/),
    });
  });
});