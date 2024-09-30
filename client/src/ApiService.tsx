import axios from "axios";

const BASE_URL = 'http://localhost:3000/api'

// CREATION: Goals, Lists, and Tabs

export const createGoal = async (goal: any) => {
  try {
      console.log('goal api', goal)
      const response = await axios.post(`${BASE_URL}/storedgoals`, goal, {
          headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('Network request to create goal was sent successfully', response.data);
      return response.data;
  } catch (error: any) {
      console.error('Error sending network request to create goal:', error.response ? error.response.data : error.message);
  }
};

export const createTab = async (tab: any) => {
    const postRequest: any = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tab)
    };
    try {
        const response: any = await fetch(`${BASE_URL}/tabs`, postRequest);
        if (!response.ok) {
            console.log('Network response when creating a tab was not OK');
            return;
        } else {
            const data: any = await response.json();
            console.log('Network request to create tab was sent successfully', data)
        }
    } catch (error) {
        console.log(error, 'Error sending network request to create tab');
    }
};

// FETCHING STORED DATA

export const fetchAllTabs = async () => {
    try {
        const response: any = await fetch(`${BASE_URL}/tabs`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            console.log('Network response when fetching tabs was not OK');
            return [];
        }
        const data: any = await response.json();
        console.log('Tabs fetched successfully:', data);
        return data; // This will be an array
    } catch (error) {
        console.log('Error fetching tabs:', error);
        return [];
    }
};

export const fetchAllGoals = async () => {
    try {
      const response: any = await axios.get(`${BASE_URL}/storedgoals`);
      console.log('Goals fetched!')
      return response.data;
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw error;
    }
  }

// EDIT DATA

export const updateGoalProgress = async(name: any, type: any, newValue: any) => {
  if (newValue === 0) {
    return;
  }
  const postRequest: any = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, type, newValue })
  };
  try {
    const response: any = await fetch(`${BASE_URL}/storedgoals/status`, postRequest);
    if (!response.ok) {
      console.log('Network response when storing goal progress was not ok');
      return;
    } else {
      await response.json();
      console.log('Goal progress updated successfully')
    }
  } catch (error) {
    console.log('Error storing goal progress')
  }
}

export const insertListPosition = async(tabName: any, listName: any, col: any) => {
    const postRequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tabName, listName, col })
      };
    try {
        const response = await fetch(`${BASE_URL}/tabs/position`, postRequest);
        if (!response.ok) {
          console.log('Network response when inserting list position was not ok');
          return;
        } else {
          await response.json();
          console.log('List position posted successfully')
        }
    } catch (error) {
        console.log('Error posting events')
    }
}

// DELETE DATA

export const deleteTab = async (tabName: any) => {
    try {
      const response = await fetch(`${BASE_URL}/tabs/${tabName}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        console.log('Failed to delete the tab');
        return;
      }
      const data = await response.json();
      console.log('Tab deleted successfully:', data);
    } catch (error) {
      console.log('Error deleting tab:', error);
    }
  };

  export const deleteGoal = async (goalName: any, type: any) => {
    try {
      const response: any = await fetch(`${BASE_URL}/storedgoals`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalName, type })
      });
      if (!response.ok) {
        console.log('Failed to delete the goal');
        return;
      }
      const data: any = await response.json();
      console.log('Goal deleted successfully:', data);
    } catch (error) {
      console.log('Error deleting goal:', error);
    }
  };

  export const deleteListPosition = async(tabName: any, listName: any) => {
    try {
      const response: any = await fetch(`${BASE_URL}/tabs/${tabName}/position/${listName}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ tabName, listName })
      });
      if (!response.ok) {
        console.log('Failed to delete list position');
        return;
      }
      const data: any = await response.json();
      console.log('List position deleted successfully:', data);
    } catch (error) {
      console.log('Error deleting list position:', error);
    }
  }

// OTHER

const resetGoals = async() => {
    // if (readDate(new Date()) !== lastLoggedIn) {

    // }
}

const readDate = (date: any) => {
    return date.toLocaleDateString('en-GB', {
       day: '2-digit',
       month: 'long',
       year: 'numeric'
     });
 }

const changeGoalType = () => {
    
}