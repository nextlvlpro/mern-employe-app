import { Activity } from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingState from '../components/LoadingState.jsx';
import { getActivityLogs } from '../services/activityService.js';

export default function ActivityPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getActivityLogs()
      .then(setLogs)
      .catch(() => setError('Unable to load activity logs'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <h2>Activity</h2>
          <p>Recent employee and account changes.</p>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <section className="list-panel">
        <div className="activity-list">
          {loading && <LoadingState message="Loading activity..." />}
          {!loading && logs.map((log) => (
            <article className="activity-row" key={log._id}>
              <div className="activity-icon">
                <Activity size={17} />
              </div>
              <div>
                <strong>{log.message}</strong>
                <span>{log.user?.email || 'System'} - {new Date(log.createdAt).toLocaleString()}</span>
              </div>
            </article>
          ))}
          {!loading && !logs.length && <p className="empty-state">No activity recorded yet.</p>}
        </div>
      </section>
    </section>
  );
}
