import React, { useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cards from "./Cards";

const Result = ({ setData, data }) => {
  const [searchParams] = useSearchParams();
  const [notFound, setNotFound] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  // variables for implementing pagination
  const ItemsPerPage = 9;
  const pagesVisted = pageNumber * ItemsPerPage;
  const pageCount = Math.ceil(data.length / ItemsPerPage);
  const changePage = ({ selected }) => setPageNumber(selected);
  
  //slicing the data according to pagination
  const displayItems = data
    .slice(pagesVisted, pagesVisted + ItemsPerPage)
    .map((item) => (
      <div key={item.id} className="col">
        <Cards desc={item.alt_description} imageUrl={item.urls.small} />
      </div>
    ));

  //get the data when out search parameter change
  useEffect(() => {
    const key = process.env.REACT_APP_KEY;
    let lookup = searchParams.get("search") || "dogs";
    let url = `https://api.unsplash.com/search/photos/?query=${lookup}&per_page=60&client_id=${key}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.results.length < 1 ? setNotFound(true) : setNotFound(false);
        return setData(data.results);
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

  useEffect(() => {
  }, []);
  
  
  return (
    <>
{show && <Alert variant="warning" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>You can double click the image to donwload it</Alert.Heading>

      </Alert>}
      <section className="gallery  min-vh-100">
        <div className="container-lg p-3">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            {notFound ? (
              <div className="m-auto my-5">
                <h4>No results found..</h4>
                <Button onClick={() => navigate(-1)}>Go back</Button>
              </div>
            ) : (
              <>{displayItems}</>
            )}
          </div>
        </div>
      </section>
      <footer>
        {!notFound ? (
          <div className="paginate">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginatedContainer"}
              previousLinkClassName={"previousButton"}
              nextLinkClassName={"nextButton"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        ) : (
          null
        )}
      </footer>
    </>
  );
};

export default Result;
