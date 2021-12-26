import * as React from "react";
import "./styles.css";

export default function App() {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [session, setSession] = React.useState(0);
  const f = async () => {
    const res = await fetch(`https://reqres.in/api/users?page=${page}`);
    const json = await res.json();
    setUsers(json.data);
  };
  React.useEffect(() => {
    f();
  });
  const nextUser = async () => {
    f();
    if (page > 1) {
      setPage(2);
    } else {
      setPage(page + 1);
    }
  };
  const backUser = async () => {
    f();
    if (page < 2) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  };

  return (
    <div className="App">
      <h1>Hello ReqRes users!</h1>
      <div className="flex">
        {users.length &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <p>
                  <strong>{user.first_name}</strong>
                </p>
                <p>{user.email}</p>
                <img alt="" key={user.avatar} src={user.avatar} />
              </div>
            );
          })}
      </div>
      <button onClick={backUser}>Back</button>
      <button onClick={nextUser}>Next</button>
    </div>
  );
}
