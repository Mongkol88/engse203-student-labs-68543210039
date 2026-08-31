import { Link } from 'react-router-dom';
import  PriorityBadge  from '../components/PriorityBadge.jsx';

function RequestCard({ request, onDeleteRequest }) {
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3><Link to={`/requests/${request.id}`}>{request.requestType}</Link></h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        {/* TODO B4: แทน {request.priority} ด้านล่างด้วย <PriorityBadge priority={request.priority} /> ที่คุณสร้าง */}
        <PriorityBadge priority={request.priority} /> 
      </div>
      <button className="button danger" type="button" onClick={() => onDeleteRequest(request.id)} aria-label={`ลบคำร้อง ${request.id}`}>
        ลบ
      </button>
    </article>
  );
}

export default RequestCard;
