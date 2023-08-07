## 🚀 ATM React App: Step-by-Step Guide

Building an ATM React app is not only about creating a functional tool but also about learning the intricacies of React and understanding its component-based architecture. This guide will walk you through the creation process of the ATM app, explaining each file, function, and the reasoning behind each piece of code.

### 🔧 Prerequisites:

1. Basic understanding of JavaScript.
2. Node.js and npm installed on your machine.

---

#### 1. Setting up the React App

Start by creating a new React app using the `create-react-app` tool:

```bash
npx create-react-app atm-react-app
cd atm-react-app
```

---

#### 2. App.js

This is the main container for our application. 

```jsx
// App.js
import React from 'react';
import './App.css';
import Account from './Account'; // Importing the Account component

// Main App component
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ATM Application</h1> // Title of our application
      </header>
      <Account /> // Rendering the Account component
      <footer>@carobarreirov</footer> // Fixed footer
    </div>
  );
}

export default App;
```

- **`import Account from './Account';`**: This imports the `Account` component which will contain our ATM operations.
- **`<Account />`**: This JSX tag renders the `Account` component within our main app.

---

#### 3. Account.js

This component contains the core logic of our ATM operations. 

```jsx
// Account.js
import React, { useState } from 'react'; // Importing React and useState hook
import ATMDeposit from './ATMDeposit';   // Importing the ATMDeposit component

const Account = () => {
  // State variables for transaction amount, account balance, deposit mode, and transaction validity
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const [atmMode, setAtmMode] = useState('');
  const [isValidTransaction, setIsValidTransaction] = useState(false);

  // Displaying account balance
  const status = `Account Balance: $${accountBalance}`;

  // Handling amount input change
  const handleAmountChange = (event) => {
    const amount = Number(event.target.value);
    // Preventing negative or zero amounts
    if (amount <= 0) {
      setIsValidTransaction(false);
      return;
    }
    // Checking for sufficient funds for withdrawal
    if (!isDeposit && amount > accountBalance) {
      setIsValidTransaction(false);
    } else {
      setIsValidTransaction(true);
    }
    setTransactionAmount(amount);
  };

  // Handling transaction submission
  const handleTransactionSubmit = (event) => {
    event.preventDefault();
    const newBalance = isDeposit ? accountBalance + transactionAmount : accountBalance - transactionAmount;
    setAccountBalance(newBalance);
    setIsValidTransaction(false);
    setTransactionAmount(0);  // Clearing the input after the transaction
  };

  // Handling mode change (Deposit or Cash Back)
  const handleModeChange = (event) => {
    const mode = event.target.value;
    setAtmMode(mode);
    setIsValidTransaction(false);
    setIsDeposit(mode === 'Deposit');
  };

  // Rendering the component
  return (
    <div className="account-container">
      <h2>{status}</h2>
      <label>Select an action below to continue:</label>
      <select onChange={handleModeChange} name="mode" id="mode-select">
        <option value=""></option>
        <option value="Deposit">Deposit</option>
        <option value="Cash Back">Cash Back</option>
      </select>
      // Conditionally rendering the ATMDeposit component based on the selected mode
      {atmMode && (
        <ATMDeposit 
          onAmountChange={handleAmountChange} 
          isDeposit={isDeposit} 
          isValid={isValidTransaction} 
          onSubmit={handleTransactionSubmit}
        />
      )}
    </div>
  );
};

export default Account;
```

- **`useState`**: This is a React hook that allows you to add state to your functional components. Each state variable has its associated setter function, e.g., `transactionAmount` and `setTransactionAmount`.
- **Event Handlers**: Functions like `handleAmountChange`, `handleTransactionSubmit`, and `handleModeChange` handle specific events in our app, such as input changes, form submissions, and mode changes.
- More about the **states**: In React, state variables are used to store component data that can change over time and should trigger a re-render when it does. In our ATM app, the Account.js component uses several state variables to manage its functionality:

1. transactionAmount: Represents the amount the user wants to deposit or withdraw.
Why: We need to know how much the user wants to deposit or withdraw to correctly update the account balance.
Usage: This state is bound to the input field, meaning any change in the input updates this state.

2. accountBalance: Represents the current balance in the account.
Why: An essential feature of any ATM application is to track and display the current balance.
Usage: Updated whenever a deposit or withdrawal is made.

3. isDeposit: A boolean that indicates if the current operation is a deposit (true) or withdrawal (false).
Why: The app needs to know the mode (deposit/withdrawal) to either add to or subtract from the accountBalance.
Usage: Determines which operation to perform when the form is submitted.

4. atmMode: Stores the current mode selected by the user (either "Deposit", "Cash Back", or an empty string if no mode is selected).
Why: Beyond just knowing if it's a deposit or withdrawal, this state helps in conditionally rendering the ATMDeposit component.
Usage: Used to check if the ATMDeposit component should be displayed.

5. isValidTransaction: A boolean that indicates if the current transaction is valid.
Why: We need to ensure that the user doesn't deposit/withdraw negative amounts or withdraw more than what's in the account.
Usage: If true, allows the transaction to proceed. It's also used to enable/disable the submit button.

These state variables collectively ensure that the ATM app functions correctly, providing feedback to the user, and updating the account balance as needed. By using state in React, the app can be interactive and dynamic, instantly responding to user actions.


---

#### 4. ATMDeposit.js

This component provides the UI for deposit and withdrawal operations.

```jsx
// ATMDeposit.js
import React from 'react'; // Importing

 React

const ATMDeposit = ({ onAmountChange, isDeposit, isValid, onSubmit }) => {
  const actionLabel = isDeposit ? 'Deposit' : 'Cash Back'; // Label based on the mode
  return (
    <div className="atm-deposit-container">
      <h3>{actionLabel}</h3>
      <form onSubmit={onSubmit}>
        <input 
            type="number" 
            placeholder="Enter amount" 
            onChange={onAmountChange}
            value={transactionAmount}
            min="0" // Preventing negative input
        />
        <input 
            type="submit" 
            disabled={!isValid} 
            value="Submit"
        />
      </form>
    </div>
  );
};

export default ATMDeposit;
```

- **Props**: This component receives several props to handle input changes, determine the operation mode, validate the transaction, and manage form submissions.
- **`actionLabel`**: Dynamically sets the label based on whether the current operation is a deposit or withdrawal.
- **Structure** Why is ATMDeposit.js separate from the rest of the code?
Separation of concerns is a design principle in software engineering where each module or component is responsible for a specific aspect of the functionality. By following this principle, code becomes:

- Modular: Components can be reused in different parts of the application or even in different projects.
- Maintainable: It's easier to debug, update, or expand a specific feature when its logic is contained within a specific module or component.
- Readable: New developers or team members can understand the codebase faster when each component has a clear and distinct purpose.

In our ATM app, ATMDeposit.js is responsible for the user interface and interactions related to depositing or withdrawing money. By keeping it separate from the main logic in Account.js, we ensure that if we want to update how deposits or withdrawals are made in the future (e.g., adding new fields or changing the UI), we only need to modify ATMDeposit.js without touching the main logic of the application in Account.js.

---

#### 5. Styling:

Refer to the earlier section on styling to get the CSS styles for this app. Make sure to integrate the styles into `App.css`.

---

#### 6. Conclusion:

By following this step-by-step guide, you've created a functional ATM React app and learned about React components, state management, event handling, and styling.

---

#### 7. License:

This project is licensed under the MIT License.
This guide was crafted with 💜 by @carobarreirov.