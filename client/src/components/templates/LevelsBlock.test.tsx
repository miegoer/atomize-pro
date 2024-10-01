import LevelsBlock from "./LevelsBlock";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { updateGoalProgress } from '../../ApiService';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../ApiService', () => ({
  updateGoalProgress: jest.fn(), // Mock updateGoalProgress function
}));

 describe('LevelsBlock', () => {
  beforeEach(() => {
    let assignMock = jest.fn();
    window.location = ({ assign: assignMock as any }) as Location;

    render(
      <MemoryRouter initialEntries={['/testTab']}>
            <LevelsBlock goal={{
              type: 'Levels', 
              color: 'purple', 
              complete: false, 
              tab: 'testTab', 
              list: 'testList', 
              name: 'testGoal', 
              id: 1, 
              order_no: 1, 
              last_completed: null, 
              active: true, 
              level: 0,
            }}/>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });


  it('should render', () => {
    expect(screen.getByTestId('levelsBlock')).toBeInTheDocument();
  });

  it('should update the level when the button is clicked', () => {
    fireEvent.click(screen.getByTestId('levelsButton'));
    expect(updateGoalProgress).toHaveBeenCalledWith('testGoal', 'Levels', 1);
  });

  it('update the screen when the button is clicked', () => {
    fireEvent.click(screen.getByTestId('levelsButton'));
    expect(screen.getByTestId('level1')).toHaveClass('isStarted');
    fireEvent.click(screen.getByTestId('levelsButton'));
    expect(screen.getByTestId('level2')).toHaveClass('isPartway');
    fireEvent.click(screen.getByTestId('levelsButton'));
    expect(screen.getByTestId('level3')).toHaveClass('isDone');
  });

  it('should show the correct goal name', () => {
    expect(screen.getByTestId('levelsButton')).toHaveTextContent('testGoal');
  });

 });