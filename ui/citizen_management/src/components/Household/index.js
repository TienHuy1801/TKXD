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
import 'devextreme/dist/css/dx.light.css';
import config from 'devextreme/core/config';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import { SelectBox } from 'devextreme-react/select-box';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import householdStore from './householdStore.js';
import { Item } from 'devextreme-react/form';
import { directions } from './data';
import './styles.css';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import userStore from '../../stores/userStore.js';

const optionDirections = ['up'];

class Household extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowIndex: -1,
      isComponentVisible: false,
      info: '',
    };
    this.grid = null;
    this.selectionChanged = this.selectedChanged.bind(this);
    this.directionChanged = this.directionChanged.bind(this);
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
    this.onExporting = this.onExporting.bind(this);
    // this.myCommand=this.myCommand.bind(this)
  }

  componentDidMount() {
    householdStore.fetchResult();
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

  // myCommand = (e) => {
  //   let rows=this.grid.instance.getVisibleRows()
  //   let row=rows[this.state.selectedRowIndex]
  //   this.setState({
  //           isComponentVisible: !this.state.isComponentVisible,
  //           info:row.data
  //       });

  //   }

  // close=()=>{
  //     this.setState({
  //         isComponentVisible: !this.state.isComponentVisible

  // })}

  render() {
    const { selectedRowIndex } = this.state;
    const store = householdStore;
    const data = toJS(store.householdList);

    return (
      <div id="main">
        <span className="main-title">Danh sách hộ khẩu</span>
        <DataGrid
          dataSource={data}
          keyExpr="_id"
          ref={(ref) => {
            this.grid = ref;
          }}
          focusedRowEnabled={true}
          onExporting={this.onExporting}
          onRowUpdated={store.editHousehold.bind(store)}
          onRowInserted={store.createHousehold.bind(store)}
          onRowRemoving={store.deleteHousehold.bind(store)}
          onSelectionChanged={this.selectionChanged}
          columnAutoWidth={true}
          allowColumnResizing={true}
          allowColumnReordering={true}
        >
          <FilterRow visible={true} />
          <SearchPanel visible={true} />
          <Column
            caption="STT"
            cellRender={rowCount}
            cssClass="header"
            width={53}
          />

          <Column
            dataField="apartmentNumber"
            cssClass="header header--name"
            caption="Số hộ khẩu"
            width={150}
            cellRender={(params) => {
              return (
                <Link to={`/households/${params.data._id}`}>
                  {params.value}
                </Link>
              );
            }}
          ></Column>

          <Column
            dataField="head"
            cssClass="header header--name"
            caption="Họ và tên chủ hộ"
            width={200}
            cellRender={(params) => {
              return (
                <Link to={`/people/${params.data.headMember}`}>
                  {params.value}
                </Link>
              );
            }}
          ></Column>

          <Column
            dataField="place"
            cssClass="header header--name"
            caption="Địa chỉ"
          ></Column>

          <Editing
            // allowUpdating={true}
            // allowAdding={true}
            // allowDeleting={true}
            mode="popup"
          >
            <Popup title="Hộ khẩu" showTitle={true} width={700} height={300} />

            <Form>
              <Item
                dataField="apartmentNumber"
                isRequired={true}
                colCount={1}
                colSpan={2}
              />

              <Item
                dataField="place"
                isRequired={true}
                colCount={1}
                colSpan={2}
              />
            </Form>
          </Editing>
          <Selection mode="single" />
          {userStore.userDetail.role < 2 && (
            <React.Fragment>
              <SpeedDialAction
                icon="add"
                label="Thêm hộ khẩu"
                index={1}
                onClick={this.addRow}
              />
              <SpeedDialAction
                icon="trash"
                label="Xoá hộ khẩu"
                index={2}
                onClick={this.deleteRow}
                visible={
                  selectedRowIndex !== undefined && selectedRowIndex !== -1
                }
              />
              <SpeedDialAction
                icon="edit"
                label="Chỉnh sửa hộ khẩu"
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
          <Export enabled={true} />
        </DataGrid>
        {/* {this.state.isComponentVisible?
                <Move info={this.state.info} command={this.close}/>:null} */}
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
          'Danh sách hộ khẩu.xlsx'
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
export default observer(Household);
