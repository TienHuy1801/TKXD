import React from 'react';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Button,
  Summary,
  TotalItem,
  Form,
  SearchPanel,
  FilterRow,
  Format,
  Selection,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Item } from 'devextreme-react/form';
import { Link } from 'react-router-dom';
import { valueMap } from '../constant.js';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import Loading from '../../Loading/index.jsx';
import moneyDetailStore from './moneyDetailStore.js';
import './styles.css';
import userStore from '../../../stores/userStore.js';

class MoneyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.onExporting = this.onExporting.bind(this);
  }

  componentDidMount() {
    const { moneyId } = this.props.match.params;
    moneyDetailStore.setMoneyId(moneyId);
    moneyDetailStore.fetchMoneyDetail();
  }

  render() {
    const store = moneyDetailStore;
    const moneyDetail = toJS(moneyDetailStore.moneyDetail);
    if (store.loading === true || moneyDetail === null) return <Loading />;

    return (
      <div id="table">
        <div className="infor">
          <span className="header">Thông tin chi tiết</span>
          <hr />
          <div className="detail">
            {moneyDetail.moneyType < 2 && (
              <React.Fragment>
                <div>Tên khoản thu: {moneyDetail.name}</div>
                <div>Phí cơ bản: {moneyDetail.amountOfMoney} đ</div>
                <div>
                  Chu kì: {moneyDetail.cycle.value}{' '}
                  {valueMap.cycle[moneyDetail.cycle.type]} / lần
                </div>
                <div>Loại thu: {valueMap.moneyType[moneyDetail.moneyType]}</div>
              </React.Fragment>
            )}
            {moneyDetail.moneyType === 2 && (
              <div>Tên khoản đóng góp: {moneyDetail.name}</div>
            )}
            <div>
              Ngày bắt đầu:{' '}
              {new Date(moneyDetail.startDate).toLocaleDateString()}
            </div>
            <div>Ghi chú: {moneyDetail.note}</div>
          </div>
        </div>
        <div className="header">Danh sách chi tiết</div>
        <hr />
        <DataGrid
          dataSource={moneyDetail.collectStatus}
          keyExpr="household"
          focusedRowEnabled={true}
          onExporting={this.onExporting}
          onRowUpdating={store.updateCollectStatus.bind(store)}
        >
          <Selection mode="single" />
          <SearchPanel visible={true} />
          <FilterRow visible={true} />
          <Editing mode="popup" allowUpdating={userStore.userDetail.role < 3 ? true : false}>
            <Popup title="Chi tiết" showTitle={true} width={700} height={300} />
            <Form>
              <Item itemType="group" colCount={2} colSpan={2}>
                <Item dataField="updateMoney" isRequired={true} />
                <Item dataField="paidDate" isRequired={true} />
              </Item>
            </Form>
          </Editing>
          <Column
            dataField="household.apartmentNumber"
            caption="Số hộ khẩu"
            cssClass="headerColumn"
            cellRender={(params) => (
              <Link to={`/households/${params.data.household._id}`}>
                {params.value}
              </Link>
            )}
            width={120}
          />
          <Column
            dataField="household.headMember.name"
            caption="Tên chủ hộ"
            cssClass="headerColumn textCol"
            cellRender={(params) => {
              if (!params.data.household.headMember) return 'Không có';
              return (
                <Link to={`/people/${params.data.household.headMember._id}`}>
                  {params.value}
                </Link>
              );
            }}
          />
          {moneyDetail.moneyType < 2 && (
            <Column caption="Số tiền" cssClass="headerColumn">
              <Column
                dataField="paidMoney"
                caption="Đã nộp"
                cssClass="headerColumn"
              >
                <Format type="fixedPoint" />
              </Column>
              <Column
                dataField="debtMoney"
                caption="Còn thiếu"
                cssClass="headerColumn"
                calculateCellValue={this.calculateValue}
              >
                <Format type="fixedPoint" />
              </Column>
            </Column>
          )}
          {moneyDetail.moneyType === 2 && (
            <Column
              dataField="paidMoney"
              caption="Tiền đóng góp"
              cssClass="headerColumn"
              width={160}
            >
              <Format type="fixedPoint" />
            </Column>
          )}
          <Column
            dataField="paidHistory[0].paidDate"
            dataType="date"
            caption={
              moneyDetail.moneyType === 2 ? 'Ngày vừa đóng góp' : 'Ngày vừa nộp'
            }
            width={210}
            cssClass="headerColumn textCol"
          />
          <Column
            dataField="paidDate"
            dataType="date"
            caption={
              moneyDetail.moneyType === 2 ? 'Ngày vừa đóng góp' : 'Ngày vừa nộp'
            }
            visible={false}
          />
          <Column
            dataField="updateMoney"
            visible={false}
            caption={moneyDetail.moneyType === 2 ? 'Tiền đóng góp' : 'Tiền nộp'}
          />
          {userStore.userDetail.role < 3 && (
            <Column type="buttons" visible={true} cssClass="header">
              <Button name="edit" icon="edit" />
            </Column>
          )}
          <Summary recalculateWhileEditing={true}>
            <TotalItem
              column="household"
              summaryType="count"
              displayFormat="{0} hộ"
              cssClass="textCol"
            />
            <TotalItem
              column="paidMoney"
              summaryType="sum"
              displayFormat="{0}"
              valueFormat="fixedPoint"
            />
            <TotalItem
              column="debtMoney"
              summaryType="sum"
              displayFormat="{0}"
              valueFormat="fixedPoint"
            />
          </Summary>
        </DataGrid>
      </div>
    );
  }

  calculateValue(rowData) {
    return rowData.totalRequiredMoney - rowData.paidMoney;
  }

  onExporting(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          `${toJS(moneyDetailStore.moneyDetail).name}.xlsx`
        );
      });
    });
    e.cancel = true;
  }
}

export default observer(MoneyDetail);
