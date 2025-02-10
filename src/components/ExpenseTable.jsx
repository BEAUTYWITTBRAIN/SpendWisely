
import PropTypes from 'prop-types';
import { Edit, Trash2 } from 'lucide-react'; // Import Lucide icons

function ExpenseTable({ transactions, onEdit, onDelete }) {
  return (
    <div
      style={{
        // backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
      }}
    >
      <h3 style={{ color: '#6a0dad', marginBottom: '16px' }}>Transaction List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #6a0dad', color: '#6a0dad' }}>
              Category
            </th>
            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #6a0dad', color: '#6a0dad' }}>
              Amount
            </th>
            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #6a0dad', color: '#6a0dad' }}>
              Type
            </th>
            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #6a0dad', color: '#6a0dad' }}>
              Date
            </th>
            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #6a0dad', color: '#6a0dad' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{t.category}</td>
              <td style={{ padding: '10px' }}>${t.amount.toFixed(2)}</td>
              <td style={{ padding: '10px' }}>{t.type}</td>
              <td style={{ padding: '10px' }}>{t.date}</td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => onEdit(t)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6a0dad',
                    marginRight: '8px',
                  }}
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#dc3545',
                  }}
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ExpenseTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ExpenseTable;