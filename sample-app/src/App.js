import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      empName: "",
      empCompany: "",
      List: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    let res = await fetch("http://localhost:3000/data");
    let getData = await res.json();
    console.log("getData", getData);
    this.setState({
      List: getData,
    });
  };
  postData = async (nam, com) => {
    let resp = await fetch("http://localhost:3000/data/", {
      method: "post",
      body: JSON.stringify({
        name: nam,
        company: com,
      }),
      headers: { "content-type": "application/json" },
    });
    let postData = await resp.json();
    this.getData();
    this.reset();
  };
  putData = async (i, n, c) => {
    let url = `http://localhost:3000/data/${i}`;
    let res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        name: n,
        company: c,
      }),
      headers: { "content-type": "application/json" },
    });
    let putData = await res.json();
    console.log("putData", putData);
    this.getData();
    this.reset();
  };
  rowClick = (d) => {
    this.setState({
      id: d.id,
      empName: d.name,
      empCompany: d.company,
    });
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  deleteData = async (data) => {
    let url = `http://localhost:3000/data/${data.id}`;
    await fetch(url, { method: "delete" });
    this.getData();
  };
  reset = () => {
    this.setState({
      id: "",
      empCompany: "",
      empName: "",
    });
  };
  render() {
    return (
      <div>
        <h1>Employee details</h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Company</th>
          </tr>

          {this.state.List.length
            ? this.state.List.map((data, i) => {
                return (
                  <tr>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.company}</td>
                    <td>
                      <button onClick={() => this.rowClick(data)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => this.deleteData(data)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "No Data Found"}
        </table>
        <hr />
        Employee Name
        <input
          value={this.state.empName}
          onChange={this.handleChange}
          name="empName"
        />
        Company Name{" "}
        <input
          value={this.state.empCompany}
          onChange={this.handleChange}
          name="empCompany"
        />
        <br />
        <hr />
        <button
          onClick={() =>
            this.postData(this.state.empName, this.state.empCompany)
          }
        >
          Add
        </button>
        <button
          onClick={() =>
            this.putData(
              this.state.id,
              this.state.empName,
              this.state.empCompany
            )
          }
        >
          Update
        </button>
      </div>
    );
  }
}

export default App;
