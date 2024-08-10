import { Container } from "./styled.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  getCategory,
  getStockTrackedProducts,
} from "../../network/request/supabase.js";
import supabase from "../../network/request/supabase.js";

export default function InventoryManagement() {
  const navigate = useNavigate();

  const { data: categories } = useQuery("categories", getCategory);
  const { data: products } = useQuery(
    "stock-products",
    getStockTrackedProducts,
  );

  const [curTab, setCurTab] = useState(0);
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const currentDate = new Date().toISOString().split("T")[0];
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const formattedYesterday = yesterdayDate.toISOString().split("T")[0];

      const { data: yesterdayData } = await supabase
        .from("stock")
        .select("*")
        .eq("date", formattedYesterday);

      const { data: todayData } = await supabase
        .from("stock")
        .select("*")
        .eq("date", currentDate);

      const initialData = products[curTab]?.product.map((product) => {
        const yesterdayStock = yesterdayData?.find(
          (stock) => stock.product_id === product.id,
        ) || { remaining_stock: 0 };

        const todayStock = todayData?.find(
          (stock) => stock.product_id === product.id,
        );

        if (!todayStock) {
          const newStock = {
            product_id: product.id,
            date: currentDate,
            previous_stock: yesterdayStock.remaining_stock,
            received_stock: 0,
            sales_count: 0,
            remaining_stock: yesterdayStock.remaining_stock,
            actual_stock: 0,
            difference: 0,
          };

          supabase.from("stock").insert(newStock).then();
          return newStock;
        } else {
          return {
            ...todayStock,
            previous_stock: yesterdayStock.remaining_stock,
            remaining_stock:
              yesterdayStock.remaining_stock +
              todayStock.received_stock -
              todayStock.sales_count,
            difference:
              yesterdayStock.remaining_stock +
              todayStock.received_stock -
              todayStock.sales_count -
              todayStock.actual_stock,
          };
        }
      });

      setInventoryData(initialData);
    };

    if (products && products[curTab]?.product?.length > 0) {
      loadData();
    }
  }, [products, curTab]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...inventoryData];
    updatedData[index][field] = parseInt(value) || 0;

    if (field === "actual_stock") {
      updatedData[index].difference =
        updatedData[index].remaining_stock - updatedData[index].actual_stock;
    } else if (field === "received_stock") {
      updatedData[index].remaining_stock =
        updatedData[index].previous_stock +
        updatedData[index].received_stock -
        updatedData[index].sales_count;
      updatedData[index].difference =
        updatedData[index].remaining_stock - updatedData[index].actual_stock;
    }

    setInventoryData(updatedData);
  };

  const handleFocus = (index, field) => {
    const updatedData = [...inventoryData];
    if (updatedData[index][field] === 0) {
      updatedData[index][field] = "";
      setInventoryData(updatedData);
    }
  };

  const handleSave = async () => {
    try {
      for (const item of inventoryData) {
        const payload = {
          product_id: item.product_id,
          date: new Date().toISOString().split("T")[0],
          previous_stock: item.previous_stock,
          received_stock: item.received_stock || 0,
          sales_count: item.sales_count || 0,
          remaining_stock: item.remaining_stock || 0,
          actual_stock: item.actual_stock || 0,
          difference: item.difference || 0,
        };

        await supabase
          .from("stock")
          .upsert(payload, { onConflict: ["product_id", "date"] });
      }
      alert("재고 데이터가 저장되었습니다.");
    } catch (error) {
      console.error("재고 데이터를 저장하는데 실패했습니다.", error);
      alert("재고 데이터를 저장하는데 실패했습니다.");
    }
  };

  return (
    <Container>
      <div className="back-btn" onClick={() => navigate(-1)}>
        뒤로가기
      </div>
      <h1>재고 관리</h1>
      <select value={curTab} onChange={(e) => setCurTab(e.target.value)}>
        {categories &&
          categories.map((category, index) => (
            <option key={index} value={index}>
              {category.name}
            </option>
          ))}
      </select>

      <table>
        <thead>
          <tr>
            <td>제품</td>
            <td>이전 재고</td>
            <td>입고</td>
            <td>판매</td>
            <td>잔여 재고</td>
            <td>실재고</td>
            <td>차이</td>
          </tr>
        </thead>
        <tbody>
          {inventoryData &&
            inventoryData.map((item, i) => (
              <tr key={i}>
                <td>
                  {
                    products[curTab]?.product.find(
                      (p) => p.id === item.product_id,
                    )?.name
                  }
                </td>
                <td>{item.previous_stock}</td>
                <td>
                  <input
                    type="number"
                    value={item.received_stock}
                    onFocus={() => handleFocus(i, "received_stock")}
                    onChange={(e) =>
                      handleInputChange(i, "received_stock", e.target.value)
                    }
                  />
                </td>
                <td>{item.sales_count}</td>
                <td>{item.remaining_stock}</td>
                <td>
                  <input
                    type="number"
                    value={item.actual_stock}
                    onFocus={() => handleFocus(i, "actual_stock")}
                    onChange={(e) =>
                      handleInputChange(i, "actual_stock", e.target.value)
                    }
                  />
                </td>
                <td>{item.difference}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={handleSave}>저장</button>
    </Container>
  );
}
