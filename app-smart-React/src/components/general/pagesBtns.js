import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function PagesBtns(props) {
  const [pages,setPages] = useState(0);
  // 3 props needed
  // 1 -> apiUrl -> to get number of pages
  // 2-> linkTo -> link with the page number
  // 3-> cssClass of the buttons

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    try{
      const url = props.apiUrl;
      const resp = await axios.get(url);
      console.log(resp.data);
      setPages(resp.data.pages);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <span>Page: </span>
      {[...Array(pages)].map((item,i) => {
        return (
          <Link key={i} to={props.linkTo+(i+1)} className={props.cssClass}>{i+1}</Link>
        )
      })}
    </div>
  )
}
