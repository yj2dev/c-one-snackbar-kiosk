import { Container } from "./styled.js";

const TabSection = ({ product, curTab, setCurTab }) => {
  const onClickTab = (e) => {
    setCurTab(e.target.value);
  };
  return (
    <Container>
      <ul>
        {product?.length > 0 &&
          product.map((v, i) => (
            <li
              key={i}
              className={i === curTab ? "active" : ""}
              value={i}
              onClick={onClickTab}
            >
              {v.name}
            </li>
          ))}
      </ul>
    </Container>
  );
};

export default TabSection;
