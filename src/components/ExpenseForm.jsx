import { useState } from 'react';
import PropTypes from 'prop-types';
import CategorySelector from './CategorySelector';

function ExpenseForm({ addTransaction, initialTransaction }) {
  const [amount, setAmount] = useState(initialTransaction?.amount || '');
  const [category, setCategory] = useState(initialTransaction?.category || '');
  const [type, setType] = useState(initialTransaction?.type || '');
  const [date, setDate] = useState(initialTransaction?.date || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    if (!category || !type || !date) {
      alert('Please fill in all fields');
      return;
    }

    const newTransaction = {
      id: initialTransaction?.id || Date.now(),
      amount: parsedAmount,
      category,
      type,
      date,
    };

    addTransaction(newTransaction);

    // Reset form fields
    setAmount('');
    setCategory('');
    setType('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Amount Input */}
      <div>
        <label htmlFor="amount" style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#6a0dad' }}>
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="any"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #6a0dad',
            fontSize: '14px',
            color: '#6a0dad',
          }}
          placeholder="Enter amount"
        />
      </div>

      {/* Category Selector */}
      <div>
        <label htmlFor="category" style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#6a0dad' }}>
          Category:
        </label>
        <CategorySelector value={category} onChange={setCategory} />
      </div>

      {/* Transaction Type Selector */}
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#6a0dad' }}>
          Transaction Type:
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #6a0dad',
            fontSize: '14px',
            color: '#6a0dad',
          }}
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Date Picker */}
      <div>
        <label htmlFor="date" style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#6a0dad' }}>
          Date:
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #6a0dad',
            fontSize: '14px',
            color: '#6a0dad',
          }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#6a0dad',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        {initialTransaction ? 'Save Changes' : 'Add Transaction'}
      </button>
    </form>
  );
}

ExpenseForm.propTypes = {
  addTransaction: PropTypes.func.isRequired,
  initialTransaction: PropTypes.shape({
    id: PropTypes.number,
    amount: PropTypes.number,
    category: PropTypes.string,
    type: PropTypes.string,
    date: PropTypes.string,
  }),
};

ExpenseForm.defaultProps = {
  initialTransaction: null,
};

export default ExpenseForm;