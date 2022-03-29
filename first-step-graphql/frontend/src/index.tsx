import React, {VFC} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

const BOOKS = gql`
    query Books {
        books {
            title
            author
        }
    }
`;

type bookList = {
    books: book[];
}

type book = {
    title: string;
    author: string;
}

const Books = () => {
    const { loading, error, data } = useQuery<bookList>(BOOKS);

    if (loading) return <p>Loading....</p>;
    if (error) return  <p>Error</p>;

    if (data === null || data === undefined) {
        return <></>;
    }

    return (
        <>
            {data.books.map((book, index) => (
                <div key={book.title}>
                    <p>
                        {book.title} by {book.author}
                    </p>
                </div>
            ))}
        </>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Books/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
