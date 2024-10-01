import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Tab from '../components/Tab';

interface TabType {
  name: string;
  col_one?: string;
  col_one_b?: string;
  col_two?: string;
  col_two_b?: string;
  col_three?: string;
  col_three_b?: string;
}

interface GoalType {
  tab: string;
  list: string;
}

const mockTab: TabType = {
  name: 'Gym',
  col_one: 'list 1',
};

const mockGoals: GoalType[] = [
  { tab: 'Gym', list: 'List 1' },
  { tab: 'Gym', list: 'List 2' },
];

describe('Testing Tab Component', () => {
  test('check if tab title exists', () => {
    render(
      <Router>
        <Tab tab={mockTab} goals={mockGoals} />
      </Router>
    );

    expect(screen.getByText(/Gym/)).toBeInTheDocument();
  });

  test('check if Goal with list exists', () => {
    const { container } = render(
      <Router>
        <Tab tab={mockTab} goals={mockGoals} />
      </Router>
    );
    const title = container.querySelector('.tab-header');
    expect(title).toBeInTheDocument();

    const lists = container.querySelector('.all-lists-container');
    expect(lists).toBeInTheDocument();
  });

  test('check if Goal exists , but not the lists', () => {
    const  emptyTab : TabType = { name: 'EmptyTab'};
    const { container } = render(
      <Router>
        <Tab tab={emptyTab} goals={[]} />
      </Router>
    );
    const title = container.querySelector('.tab-header');
    expect(title).toBeInTheDocument();

    const lists = container.querySelector('.all-lists-container');
    expect(lists).not.toBeInTheDocument();
  });


  test('check if lists exist', () => {
    const { container } = render(
      <Router>
        <Tab tab={mockTab} goals={mockGoals} />
      </Router>
    );

    const tabHeader = container.querySelector('.all-lists-container');
    expect(tabHeader).toBeInTheDocument();
  });

  
});
