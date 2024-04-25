import React from 'react'

function Fail() {
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
              color: #E53E3E;
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
              color: #E53E3E;
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
            <i className="checkmark">✗</i>
          </div>
          <h1>Fail</h1> 
          <p>Sorry, something went wrong.<br/> Please try again later.</p>
        </div>
      </body>
    </html>
    </>
  )
}

export default Fail