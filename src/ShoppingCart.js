export default function ShoppingCart({ shoppingItems }) {
  return (
    <>
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Player name</th>
            <th>Player price</th>
          </tr>
        </thead>
        <tbody>
          {shoppingItems.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Sum total:</td>
            <td>{shoppingItems.reduce((acc, cur) => acc + +cur.price, 0)}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
