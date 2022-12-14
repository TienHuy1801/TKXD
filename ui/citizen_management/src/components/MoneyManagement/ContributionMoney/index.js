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
import contributionMoneyStore from './contributionMoneyStore.js';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import '../PeriodMoney/styles.css';
import userStore from '../../../stores/userStore.js';

const optionDirections = ['up'];
const notesEditorOptions = { height: 100 };

class ContributionMoney extends React.Component {
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
    contributionMoneyStore.fetchResult();
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

  onInitNewRow(e) {
    e.data.moneyType = 2;
  }

  render() {
    const { selectedRowIndex } = this.state;
    const store = contributionMoneyStore;
    const data = toJS(store.moneyList);

    return (
      <div id="contribute">
        <span>Th??ng tin c??c ????ng g??p, ???ng h???</span>
        <div>
          <DataGrid
            dataSource={data}
            keyExpr="_id"
            ref={(ref) => {
              this.grid = ref;
            }}
            focusedRowEnabled={true}
            onInitNewRow={this.onInitNewRow}
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
                title="Kho???n ????ng g??p, ???ng h???"
                showTitle={true}
                width={700}
                height={380}
              />
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item dataField="name" isRequired={true} />
                  <Item dataField="startDate" isRequired={true} />
                  <Item
                    dataField="note"
                    editorType="dxTextArea"
                    colSpan={2}
                    editorOptions={notesEditorOptions}
                  />
                </Item>
              </Form>
            </Editing>
            <Selection mode="single" />
            <Column
              caption="STT"
              cellRender={rowCount}
              cssClass="header"
              width={60}
            />
            <Column
              dataField="name"
              caption="T??n kho???n ???ng h???"
              cssClass="header header--name"
              cellRender={(params) => (
                <Link to={`/money/${params.data._id}`}>{params.value}</Link>
              )}
            />
            <Column
              dataField="startDate"
              caption="Ng??y b???t ?????u"
              cssClass="header"
              dataType="date"
            />
            <Column dataField="moneyType" visible={false} />
            <Column dataField="note" caption="Ch?? th??ch" cssClass="header" />
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
                label="Th??m kho???n ???ng h???"
                index={1}
                onClick={this.addRow}
              />
              <SpeedDialAction
                icon="trash"
                label="Xo?? kho???n ???ng h???"
                index={2}
                onClick={this.deleteRow}
                visible={
                  selectedRowIndex !== undefined && selectedRowIndex !== -1
                }
              />
              <SpeedDialAction
                icon="edit"
                label="Ch???nh s???a kho???n ???ng h???"
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
          'C??c kho???n ???ng h???.xlsx'
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

export default observer(ContributionMoney);
