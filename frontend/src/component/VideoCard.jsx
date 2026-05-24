function VideoCard({ icon, subTitle, video, description }) {
  return (
    <div className="video-card">
      <div className="card-icon">{icon}</div>
      <h3>{subTitle}</h3>
      {video}
      <p>{description}</p>
    </div>
  );
}

export default VideoCard;