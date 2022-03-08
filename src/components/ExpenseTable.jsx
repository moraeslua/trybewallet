import React, { Component } from 'react';
import './ExpenseTable.css';

class ExpenseTable extends Component {
  render() {
    const expenseTableFields = [
      'Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir',
    ];

    return (
      <section>
        <div className="table">
          {expenseTableFields.map((field) => <th key={ field }>{field}</th>)}
        </div>
      </section>
    );
  }
}

export default ExpenseTable;
