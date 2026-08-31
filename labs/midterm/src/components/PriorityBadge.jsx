function PriorityBadge({ priority = 'normal' }) {
    const label = {
        normal: 'ปกติ',
        urgent: 'เร่งด่วน',
    };

    const normalizedPriority = priority === 'urgent' ? 'urgent' : 'normal';


    return (
        <p>
        <span className={`badge ${normalizedPriority}`}>
            {label[normalizedPriority]}
        </span> · {normalizedPriority}
        </p> 
    );
}

export default PriorityBadge;

