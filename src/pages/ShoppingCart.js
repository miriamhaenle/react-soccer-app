import styled from 'styled-components';

export default function ShoppingCart({ shoppingCart }) {
  const totalSum = shoppingCart.transferSum;
  const formatedSum = (sum) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(sum);
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
          {shoppingCart.players.map((orderLine, index) => (
            <tr key={orderLine.player._id}>
              <td>{orderLine.player.name}</td>
              <td>{formatedSum(orderLine.player.price)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Sum total:</td>
            <td>{formatedSum(totalSum)}</td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
}
const Table = styled.table`
  margin: 0 auto;
  border-collapse: collapse;
  border-radius: 0.5rem;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 90%;
  max-width: 45rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  td,
  th {
    text-align: left;
    padding: 0.75rem 0.9rem;
  }
  th,
  tfoot {
    padding: 0.75rem;
  }

  th {
    background: hsl(160, 5%, 40%);
  }
  th:first-child {
    border-top-left-radius: 0.5rem;
  }
  th:last-child {
    border-top-right-radius: 0.5rem;
  }

  thead tr {
    color: hsl(160, 10%, 96%);
  }
  tbody tr {
    border-bottom: 1px solid hsl(160, 5%, 90%);
  }
  tbody tr:nth-of-type(even) {
    background-color: hsl(160, 5%, 90%);
  }
  tbody tr:last-of-type {
    border-bottom: 2px solid hsl(160, 50%, 50%);
  }
  tfoot td {
    border-top: 2px solid hsl(160, 5%, 90%);
    font-size: 1.25rem;
    padding: 0.75rem 0.9rem;
    font-weight: bold;
    color: hsl(160, 50%, 50%);
  }
`;
