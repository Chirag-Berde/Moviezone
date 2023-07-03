import React, { useState } from "react";

import "./videosection.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { Playbutton } from "../Playbutton";
import VideoPopup from "../../../components/videopopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";


const VideoSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map(video => {
                           return <div key={video.id} className="videoItem" onClick={() => {
                                setVideoId(video.id)
                                setShow(true)
                            }}>
                                <div className="videoThumbnail">
                                    <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                    <Playbutton />
                                </div>
                            </div>
                        })}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideoSection;