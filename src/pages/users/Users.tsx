import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { getUsers } from "../../http/api";
import { User } from "../../store";

const Users = () => {
  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getUsers();
      return res.data;
    },
  });

  return (
    <>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          { title: <NavLink to={"/"}>Home</NavLink> },
          { title: <NavLink to={"/users"}>Users</NavLink> },
        ]}
      />
      {isLoading && <div>Loading...</div>}
      {usersData && (
        <ul>
          {usersData?.result.map((user: User) => {
            return (
              <li key={user._id}>
                {user.firstName} {user.lastName}
              </li>
            );
          })}
        </ul>
      )}

      {isError && <div>{error.message}</div>}
    </>
  );
};

export default Users;
