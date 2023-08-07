import React from 'react';

const ATMDeposit = ({ onAmountChange, isDeposit, isValid, onSubmit, transactionAmount }) => {
  const actionLabel = isDeposit ? 'Deposit' : 'Cash Back';
  return (
    <div className="atm-deposit-container">
      <h3>{actionLabel}</h3>
      <form onSubmit={onSubmit}>
        <input 
          type="number" 
          placeholder="Enter amount" 
          onChange={onAmountChange}
          value={transactionAmount}  // Bind the value to the state
          min="0"  // This prevents the user from manually setting a negative value using the input's controls.
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
