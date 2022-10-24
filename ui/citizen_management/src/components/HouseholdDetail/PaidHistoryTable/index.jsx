import { Form, Table } from 'reactstrap';
import style from '../top-comp.module.scss';

const PaidHistoryTable = ({ focusedMoney }) => {
  const validDate = (date) => {
    const d = new Date(date);
    var res = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    return <>{res}</>;
  };

  return (
    <>
      <Form className={style['top-comp']}>
        <p className={style['top-comp_title']}>Lịch sử nộp khoản tiền {focusedMoney.money.name}</p>
          <Table striped>
            <thead>
              <tr>
                <th>STT</th>
                <th>Số tiền (đ)</th>
                <th>Thời gian nộp tiền</th>
              </tr>
            </thead>
            <tbody>
              {focusedMoney.paidHistory.map((history, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{history.value}</td>
                  <td>{validDate(history.paidDate)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
      </Form>
    </>
  );
};

export default PaidHistoryTable;
