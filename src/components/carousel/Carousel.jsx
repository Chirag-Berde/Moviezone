import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyloadimage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./carousel.scss";
import CircleRating from "../circlerating/CircleRating";
import Genres from "../genres/Genres";


const Carousel = ({ data, loading ,endpoint}) => {
    const caraouselContainer = useRef()
    const { url } = useSelector(state => state.home)
    const navigate = useNavigate()
    const navigation = (direction) => {
        const container = caraouselContainer.current
        const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) :container.scrollLeft + (container.offsetWidth + 20) 
        container.scrollTo({
            left:scrollAmount,
            behavior:"smooth"
        })
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
                {!loading ? (<div ref={caraouselContainer} className="carouselItems">
                    {data?.map((item) => {
                        const poster = item.poster_path ? url.poster + item.poster_path : PosterFallback
                        return (
                            <div key={item.id} className="carouselItem" onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                <div className="posterBlock">
                                    <Img src={poster} />
                                    <CircleRating rating={item.vote_average.toFixed(1)} />
                                    <Genres data={item.genre_ids.slice(0, 2)} />
                                </div>
                                <div className="textBlock">
                                    <span className="title">{item.title || item.name}</span>
                                    <span className="date">{dayjs(item.release_date).format("MMM D,YYYY")}</span>
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