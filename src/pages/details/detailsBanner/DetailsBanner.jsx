import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./detailsbanner.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circlerating/CircleRating";
import PosterFallback from "../../../assets/no-poster.png";
import { Playbutton } from "../Playbutton";
import VideoPopup from "../../../components/videopopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";


const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const { url } = useSelector(state => state.home)
    const _genres = data?.genres.map(item => item.id)
    const director = crew?.filter(item => item.job === "Director")
    const writer = crew?.filter(item => item.job === "Screenplay" || item.job === "Story" || item.job === "Writer")

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (<>
                        <div className="backdrop-img">
                            <Img src={url.backdrop + data?.backdrop_path} />
                        </div>
                        <div className="opacity-layer">
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (<Img className="posterImg" src={url.backdrop + data.poster_path} />) : (<Img className="posterImg" src={PosterFallback} />)}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <Genres data={_genres} />
                                        <div className="row">
                                            <CircleRating rating={data.vote_average.toFixed(1)} />
                                            <div className="playbtn" onClick={() => { 
                                                setShow(true)
                                                setVideoId(video.key)
                                                }}>
                                                <Playbutton /> Watch Trailer
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status: {" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date: {" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(data.release_date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Runtime: {" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director :{" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((item, index) => {
                                                        return <span key={index}>
                                                            {item.name}
                                                            {director.length - 1 !== index && ", "}
                                                        </span>
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((item, index) => {
                                                        return <span key={index}>
                                                            {item.name}
                                                            {writer.length - 1 !== index && ", "}
                                                        </span>
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator :{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map((item, index) => {
                                                        return <span key={index}>
                                                            {item.name}
                                                            {data?.created_by.length - 1 !== index && ", "}
                                                        </span>
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
                            </ContentWrapper>
                        </div>
                    </>)}
                </>

            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;