import styled from 'styled-components';

export default function ShoppingCart({ shoppingItems }) {
  return (
    <>
      <h2>Shopping Cart</h2>
      <Table>
        <thead>
          <tr>
            <th>Player name</th>
            <th>Player price</th>
          </tr>
        </thead>
        <tbody>
          {shoppingItems.map((item, index) => (
            <tr key={index}>
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
      </Table>
    </>
  );
}

const Table = styled.table`
  margin: 0 auto;
  border-collapse: collapse;

  td,
  th {
    padding: 0.3rem;
    text-align: left;
  }

  td:last-child {
    border-left: 2px solid hsl(160, 5%, 90%);
  }

  tfoot {
    font-weight: bold;
  }
  tfoot td {
    border-top: 2px solid hsl(160, 5%, 90%);
  }
`;
