"use client"

export default function DetailTrade({detailTrade}){
    const {
        idx,
        id,
        title,
        content,
        image,
        image_size,
        image_format,
        created_at
    } = detailTrade;
    return(
        <div className="guest-detail-container">
            <div className="info-item">
                <label>Image:</label>
                <p className="info-name">{image_format}</p>
            </div>
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
    )
}