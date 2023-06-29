import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./carousel.scss";
import CircleRating from "../circlerating/CircleRating";

const Carousel = ({ data, loading }) => {
    const caraouselContainer = useRef()
    const { url } = useSelector(state => state.home)
    const navigate = useNavigate()
    const navigation = (direction) => {

    }
    const skeletonItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">

                </div>
                <div className="textBlock">
                    <div className="title skeleton">

                    </div>
                    <div className="date skeleton">

                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => navigation("right")} />
                {!loading ? (<div className="carouselItems">
                    {data?.map((item) => {
                        const poster = item.poster_path ? url.poster + item.poster_path : PosterFallback
                        return (
                            <div key={item.id} className="carouselItem">
                                <div className="posterBlock">
                                    <Img src={poster} />
                                    <CircleRating rating={item.vote_average.toFixed(1)}/>
                                </div>
                                <div className="textBlock">
                                    <span className="title">{item.title || item.name}</span>
                                    <span className="date">{dayjs(item.release_Date).format("MMM D,YYYY")}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>)
                    : (<div className="loadingSkeleton">
                        {skeletonItem()}
                        {skeletonItem()}
                        {skeletonItem()}
                        {skeletonItem()}
                        {skeletonItem()}
                    </div>)
                }
            </ContentWrapper>
        </div>
    )
}

export default Carousel