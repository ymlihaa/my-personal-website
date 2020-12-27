import React,{useState,useEffect} from "react";
import axios from "axios";
import Table from "./Table";
import { responsiveMap } from "antd/lib/_util/responsiveObserve";

function ListedExam() {



  return (
    <div className="w-100">
      <Table />
    </div>
  );
}
export default ListedExam;
