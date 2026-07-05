export default function LoadingState({ message = 'Loading data...' }) {
  return (
    <div className="loading-state">
      <span className="loader" />
      <strong>{message}</strong>
    </div>
  );
}
