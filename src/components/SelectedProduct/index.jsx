// import { useQuery } from "react-query";
// import { getSelectedProduct } from "../../network/request/supabase.js";
// import { useEffect, useState } from "react";
// import { Container } from "./styled.js";
//
// const SelectedProduct = (props) => {
//   const { data: selectedProduct } = useQuery(
//     "selectedProduct",
//     getSelectedProduct,
//   );
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [show, setShow] = useState(false);
//   useEffect(() => {
//     console.log("selectedProduct >> ", selectedProduct);
//   }, [selectedProduct]);
//
//   return (
//     <Container>
//       {show && (
//         <>
//           <input
//             type="text"
//             value={searchKeyword}
//             onChange={(e) => setSearchKeyword(e.target.value)}
//           />
//           <ul>
//             {selectedProduct &&
//               selectedProduct?.map((product) => <li>{product.name}</li>)}
//           </ul>
//         </>
//       )}
//     </Container>
//   );
// };
//
// export default SelectedProduct;
