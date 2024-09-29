'use strict';

import { Request, Response } from 'express';
import client from '../config/dbConfig';
import { GoalRequestBody } from '../interfaces/goal.interface';

// CREATION: Goals, Lists, and Tabs

export const saveGoals = async (req: Request, res: Response): Promise<void> => {
  const { name, list, tab, color, order_no, active, complete, last_completed, type }: GoalRequestBody = req.body;
  console.log(req.body);
  try {
    if (!name || !list || !tab || !color || !type) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    let tableName: string;
    let goalFields: string[] = [];
    let goalValues: (string | number | boolean | undefined)[] = [];
    let placeholders: string[] = [];

    switch (type) {
      case 'Simple List':
        tableName = 'goals.simple';
        goalFields = ['name', 'list', 'tab', 'color', 'order_no', 'active', 'complete', 'last_completed', 'type'];
        goalValues = [name, list, tab, color, order_no, active, complete, last_completed, type];
        break;
      case 'Progress Bar':
        tableName = 'goals.progbars';
        const { current, goal_number, units } = req.body;
        goalFields = ['name', 'list', 'tab', 'color', 'order_no', 'active', 'complete', 'last_completed', 'type', 'current', 'goal_number', 'units'];
        goalValues = [name, list, tab, color, order_no, active, complete, last_completed, type, current, goal_number, units];
        break;
      case 'Levels':
        tableName = 'goals.levels';
        const { level } = req.body;
        goalFields = ['name', 'list', 'tab', 'color', 'order_no', 'active', 'complete', 'last_completed', 'type', 'level'];
        goalValues = [name, list, tab, color, order_no, active, complete, last_completed, type, level];
        break;
      case 'Sets':
        tableName = 'goals.sets';
        const { sets, reps, completed_sets } = req.body;
        goalFields = ['name', 'list', 'tab', 'color', 'order_no', 'active', 'complete', 'last_completed', 'type', 'sets', 'reps', 'completed_sets'];
        goalValues = [name, list, tab, color, order_no, active, complete, last_completed, type, sets, reps, completed_sets];
        break;
      default:
        res.status(400).json({ message: 'Invalid goal type' });
        return;
    }

    goalValues = goalValues.filter(val => val !== undefined);
    placeholders = goalValues.map((_, index) => `$${index + 1}`);
    const insertGoalQuery = `
      INSERT INTO ${tableName} (${goalFields.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *;
    `;
    const doesGoalExist = `SELECT * FROM ${tableName} WHERE name = $1`;
    const result = await client.query(doesGoalExist, [name]);

    if (result.rows.length > 0) {
      res.status(400).json({ message: 'Goal with this name already exists' });
      return;
    }
    const newGoal = await client.query(insertGoalQuery, goalValues);
    res.status(201).json(newGoal.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error when saving goal' });
  }
};

export const getAllGoals = async (req: Request, res: Response): Promise<void> => {
  try {
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'goals' 
      AND table_type = 'BASE TABLE';
    `;
    const tablesResult = await client.query(tablesQuery);

    if (tablesResult.rows.length === 0) {
      res.status(200).json([]);
      return;
    }

    const allData: { [key: string]: any[] } = {};

    for (const row of tablesResult.rows) {
      const tableName = row.table_name;
      const dataQuery = `SELECT * FROM goals.${tableName};`;
      const dataResult = await client.query(dataQuery);
      allData[tableName] = dataResult.rows;
    }

    res.status(200).json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error when fetching data from goals schema' });
  }
};

// EDIT DATA

export const updateGoalStatus = async (req: Request, res: Response): Promise<void> => {
  const { name, type, newValue } = req.body;
  let tableName: string;
  let col: string;
  let condition: string;
  let completeUpdate = '';

  // Determine the table and column based on the goal type
  switch (type) {
    case 'Simple List':
      tableName = 'goals.simple';
      col = 'complete';
      break;
    case 'Progress Bar':
      tableName = 'goals.progbars';
      col = 'current';
      condition = 'current >= goal_number';
      completeUpdate = `, complete = CASE WHEN ${condition} THEN true ELSE complete END`;
      break;
    case 'Sets':
      tableName = 'goals.sets';
      col = 'completed_sets';
      condition = 'completed_sets = sets';
      completeUpdate = `, complete = CASE WHEN ${condition} THEN true ELSE complete END`;
      break;
    case 'Levels':
      tableName = 'goals.levels';
      col = 'level';
      condition = 'level = 3';
      completeUpdate = `, complete = CASE WHEN ${condition} THEN true ELSE complete END`;
      break;
    default:
      res.status(400).json({ message: 'Invalid goal type' });
      return;
  }

  const query = `
    UPDATE ${tableName}
    SET ${col} = $1
    ${completeUpdate}
    WHERE name = $2 RETURNING *`;

  try {
    const result = await client.query(query, [newValue, name]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Goal not found' });
      return;
    }

    res.status(200).json({ message: 'Goal updated successfully', updatedGoal: result.rows[0] });
  } catch (error) {
    console.error('Error updating goal status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE DATA

export const deleteGoal = async (req: Request, res: Response): Promise<void> => {
  const { goalName, type } = req.body;
  let tableName: string;

  switch (type) {
    case 'Simple List':
      tableName = 'goals.simple';
      break;
    case 'Progress Bar':
      tableName = 'goals.progbars';
      break;
    case 'Sets':
      tableName = 'goals.sets';
      break;
    case 'Levels':
      tableName = 'goals.levels';
      break;
    default:
      res.status(400).json({ message: 'Invalid goal type' });
      return;
  }

  try {
    const deleteQuery = `DELETE FROM ${tableName} WHERE name = $1 RETURNING *;`;
    const result = await client.query(deleteQuery, [goalName]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Goal not found' });
      return;
    }

    res.status(200).json({ message: 'Goal deleted successfully', goal: result.rows[0] });
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ message: 'Server error when deleting goal' });
  }
};
