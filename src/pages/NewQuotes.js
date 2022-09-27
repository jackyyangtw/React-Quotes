import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from '../lib/api'
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const NewQuotes = () =>{
    const history = useHistory();
    const { sendRequest, status } = useHttp(addQuote);
    const addQuoteHandler = data => {
        sendRequest(data)
    }

    useEffect(()=>{
        if(status === 'completed') {
            history.push('/quotes')
        }
    },[status,history])

    return (
        <>
            <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
        </>
    )
}

export default NewQuotes;