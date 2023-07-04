import React, { useEffect, useState } from 'react';
import './searchresult.scss'
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchData } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import noResults from "../../assets/no-results.png"
import Spinner from "../../components/spinner/Spinner"

const SearchResult = () => {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()
  const fetchInitialData = () => {
    setLoading(true)
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then(response => {
      setData(response)
      setPageNum(prev => prev + 1)
      setLoading(false)
    })
  }

  const fetchNextPageData = () => {
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then(response => {
      if (data?.results) {
        setData({ ...data, results: [...data.results, ...response.results] })
      } else {
        setData(response)
      }
      setPageNum(prev => prev + 1)
    })
  }

  useEffect(() => {
    fetchInitialData()
  }, [query])
  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/>}
    </div>
  )
}

export default SearchResult