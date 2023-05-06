import React, {useState} from "react";
import Post, {PostProps} from "../components/Post";

type Props = {
    feed: PostProps[];
    numberOfPostsPerPage: number;
};

function range(start: number, end: number) {
    let rangeArray = [];
    for(let i = start; i < end; i++) {
        rangeArray.push(i);
    }
    return rangeArray;
}

function generatePaginationArray(pagesNumber: number, currentPage: number, maxSize: number) {
      if (pagesNumber <= maxSize){
          return range(0, pagesNumber);
      }
      console.log(currentPage)
      console.log(pagesNumber)
      if (currentPage >= pagesNumber - 2){
          const lower = Math.max(pagesNumber - maxSize , 0);
          return range(lower, Math.min(lower + maxSize, pagesNumber))
      }
      const lower = Math.max(currentPage - maxSize + 3 , 0);
      let arr : (number | string)[]= range(lower, lower + maxSize - 1);
      arr.push("...");
      return arr;
}

const Pagination: React.FC<Props> = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pagesNumber = Math.ceil(props.feed.length / props.numberOfPostsPerPage);


    const onClickSpecificPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const onClickNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, pagesNumber - 1));
    };

    const onClickPrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 0));
    };

    const onClickGoToFirstPage = () => {
        setCurrentPage(0);
    };

    const onClickGoToLastPage = () => {
        setCurrentPage(pagesNumber - 1);
    };

    return (
        <div>
            <div>
                {props.feed.slice(currentPage * props.numberOfPostsPerPage, (currentPage + 1) * props.numberOfPostsPerPage).map((post) => (
                    <div key={post.id} className="post">
                        <Post post={post}/>
                    </div>
                ))}
            </div>
            <style jsx>{`
                        .post {
                          background: white;
                          transition: box-shadow 0.1s ease-in;
                        }
                
                        .post:hover {
                          box-shadow: 1px 1px 3px #aaa;
                        }
                
                        .post + .post {
                          margin-top: 2rem;
                        }
                        
                        .pagination {
                          display: inline-block;
                        }
                        .pagination button {
                          color: black;
                          float: left;
                          padding: 8px 16px;
                          text-decoration: none;
                          transition: background-color .3s;
                          border: 1px solid #ddd;
                          font-size: 22px;
                        }
                        
                        .pagination button.active {
                          background-color: #4CAF50;
                          color: white;
                          border: 1px solid #4CAF50;
                        }
                        
                        .pagination button:hover:not(.active) {background-color: #ddd;}
                       `}
            </style>

            <div className="pagination">
                <button onClick={() => onClickGoToFirstPage()}>&laquo;</button>
                <button onClick={() => onClickPrevPage()}>&lsaquo;</button>
                {generatePaginationArray(pagesNumber, currentPage, 7).map((pageNumber) => (
                    pageNumber === currentPage ?
                        <button className="active" onClick={() => onClickSpecificPage(pageNumber)}>{pageNumber + 1}</button> :
                        pageNumber === '...' ?
                            <button onClick={() => onClickNextPage()}>...</button> :
                            <button onClick={() => onClickSpecificPage(pageNumber)}>{pageNumber + 1}</button>
                ))}
                <button onClick={() => onClickNextPage()}>&rsaquo;</button>
                <button onClick={() => onClickGoToLastPage()}>&raquo;</button>
            </div>
        </div>
    );
};

export default Pagination;
