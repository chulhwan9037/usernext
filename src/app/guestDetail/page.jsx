import './guestDetail.css';

export default function GuestDetail({ guestDetail }) {
    const {
        idx,
        id,
        title,
        content,
        created_at
    } = guestDetail;

    return (
        <div className="guest-detail-container">
            <div className="info-item">
                <label>ID:</label>
                <p className="info-name">{id}</p>
            </div>
            <div className="info-item">
                <label>Title:</label>
                <p className="info-subject">{title}</p>
            </div>
            <div className="info-item">
                <label>Content:</label>
                <p className="info-content">{content}</p>
            </div>
            <div className="info-item">
                <label>Registered Date:</label>
                <p className="info-regdate">{created_at}</p>
            </div>
        </div>
    );
}
