'use strict';

import { Request, Response } from 'express';
import client from '../config/dbConfig';
import { TabRequestBody } from '../interfaces/tab.interface';

export const saveTab = async (req: Request, res: Response): Promise<void> => {
  const { name, icon, col_one, col_one_b, col_two, col_two_b, col_three, col_three_b, order_no }: TabRequestBody = req.body;

  if (!name || !icon) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  try {
    const checkIfExistsQuery = `
      SELECT * FROM userinfo.tabs WHERE name = $1 OR icon = $2`;
    const existingTabResult = await client.query(checkIfExistsQuery, [name, icon]);

    if (existingTabResult.rows.length > 0) {
      if (existingTabResult.rows[0].name === name) {
        res.status(400).json({ message: 'Tab with this name already exists' });
        return;
      }
      if (existingTabResult.rows[0].icon === icon) {
        res.status(400).json({ message: 'Tab with this icon already exists' });
        return;
      }
    }

    const insertTabQuery = `
      INSERT INTO userinfo.tabs (name, icon, col_one, col_one_b, col_two, col_two_b, col_three, col_three_b, order_no)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const newTab = await client.query(insertTabQuery, [
      name, icon, col_one, col_one_b, col_two, col_two_b, col_three, col_three_b, order_no
    ]);

    if (!newTab.rows.length) {
      res.status(500).json({ message: 'Failed to insert the new tab' });
      return;
    }
    res.status(201).json(newTab.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error when saving tab' });
  }
};

// FETCHING STORED DATA

export const getAllTabs = async (req: Request, res: Response): Promise<void> => {
  try {
    const getTabsQuery = 'SELECT * FROM userinfo.tabs';
    const result = await client.query(getTabsQuery);
    if (result.rows.length === 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching tabs:', error);
    res.status(500).json({ message: 'Server error when fetching tabs' });
  }
};

// DELETE DATA

export const deleteTab = async (req: Request, res: Response): Promise<void> => {
  const { tabName } = req.params;

  try {
    const deleteQuery = 'DELETE FROM userinfo.tabs WHERE name = $1 RETURNING *;';
    const result = await client.query(deleteQuery, [tabName]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Tab not found' });
      return;
    }

    res.status(200).json({ message: 'Tab deleted successfully', tab: result.rows[0] });
  } catch (error) {
    console.error('Error deleting tab:', error);
    res.status(500).json({ message: 'Server error when deleting tab' });
  }
};

export const deleteListPos = async (req: Request, res: Response): Promise<void> => {
  const { tabName, listName } = req.params;

  try {
    const selectQuery = `
      SELECT col_one, col_two, col_three
      FROM userinfo.tabs
      WHERE name = $1;
    `;
    const tabResult = await client.query(selectQuery, [tabName]);

    if (tabResult.rowCount === 0) {
      res.status(404).json({ message: 'Tab not found' });
      return;
    }

    const { col_one, col_two, col_three } = tabResult.rows[0];

    let updateQuery = '';
    const queryValues = [tabName];

    if (col_one === listName) {
      updateQuery = 'UPDATE userinfo.tabs SET col_one = NULL WHERE name = $1';
    } else if (col_two === listName) {
      updateQuery = 'UPDATE userinfo.tabs SET col_two = NULL WHERE name = $1';
    } else if (col_three === listName) {
      updateQuery = 'UPDATE userinfo.tabs SET col_three = NULL WHERE name = $1';
    } else {
      res.status(404).json({ message: 'List not found in any column' });
      return;
    }

    await client.query(updateQuery, queryValues);

    res.status(200).json({ message: `List ${listName} deleted successfully from tab ${tabName}` });
  } catch (error) {
    console.error('Error deleting list from tab:', error);
    res.status(500).json({ message: 'Server error when deleting list' });
  }
};

export const insertListPos = async (req: any, res: any) => {
  const { tabName, listName, col } = req.body;
  const validColumns = ['col_one', 'col_one_b', 'col_two', 'col_two_b', 'col_three', 'col_three_b'];
  if (!validColumns.includes(col)) {
      return res.status(400).json({ message: 'Invalid column name' });
  }
  const query = `UPDATE userinfo.tabs SET ${col} = $1 WHERE name = $2 RETURNING *`;
  try {
      const result = await client.query(query, [listName, tabName]);
      if (result.rowCount === 0) {
          return res.status(404).json({ message: 'Tab not found' });
      }
      res.status(200).json(result.rows[0]);
  } catch (error) {
      console.error('Error updating tab:', error);
      res.status(500).json({ message: 'Server error while updating the tab' });
  }
}
