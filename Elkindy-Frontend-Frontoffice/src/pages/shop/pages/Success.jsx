import axios from 'axios'
import { Button } from 'bootstrap'
import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function Success() {

    const [searchParams] = useSearchParams()
    useEffect(()=>{
        axios
        .post(`http://localhost:9090/api/order/payement/${searchParams.get("payement_id")}`)
        .then(res=>{
         })
         .catch(err=>{
              console.log(err)
          })
    })

  return (
    <>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet" />
        <style>
          {`
            body {
              text-align: center;
              padding: 40px 0;
              background: #EBF0F5;
            }
            h1 {
              color: #88B04B;
              font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
              font-weight: 900;
              font-size: 40px;
              margin-bottom: 10px;
            }
            p {
              color: #404F5E;
              font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
              font-size: 20px;
              margin: 0;
            }
            i {
              color: #9ABC66;
              font-size: 100px;
              line-height: 200px;
              margin-left: -15px;
            }
            .card {
              background: white;
              padding: 60px;
              border-radius: 4px;
              box-shadow: 0 2px 3px #C8D0D8;
              display: inline-block;
              margin: 0 auto;
            }
          `}
        </style>
      </head>
      <body>
        <div className="card">
          <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }}>
            <i className="checkmark">✓</i>
          </div>
          <h1>Success</h1> 
          <p>Payement done with Success<br/> see you soon!</p>
          <Link to="/">
          <button style={{backgroundColor:'green', color:"white", borderRadius:"20px", padding:"5px"}}>Back to Home</button>{' '}
          </Link>
        </div>
      </body>
    </html>
    </>
  )
}

export default Success