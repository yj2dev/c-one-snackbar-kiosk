import { Container } from "./styled.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getCategory,
  getStockTrackedProducts,
  updateProductQuantity,
  getDailySales,
} from "../../network/request/supabase.js";

export default function InventoryManagement() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 카테고리와 제품 데이터 가져오기
  const { data: categories } = useQuery("categories", getCategory);
  const { data: products } = useQuery(
    "stock-products",
    getStockTrackedProducts,
  );

  const [curTab, setCurTab] = useState(0);
  const [quantityChange, setQuantityChange] = useState({});

  // 현재 선택된 제품의 당일 판매량 가져오기
  const { data: dailySales, refetch: refetchDailySales } = useQuery(
    ["daily-sales", products?.[curTab]?.id],
    () => getDailySales(products[curTab]?.id),
    {
      enabled: !!products && products.length > 0,
    },
  );

  // 재고 업데이트 뮤테이션
  const updateStockMutation = useMutation(updateProductQuantity, {
    onSuccess: () => {
      queryClient.invalidateQueries("stock-products");
      refetchDailySales(); // 재고 업데이트 후 판매량을 다시 가져옴
      setQuantityChange({}); // 수량 변경 상태 초기화
    },
  });

  useEffect(() => {
    setQuantityChange({});
    if (products && products.length > 0) {
      refetchDailySales(); // 탭이 변경될 때마다 당일 판매량 새로고침
    }
  }, [curTab, products, refetchDailySales]);

  const handleQuantityChange = (productId, amount) => {
    setQuantityChange((prev) => {
      const newQuantity = (prev[productId] || 0) + amount;
      // 수량이 0 이하로 내려가지 않도록 처리
      if (newQuantity < 0) return prev;

      return {
        ...prev,
        [productId]: newQuantity,
      };
    });
  };

  const handleUpdateStock = (productId) => {
    const newQuantity =
      products[curTab].quantity + (quantityChange[productId] || 0);

    if (newQuantity < 0) {
      alert("재고는 0보다 작을 수 없습니다.");
      return;
    }

    updateStockMutation.mutate({
      productId,
      quantity: newQuantity,
    });
  };

  return (
    <Container>
      <div className="back-btn" onClick={() => navigate(-1)}>
        뒤로가기
      </div>
      <h1>재고 관리</h1>
      <h2>미완성</h2>
      <select
        value={curTab}
        onChange={(e) => setCurTab(Number(e.target.value))}
      >
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
            <td>현재 재고</td>
            <td>당일 판매량</td>
            <td>수량 변경</td>
            <td>업데이트</td>
          </tr>
        </thead>
        <tbody>
          {products &&
            products[curTab]?.product?.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity ?? 0}</td>
                <td>{dailySales ?? 0}</td>
                <td>
                  <button onClick={() => handleQuantityChange(product.id, -1)}>
                    -
                  </button>
                  <span>{quantityChange[product.id] || 0}</span>
                  <button onClick={() => handleQuantityChange(product.id, 1)}>
                    +
                  </button>
                </td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateStock(product.id)}
                  >
                    업데이트
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
}
