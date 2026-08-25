function RequestCard({ request, onDeleteRequest }) {
  const badgeClass = request.status === 'completed'
    ? 'status-badge completed'
    : request.status === 'in-progress'
      ? 'status-badge in-progress'
      : 'status-badge pending';

  return (
    <article className="request-card">
      <div>
        <div className="card-meta">
          <p className="request-id">{request.id}</p>
          <span className={badgeClass}>{request.status}</span>
        </div>
        <h3>{request.requestType}</h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
      </div>
      <button type="button" onClick={() => onDeleteRequest(request.id)}>ลบ</button>
    </article>
  );
}

export default RequestCard;

