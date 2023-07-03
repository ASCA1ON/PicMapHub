import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Aman",
      image:
        "https://cdn.pixabay.com/photo/2023/06/26/13/41/wolf-8089783_1280.jpg",
      places: 3
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
