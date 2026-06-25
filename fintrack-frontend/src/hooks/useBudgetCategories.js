import { useState, useEffect } from "react";
import api from "../api/axios";

const useBudgetCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api.get("/budgets", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log("Raw budgets response:", res.data);
        setCategories(res.data.map((b) => b.category));
      })
      .catch((err) => {
        console.log("Budget fetch error:", err);
      });
  }, []);

  return categories;
};

export default useBudgetCategories;