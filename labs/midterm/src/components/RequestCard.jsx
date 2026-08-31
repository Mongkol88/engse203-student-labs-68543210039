import { Link } from 'react-router-dom';
import PriorityBadge from '../components/PriorityBadge.jsx';

function RequestCard({ request, onDeleteRequest, onMarkDone }) {
  const isCompleted = request.status === 'completed';

  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3><Link to={`/requests/${request.id}`}>{request.requestType}</Link></h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <PriorityBadge priority={request.priority} />
      </div>

      <div className="request-card-actions">
        {!isCompleted && (
          <button
            className="button primary"
            type="button"
            onClick={() => onMarkDone?.(request.id)}
            aria-label={`ทำคำร้อง ${request.id} ให้เสร็จสิ้น`}
          >
            เสร็จ
          </button>
        )}

        <button
          className="button danger"
          type="button"
          onClick={() => onDeleteRequest(request.id)}
          aria-label={`ลบคำร้อง ${request.id}`}
        >
          ลบ
        </button>
      </div>
    </article>
  );
}

export default RequestCard;
