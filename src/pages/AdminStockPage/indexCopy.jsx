import { Container } from "./styled.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getCategory,
  getStockTrackedProducts,
} from "../../network/request/supabase.js";
import supabase from "../../network/request/supabase.js";

const StockItem = ({ stock }) => {
  const [prevStock, setPrevStock] = useState(0);
  const [incomeStock, setIncomeStock] = useState(0);
  const [seles, setSeles] = useState(0);
  const [remainingStock, setRemainingStock] = useState(0);
  const [actualStock, setActualStock] = useState(0);
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    setPrevStock(0);
    setIncomeStock(0);
    setSeles(0);
    setRemainingStock(0);
    setActualStock(0);
    setDiff(0);
  }, []);

  const onSubmit = (productId) => {
    console.log(productId);
  };

  return (
    <>
      <tr>
        <td>
          {stock.name} / {}
        </td>
        <td>{prevStock}</td>
        <td>{incomeStock}</td>
        <td>{seles}</td>
        <td>{remainingStock}</td>
        <td>{actualStock}</td>
        <td>{diff}</td>
        <td>
          <button onClick={() => onSubmit(stock.id)}>저장</button>
        </td>
      </tr>
    </>
  );
};

export default function InventoryManagement() {
  const navigate = useNavigate();

  const { data: categories } = useQuery("categories", getCategory);
  const { data: product } = useQuery("stock-products", getStockTrackedProducts);

  const [stockProduct, setStockProduct] = useState([]);

  const [curTab, setCurTab] = useState(0);

  useEffect(() => {
    const productIdList =
      product?.[curTab]?.product?.length > 0 &&
      product?.[curTab]?.product?.map((v) => v.id);

    console.log("productIdList >> ", productIdList);
  }, [curTab]);

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
            <td>저장</td>
          </tr>
        </thead>
        <tbody>
          {product &&
            product?.[curTab]?.product?.length > 0 &&
            product?.[curTab]?.product?.map((stock) => (
              <StockItem stock={stock} />
            ))}
        </tbody>
      </table>
    </Container>
  );
}
