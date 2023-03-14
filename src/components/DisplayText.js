const DisplayText = ({ label, text }) => {
  return (
    <div>
      <p className='bold-text margin-top-15'>{label}</p>
      <p>{text}</p>
    </div>
  );
};

export default DisplayText;