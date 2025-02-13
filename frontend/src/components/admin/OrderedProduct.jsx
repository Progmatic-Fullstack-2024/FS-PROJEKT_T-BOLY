export default function OrderedProduct({ product }) {
  return (
    <tr>
      <td>{product.product.name}</td>
      <td>
        <img src={product.product.pictureUrl} alt="" className="w-8 h-8" />
      </td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
    </tr>
  );
}
