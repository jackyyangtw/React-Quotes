import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// const DUMMY_QUOTES = [
//     { id:'q1', author: 'Max', text: 'Learning React is great!'},
//     { id:'q2', author: 'Jacky', text: 'React is great!'},
// ]
const QuoteDetail = () =>{
    const params = useParams();
    const match = useRouteMatch();
    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
    const { quoteId } = params
    // const quote = DUMMY_QUOTES.find(el => el.id === params.quoteId);

    useEffect(()=>{
        sendRequest(quoteId)
    },[sendRequest,quoteId])

    if(status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner></LoadingSpinner>
            </div>
        )
    }

    if(error) {
        return <p className="centered">{error}</p>
    }

    if(!loadedQuote.text) {
        return <NoQuotesFound></NoQuotesFound>
    }


    return (
        <>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </>
    )
}

export default QuoteDetail;