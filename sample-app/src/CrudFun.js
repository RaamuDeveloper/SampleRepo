import React, { useEffect, useState } from "react";

const CrudFun = () => {
  const [id, setID] = useState("");
  const [List, setList] = useState([]);
  const [empData, setEmpData] = useState({
    empName: "",
    empCompany: "",
  });

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res = await fetch("http://localhost:3000/data");
    let getData = await res.json();
    setList(getData);
  };
  const postData = async (nam, com) => {
    let resp = await fetch("http://localhost:3000/data/", {
      method: "POST",
      body: JSON.stringify({
        name: nam,
        company: com,
      }),
      headers: { "content-type": "application/json" },
    });
    await resp.json();
    getData();
    Reset();
  };
  const putData = async (i, n, c) => {
    let url = `http://localhost:3000/data/${i}`;
    let res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        name: n,
        company: c,
      }),
      headers: { "content-type": "application/json" },
    });
    await res.json();
    getData();
    Reset();
  };
  const Reset = () => {
    setID("");
    setEmpData({
      empCompany: "",
      empName: "",
    });
  };
  const rowClick = (d) => {
    setEmpData({
      empName: d.name,
      empCompany: d.company,
    });
    setID(d.id);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setEmpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteData = async (data) => {
    let url = `http://localhost:3000/data/${data.id}`;
    await fetch(url, { method: "delete" });
    getData();
  };

  return (
    <div>
      <h1>Employee details</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Company</th>
        </tr>

        {List.length
          ? List.map((data) => {
              return (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.company}</td>
                  <td>
                    <button onClick={() => rowClick(data)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => deleteData(data)}>Delete</button>
                  </td>
                </tr>
              );
            })
          : "No Data Found"}
      </table>
      <hr />
      Employee Name
      <input
        value={empData.empName}
        onChange={(e) => handleChange(e)}
        name="empName"
      />
      Company Name{" "}
      <input
        value={empData.empCompany}
        onChange={(e) => handleChange(e)}
        name="empCompany"
      />
      <br />
      <hr />
      <button onClick={() => postData(empData.empName, empData.empCompany)}>
        Add
      </button>
      <button onClick={() => putData(id, empData.empName, empData.empCompany)}>
        Update
      </button>
    </div>
  );
};

export default CrudFun;
