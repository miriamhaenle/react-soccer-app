import styled from 'styled-components';

export default function ShoppingCart({ shoppingItems }) {
  const totalSum = shoppingItems.reduce((acc, cur) => acc + +cur.price, 0);
  const formatedSum = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(totalSum);

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
            <td>{formatedSum}</td>
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

  thead tr {
    background: hsl(160, 5%, 40%);
    color: hsl(160, 10%, 96%);
    border-radius: 0.5rem;
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
