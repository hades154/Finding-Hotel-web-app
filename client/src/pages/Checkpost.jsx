import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Checkpost() {
  const [tableData, setTableData] = useState([]);
  return (
    <Wrapper>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="index">
        <div className="name">
          <h5>From:</h5>
          <input className="date1" type="date" />
          <h5 className="to">To:</h5>
          <input className="date2" type="date" />
          <button>Apply</button>
          <button className="addnew">Add new</button>
          <h5 className="sortby">Sort by:</h5>
          <select id="sort">
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="comment">Comment</option>
            <option value="like">Like</option>
          </select>
        </div>
        <div className="infor">
          <table>
            <tr>
              <th>Id</th>
              <th>Author</th>
              <th>Title</th>
              <th>Status</th>
              <th>Image</th>
              <th>Comment</th>
              <th>Date</th>
              <th>View Post</th>
              <th>Edit</th>
              <th>delete</th>
            </tr>
            <tr>
              <td>1</td>
              <td>ducchinhbg01</td>
              <td>Beauty homestay</td>
              <td>Published</td>
              <td>No</td>
              <td>10</td>
              <td>11/4/2022</td>
              <td>View post</td>
              <td>edit</td>
              <td>delete</td>
            </tr>
            <tr>
              <td>2</td>
              <td>dinhduong1906</td>
              <td>Expensive</td>
              <td>Draft</td>
              <td>No</td>
              <td>0</td>
              <td>18/4/2022</td>
              <td>View post</td>
              <td>edit</td>
              <td>delete</td>
            </tr>
            <tr>
              <td>3</td>
              <td>xuannhat1610</td>
              <td>homestay</td>
              <td>Published</td>
              <td>No</td>
              <td>20</td>
              <td>11/5/2022</td>
              <td>View post</td>
              <td>edit</td>
              <td>delete</td>
            </tr>
            <tr>
              <td>4</td>
              <td>tuanqb</td>
              <td>Cheap homestay</td>
              <td>Published</td>
              <td>No</td>
              <td>10</td>
              <td>22/4/2022</td>
              <td>View post</td>
              <td>edit</td>
              <td>delete</td>
            </tr>
          </table>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
table, th, td {
  // border: 1px solid;
  th{
    height:50px;
    background-color:#04AA6D;
    color: white;
  }
  td {
    text-align: center;
  }
  th, td {
    border-bottom: 1px solid #ddd;
  }
}
tr:hover {
  background-color: #C0C0C0;
  // background-color: yellow;
}
.index{
  position: relative;
  width:100%;
  height: 700px;
  background-color: white;
}
.img{
  position: absolute;
  width:300px;
  height: 300px;
  border: 0.5px solid #F5F5F5;
  background-color:#F8F8F8;
}
.infor{
  position: absolute;
  width:100%;
  height: 500px;
  top:200px;
  border: 0.5px solid #F5F5F5;
  // background-color: yellow;
}
.name{
  position: absolute;
  width:100%;
  height: 200px;
  
  border: 0.5px solid #F5F5F5;
  // background-color: yellow;
}
.input{
  position: absolute;
  width:842px;
  height: 400px;
  left:300px;
  top:300px;
  border: 0.5px solid #F5F5F5;
 
}
p{
  margin-left:15px;
  margin-top: 35px;
 
}
h5{
  position: absolute;
  margin-left:15px;
  margin-top: 35px;
 
}
.to{
  margin-left:280px;
  top: 0px;
}
.date1{
  position: absolute;
  left:100px;
  margin-top: 35px;
}
.date2{
  position: absolute;
  margin-left:350px;
  margin-top: 35px;
}
button{
  position: absolute;
  width:80px;
  height: 35px;
  top:140px;
  left:450px;
  color: white;
  border: 1px solid grey;
  border-radius: 10px;
  background-color: #228B22;
}
.addnew{
  position: absolute;
  margin-left:100px;
  background-color: #0000FF;
}
.sortby{
  position: absolute;
  top:60px;
}
table{
  position: absolute;
  width:90%;
  left:5%;
  border: 1px solid grey;
}
#sort{
  position: absolute;
  width:150px;
  top:100px;
  left: 100px;
}
  }
`;

export default Checkpost;
