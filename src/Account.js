import React, { useState } from 'react';
import ATMDeposit from './ATMDeposit';

const Account = () => {
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const [atmMode, setAtmMode] = useState('');
  const [isValidTransaction, setIsValidTransaction] = useState(false);

  const status = `Account Balance: $${accountBalance}`;

  const handleAmountChange = (event) => {
    const amount = Number(event.target.value);
    if (amount < 0 || amount === 0) {
        setIsValidTransaction(false);
        return;
    }
    if (!isDeposit && amount > accountBalance) {
      setIsValidTransaction(false);
    } else {
      setIsValidTransaction(true);
    }
    setTransactionAmount(amount);
  };

  const handleTransactionSubmit = (event) => {
    event.preventDefault();
    const newBalance = isDeposit ? accountBalance + transactionAmount : accountBalance - transactionAmount;
    setAccountBalance(newBalance);
    setIsValidTransaction(false);
    setTransactionAmount(0);  // Clearing the input after the transaction
  };

  const handleModeChange = (event) => {
    const mode = event.target.value;
    setAtmMode(mode);
    setIsValidTransaction(false);
    setIsDeposit(mode === 'Deposit');
  };

  return (
    <div className="account-container">
      <h2>{status}</h2>
      <label>Select an action below to continue:</label>
      <select onChange={handleModeChange} name="mode" id="mode-select">
        <option value=""></option>
        <option value="Deposit">Deposit</option>
        <option value="Cash Back">Cash Back</option>
      </select>
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
