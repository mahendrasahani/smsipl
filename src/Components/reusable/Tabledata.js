import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Viewsvg from "../assests/view.svg";
import Cycle from "../assests/cycle.svg";
import { useSelector } from "react-redux";

const Tr = styled.tr`
  background:white;
  width:100%;
 border-bottom:2px solid rgba(237, 242, 247, 1);
 
 
>td{
  max-height:150px;
padding:0 15px;
font-family: Public Sans;
font-weight: 400;
line-height: 26px;
letter-spacing: 0em;
text-align: left;
color: rgba(112, 116, 120, 1);


 &:nth-child(4){
  >p{
    color:white;
    @media (max-width: 1550px) {
      padding:5px;
      display: block !important;
    }
   
  }
 
 }
 &:nth-child(5){
  display:flex;
  gap:5px;
 
  align-items: center;

  >button{
    background: rgba(116, 136, 249, 1);
    border-radius:5px;
    width:40px;
    height:40px;
    border:none;
    outline:none;
    box-shadow:none;
    >a img{
      text-decoration:none;
      font-size:22px;
      padding-top:3px;
    }
  }
 
 
}
 `;

const style1 = {
  padding: "5px 20px",
  borderRadius: "34px",
  height: "28px",
  width: "38px",
};

const Tabledata = (props) => {
  const items = useSelector((state) => state.Items.items);
  const [popupMessage, setMessage] = useState(null);

  const { Sno, date, status, statusdesc, message } = props;

  const DisplayMessage = (id) => {
    const filtermessage = items.filter((item) => {
      return item.id === id;
    });

    const parsedJson = JSON.parse(filtermessage[0].message);
    const formatted = JSON.stringify(parsedJson, null, 2);
  

    setMessage(formatted);
  };

  return (
    <>
      <tbody>
        <Tr className="table-inside">
          <td>
            <p>{Sno}</p>
          </td>
          <td>
            <p>{date.split("-").reverse().join("-")}</p>
          </td>
          <td>
            <p onClick={() => DisplayMessage(Sno)}>
              {message.slice(0, 200)}....
            </p>
          </td>
          <td style={{ textAlign: "center" }}>
            <p
              style={{
                ...style1,
                backgroundColor:
                  status === 4
                    ? "blue"
                    : status === 6
                    ? "green"
                    : status === 5
                    ? "purple"
                    : status === 7
                    ? "red"
                    : "black",
              }}
            ></p>
          </td>
          <td>
            {status === 4 ? (
              <button>
                <Link to={`messageDetails/${Sno}`}>
                  {" "}
                  <img src={Viewsvg} alt="viewimg" />
                </Link>
              </button>
            ) : (
              <button>
                <Link style={{ cursor: "context-menu", opacity: "0.4" }}>
                  <img src={Viewsvg} alt="viewimg" />
                </Link>
              </button>
            )}

            {status === 5 || status === 7 ? (
              <button>
                <Link to={`messageDetails/${Sno}`}>
                  <img src={Cycle} alt="Cycleimg" />
                </Link>
              </button>
            ) : (
              <button>
                <Link style={{ cursor: "context-menu", opacity: "0.4" }}>
                  <img src={Cycle} alt="Cycleimg" />
                </Link>
              </button>
            )}
          </td>
        </Tr>
      </tbody>

      {popupMessage ? (
        <div className="popup">
          <p onClick={() => setMessage(null)}>✖</p>
          <h1>Message Details</h1>

          <pre className="popup-message">{popupMessage}</pre>
        </div>
      ) : null}
    </>
  );
};

export default Tabledata;
