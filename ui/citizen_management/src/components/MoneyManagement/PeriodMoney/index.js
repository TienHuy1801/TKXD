import React from 'react';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Lookup,
  Form,
  FilterRow,
  SearchPanel,
  Summary,
  TotalItem,
  Selection,
  Format,
  Export,
  RequiredRule,
  PatternRule,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import { states, cycle, directions } from '../constant.js';
import config from 'devextreme/core/config';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import { SelectBox } from 'devextreme-react/select-box';
import { Link } from 'react-router-dom';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import periodMoneyStore from './periodMoneyStore.js';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import './styles.css';
import userStore from '../../../stores/userStore.js';

const optionDirections = ['up'];
const notesEditorOptions = { height: 100 };

class PeriodMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowIndex: -1,
    };
    this.grid = null;
    this.selectionChanged = this.selectedChanged.bind(this);
    this.directionChanged = this.directionChanged.bind(this);
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
    this.onExporting = this.onExporting.bind(this);
  }

  componentDidMount() {
    periodMoneyStore.fetchResult();
  }

  selectedChanged(e) {
    this.setState({
      selectedRowIndex: e.component.getRowIndexByKey(e.selectedRowKeys[0]),
    });
  }

  directionChanged(e) {
    config({
      floatingActionButtonConfig: directions[e.selectedItem],
    });

    repaintFloatingActionButton();
  }

  editRow() {
    this.grid.instance.editRow(this.state.selectedRowIndex);
    this.grid.instance.deselectAll();
  }

  deleteRow() {
    this.grid.instance.deleteRow(this.state.selectedRowIndex);
    this.grid.instance.deselectAll();
  }

  addRow() {
    this.grid.instance.addRow();
    this.grid.instance.deselectAll();
  }

  render() {
    const { selectedRowIndex } = this.state;
    const store = periodMoneyStore;
    const data = toJS(store.moneyList);

    return (
      <div id="main">
        <span>Th??ng tin c??c kho???n thu</span>
        <div>
          <DataGrid
            dataSource={data}
            keyExpr="_id"
            ref={(ref) => {
              this.grid = ref;
            }}
            focusedRowEnabled={true}
            onExporting={this.onExporting}
            onRowUpdated={store.updateMoney.bind(store)}
            onRowInserted={store.addMoney.bind(store)}
            onRowRemoving={store.deleteMoney.bind(store)}
            onSelectionChanged={this.selectionChanged}
          >
            <SearchPanel visible={true} cssClass="search" />
            <FilterRow visible={true} />
            <Editing mode="popup">
              <Popup
                title="Kho???n thu"
                showTitle={true}
                width={700}
                height={580}
              />
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item dataField="name" isRequired={true} />
                  <Item dataField="amountOfMoney" isRequired={true} />
                  <Item
                    dataField="note"
                    editorType="dxTextArea"
                    colSpan={2}
                    editorOptions={notesEditorOptions}
                  />
                </Item>
                <Item
                  itemType="group"
                  caption="Ph???m vi"
                  colCount={2}
                  colSpan={2}
                >
                  <Item dataField="startDate" isRequired={true} />
                  <Item dataField="moneyType" isRequired={true} />
                </Item>
                <Item
                  itemType="group"
                  caption="Chu k???"
                  colCount={2}
                  colSpan={2}
                >
                  <Item dataField="cycle.value" isRequired={true} />
                  <Item dataField="cycle.type" isRequired={true} />
                </Item>
              </Form>
            </Editing>
            <Selection mode="single" />
            <Column
              caption="STT"
              cellRender={rowCount}
              cssClass="header"
              width={53}
            />
            <Column
              dataField="name"
              caption="T??n kho???n thu"
              cssClass="header header--name"
              cellRender={(params) => (
                <Link to={`/money/${params.data._id}`}>{params.value}</Link>
              )}
            />
            <Column
              dataField="startDate"
              dataType="date"
              caption="Ng??y b???t ?????u"
              cssClass="header"
            />
            <Column caption="Chu k???" cssClass="header header-2col">
              <Column
                dataField="cycle.value"
                caption="S??? l???n"
                cssClass="header"
              />
              <Column
                dataField="cycle.type"
                caption="Tr??n"
                cssClass="header"
              >
                <Lookup
                  dataSource={cycle}
                  valueExpr="type"
                  displayExpr="name"
                />
              </Column>
            </Column>
            <Column
              dataField="amountOfMoney"
              caption="S??? ti???n"
              cssClass="header header--money"
            >
              <RequiredRule />
              <PatternRule
                message={'S??? ti???n l???n h??n 0'}
                pattern={/^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/i}
              />
              <Format type="fixedPoint" />
            </Column>
            <Column
              dataField="moneyType"
              caption="Lo???i"
              cssClass="header"
            >
              <Lookup
                dataSource={states}
                valueExpr="id"
                displayExpr="name"
                maxLength={2}
              />
            </Column>
            <Column
              dataField="note"
              visible={false}
              caption="M?? t???"
              cssClass="header"
            />
            <Export enabled={true} />
            <Summary recalculateWhileEditing={true}>
              <TotalItem
                column="amountOfMoney"
                cssClass="sum-money"
                summaryType="sum"
                valueFormat="fixedPoint"
                displayFormat="{0}"
              />
            </Summary>
          </DataGrid>
          {userStore.userDetail.role < 3 && (
            <React.Fragment>
              <SpeedDialAction
                icon="add"
                label="Th??m kho???n thu"
                index={1}
                onClick={this.addRow}
              />
              <SpeedDialAction
                icon="trash"
                label="Xo?? kho???n thu"
                index={2}
                onClick={this.deleteRow}
                visible={
                  selectedRowIndex !== undefined && selectedRowIndex !== -1
                }
              />
              <SpeedDialAction
                icon="edit"
                label="Ch???nh s???a kho???n thu"
                index={3}
                onClick={this.editRow}
                visible={
                  selectedRowIndex !== undefined && selectedRowIndex !== -1
                }
              />
              <div>
                <SelectBox
                  dataSource={optionDirections}
                  defaultValue="up"
                  visible={false}
                  onSelectionChanged={this.directionChanged}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
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
          'C??c kho???n thu.xlsx'
        );
      });
    });
    e.cancel = true;
  }
}

const rowCount = function (info) {
  let index =
    info.component.pageIndex() * info.component.pageSize() +
    (info.row.rowIndex + 1);
  return <div>{index}</div>;
};

export default observer(PeriodMoney);
