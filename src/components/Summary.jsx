
import PropTypes from 'prop-types';

function Summary({ transactions, income, setIncome }) {
  // Calculate total expenses
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  // Calculate net balance (income - expenses)
  const netBalance = income - totalExpenses;

  return (
    <div>
      {/* Income Input */}
      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor="income"
          style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#6a0dad' }}
        >
          Set Income:
        </label>
        <input
          type="number"
          id="income"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value))}
          required
          min="0"
          step="any"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #6a0dad',
            fontSize: '16px',
            color: '#6a0dad',
          }}
          placeholder="Enter your income"
        />
      </div>

      {/* Summary Details */}
      <div style={{ marginBottom: '10px' }}>
        <p style={{ margin: '10px 0', fontSize: '1rem', color: '#555' }}>
          Total Income: <b style={{ color: '#28a745', fontSize: '1.2rem' }}>${income.toFixed(2)}</b>
        </p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <p style={{ margin: '10px 0', fontSize: '1rem', color: '#555' }}>
          Total Expenses: <b style={{ color: '#dc3545', fontSize: '1.2rem' }}>${totalExpenses.toFixed(2)}</b>
        </p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <p style={{ margin: '10px 0', fontSize: '1rem', color: '#555' }}>
          Net Balance: <b style={{ color: netBalance >= 0 ? '#28a745' : '#dc3545', fontSize: '1.2rem' }}>
            ${netBalance.toFixed(2)}
          </b>
        </p>
      </div>
    </div>
  );
}

Summary.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  income: PropTypes.number.isRequired,
  setIncome: PropTypes.func.isRequired,
};

export default Summary;