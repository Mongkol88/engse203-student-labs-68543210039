function PriorityBadge({ priority = 'unknown' }) {
    const label = {
        normal: 'ปกติ',
        urgent: 'เร่งด่วน',
        unknown: 'Unknown',
    };

    const normalizedPriority = ['normal', 'urgent'].includes(priority) ? priority : 'unknown';

    return (
        <p>
            <span className={`badge ${normalizedPriority}`}>
                {label[normalizedPriority]}
            </span>
            {' · '}
            {normalizedPriority}
        </p>
    );
}

export default PriorityBadge;

