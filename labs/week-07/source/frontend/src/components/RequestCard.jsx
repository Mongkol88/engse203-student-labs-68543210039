import { Link } from 'react-router-dom';

function RequestCard({ request, onDeleteRequest,  onChangeStatus}) {
  const isCompleted = request.status === 'completed';
  const SetStatus = (request.status === 'pending') ? "in-progress" : "completed";
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3><Link to={`/requests/${request.id}`}>{request.requestType}</Link></h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <p><span className={`badge ${request.status}`}>{request.status}</span> · {request.priority}</p>
      </div>
      <div className="request-card-actions">
        <button className="button danger" type="button" onClick={() => onDeleteRequest(request.id)} aria-label={`ลบคำร้อง ${request.id}`}>
          ลบ
        </button>
        {!isCompleted && (
          <button className="button change" type="button" onClick={() => onChangeStatus(request, SetStatus)}>
            เปลี่ยนสถานะ
          </button> 
        )}
      </div>
    </article>
  );
}

export default RequestCard;
