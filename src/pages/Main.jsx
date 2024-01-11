import { React, useEffect, useState } from "react";
import BoardList from "../components/BoardList/BoardList";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Login from "../components/Login/Login";

const Main = () => {
  return (
    <>
      <Login />
    </>
  );
};
export default Main;