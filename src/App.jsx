import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import Summary from './components/Summary';
import ExpenseTable from './components/ExpenseTable';
import backgroundImage from './assets/background.jpeg'; // Import the background image

function App() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const addTransaction = (transaction) => {
    if (transaction.type === 'income') {
      // Update income if the transaction is of type 'income'
      setIncome((prevIncome) => prevIncome + parseFloat(transaction.amount));
    }
    setTransactions([...transactions, transaction]);
  };

  const editTransaction = (updatedTransaction) => {
    const oldTransaction = transactions.find((t) => t.id === updatedTransaction.id);

    // Adjust income if the transaction type is changed
    if (oldTransaction.type === 'income' && updatedTransaction.type !== 'income') {
      setIncome((prevIncome) => prevIncome - parseFloat(oldTransaction.amount));
    } else if (oldTransaction.type !== 'income' && updatedTransaction.type === 'income') {
      setIncome((prevIncome) => prevIncome + parseFloat(updatedTransaction.amount));
    }

    setTransactions(
      transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
    setEditingTransaction(null);
  };

  const deleteTransaction = (id) => {
    const deletedTransaction = transactions.find((t) => t.id === id);

    // Adjust income if the deleted transaction was of type 'income'
    if (deletedTransaction.type === 'income') {
      setIncome((prevIncome) => prevIncome - parseFloat(deletedTransaction.amount));
    }

    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          borderRadius: '20px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '1200px',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // Two-column grid layout
          gap: '20px',
        }}
      >
        {/* Left Section: Summary */}
        <div
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* App Name and Tagline */}
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                color: '#6a0dad',
                fontWeight: 'bold',
                marginBottom: '10px',
                fontSize: '28px',
              }}
            >
              SpendWisely
            </h1>
            <p
              style={{
                color: '#6a0dad',
                fontSize: '16px',
                lineHeight: '1.5',
                marginBottom: '20px',
                fontStyle: 'italic',
                opacity: '0.8',
              }}
            >
              Take control of your finances! Track your expenses, manage your income, and achieve your financial goals with SpendWisely.
            </p>
          </div>

          {/* Summary Section */}
          <Summary transactions={transactions} income={income} setIncome={setIncome} />
        </div>

        {/* Right Section: Add Transaction + Transaction List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Add Transaction Form */}
          <div
            style={{
              // backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2
              style={{
                color: '#6a0dad',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}
            >
              Add New Transaction
            </h2>
            <ExpenseForm
              addTransaction={editingTransaction ? editTransaction : addTransaction}
              initialTransaction={editingTransaction}
            />
          </div>

          {/* Transaction List */}
          <div
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2
              style={{
                color: '#6a0dad',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}
            >
            </h2>
            <ExpenseTable
              transactions={transactions}
              onEdit={setEditingTransaction}
              onDelete={deleteTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;