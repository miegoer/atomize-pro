import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Tab from '../components/Tab'; // Adjust the import path as needed

describe("Tab Component", () => {
  const tabData = {
    name: 'Tab 1',
    col_one: 'Content 1',
    col_two: 'Content 2',
    col_three: 'Content 3'
  };

  const goalsData = [
    { tab: 'Tab 1', list: 'List 1' },
    { tab: 'Tab 1', list: 'List 2' },
    { tab: 'Tab 2', list: 'List 3' },
  ];

  it('should render the tab header correctly', () => {
    render(
      <Router>
        <Tab tab={tabData} goals={[]} />
      </Router>
    );

    const headerElement = screen.getByText(/⸻ Tab 1 ⸻/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('should display blank page prompt if no columns are provided', () => {
    const blankTabData = { name: 'Empty Tab' };

    render(
      <Router>
        <Tab tab={blankTabData} goals={[]} />
      </Router>
    );

    const blankPrompt = screen.getByText(/This page is empty!/i);
    expect(blankPrompt).toBeInTheDocument();
  });

  it('should display a link to create a new list on blank page', () => {
    const blankTabData = { name: 'Empty Tab' };

    render(
      <Router>
        <Tab tab={blankTabData} goals={[]} />
      </Router>
    );

    const linkElement = screen.getByRole('link', { name: /OK →/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/create-new/list');
  });

  it('should display lists on the tab 1', () => {
    render(
      <Router>
        <Tab tab={tabData} goals={goalsData} />
      </Router>
    );

    const prompt = screen.getByText(/List 1/i);
    expect(prompt).toBeInTheDocument();
    const prompt2 = screen.queryByText(/List 4/i);
    expect(prompt2).toBeNull();
  });

});