import PropTypes from 'prop-types';

function CategorySelector({ value, onChange }) {
  const categories = ['Food', 'Transportation', 'Entertainment', 'Bills', 'Housing', 'Other'];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '50%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
      }}
    >
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

CategorySelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategorySelector;