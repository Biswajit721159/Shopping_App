import { useState } from "react";

function New() {
  let [arr, setarr] = useState([
    { name: "Biswajit", address: "Malam" },
    { name: "shikar", address: "delhi" },
    { name: "rohit", address: "Mumbai" },
  ]);

  let [data, setdata] = useState([
    {
      author: "reuters.com",
      title:
        "Monday's EU-US trade talks overshadowed by tax concerns on climate measure",
      description:
        "COLLEGE PARK, Md., Dec 5 (Reuters) - Top European Union officials intend to complain loudly to their U.S. counterparts at a trade meeting on Monday about the bloc's electric vehicles being cut off from tax credits in U.S. President Joe Biden's signature clima…",
      url: "https://biztoc.com/x/d367f6a40f5a53c8",
      urlToImage: "https://c.biztoc.com/p/d367f6a40f5a53c8/og.webp",
      publishedAt: "2022-12-05T06:16:04Z",
      content:
        "COLLEGE PARK, Md., Dec 5 (Reuters) - Top European Union officials intend to complain loudly to their U.S. counterparts at a trade meeting on Monday about the bloc's electric vehicles being cut off fr… [+1033 chars]",
    },
  ]);

  let [name, setname] = useState("");
  let [address, setaddress] = useState("");
  function submit() {
    arr.push({ name, address });
    setarr([...arr]);
  }

  function Delete(index) {
    let narr = arr.filter((item, ind) => {
      return index !== ind;
    });
    setarr([...narr]);
  }

  return (
    <div className="container">
      <input
        className="containe mt-4"
        placeholder="enter your name"
        value={name}
        onChange={(e) => {
          setname(e.target.value);
        }}
      />
      <br></br>
      <input
        className="containe mt-3"
        placeholder="enter your Address"
        value={address}
        onChange={(e) => {
          setaddress(e.target.value);
        }}
      />
      <br></br>
      <button className="containe mt-3" onClick={submit}>
        Submit
      </button>
      <table className="table table-secondary table-striped-columns mt-4">
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Delete/Edit</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((item, ind) => (
            <tr key={ind}>
              <th scope="row">{ind}</th>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>
                {" "}
                <button className="btn btn-danger" onClick={(e) => Delete(ind)}>
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
          {data.map((item, ind) => (
            <th>
              <tr>{item.author}</tr>
              <tr>{item.title}</tr>
              <tr>{item.description}</tr>
              <tr><a url={item.url}></a></tr>
              <tr>{item.publishedAt}</tr>
              <tr>{item.content}</tr>
            </th>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default New;
