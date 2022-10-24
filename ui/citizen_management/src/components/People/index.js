import React from 'react';
import DataGrid, {
  Column,
  Selection,
  Item,
  FilterRow,
  SearchPanel,
  Export,
  Button,
} from 'devextreme-react/data-grid';
import TabPanel from 'devextreme-react/tab-panel';
import ArrayStore from 'devextreme/data/array_store';
import config from 'devextreme/core/config';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
import DataSource from 'devextreme/data/data_source';
import { Link } from 'react-router-dom';
import deMessages from 'devextreme/localization/messages/vi.json';
import ruMessages from 'devextreme/localization/messages/vi.json';
import { locale, loadMessages } from 'devextreme/localization';
import { directions } from '../MoneyManagement/constant';
import peopleStore from './peopleStore.js';
import { observer } from 'mobx-react';
import { initData } from '../../stores/constant';
import Loading from '../Loading/index.jsx';

loadMessages(deMessages);
loadMessages(ruMessages);
locale(navigator.language || navigator.browserLanguage);

class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowIndex: -1,
    };
    this.grid = null;
    this.selectionChanged = this.selectionChanged.bind(this);
  }

  componentDidMount() {
    peopleStore.fetchResult();
  }

  selectionChanged(e) {
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

  render() {
    const store = peopleStore;

    if (store.isLoading) return <Loading />;

    return (
      <div id="main">
        <TabPanel id="tabPanel" deferRendering={false}>
          <Item title="Danh sách nhân khẩu">
            <DataGrid
              id="gridContainer"
              dataSource={store.peopleList.filter(p => p.note < 3)}
              keyExpr="_id"
              ref={(ref) => {
                this.grid = ref;
              }}
              onExporting={this.onExporting}
              onSelectionChanged={this.selectionChanged}
            >
              <SearchPanel visible={true} cssClass="search" />
              <FilterRow visible={true} />
              <Selection mode="single" />
              <Column
                caption="STT"
                cellRender={rowCount}
                cssClass="header"
                width={53}
              />
              <Column
                dataField="name"
                caption="Họ và tên"
                cssClass="header"
                cellRender={(params) => (
                  <Link to={`people/${params.data._id}`}>{params.value}</Link>
                )}
              />
              <Column
                dataField="household.apartmentNumber"
                caption="Số hộ khẩu"
                cssClass="header"
                cellRender={(params) => (
                  <Link to={`households/${params.data.household._id}`}>
                    {params.value}
                  </Link>
                )}
              />
              <Column
                dataField="identity.numberIdentity"
                caption="Số CMND"
                cssClass="header"
              />
              <Column
                dataField="household.place"
                caption="Nơi ở hiện tại"
                cssClass="header"
              />
              <Export enabled={true} />
            </DataGrid>
          </Item>
          <Item title="Tạm trú, tạm vắng">
            <DataGrid
              id="gridContainer"
              dataSource={store.peopleList.filter(p => p.note == 2)}
              keyExpr="_id"
              ref={(ref) => {
                this.grid = ref;
              }}
              onExporting={this.onExporting}
              onSelectionChanged={this.selectionChanged}
            >
              <SearchPanel visible={true} cssClass="search" />
              <FilterRow visible={true} />
              <Selection mode="single" />
              <Column
                caption="STT"
                cellRender={rowCount}
                cssClass="header"
                width={53}
              />
              <Column
                dataField="name"
                caption="Họ và tên"
                cssClass="header"
                cellRender={(params) => (
                  <Link to={`people/${params.data._id}`}>{params.value}</Link>
                )}
              />
              <Column
                dataField="identity.numberIdentity"
                caption="Số CMND"
                cssClass="header"
              />
              <Column
                dataField="residencyHistory"
                caption="Địa chỉ hiện tại"
                cssClass="header"
                cellRender={(params) => {
                  return params.value[params.value.length - 1].place
                }} 
              />
              <Column
                dataField="residencyHistory"
                caption="Ngày bắt đầu"
                cssClass="header"
                cellRender={(params) => {
                  const d = new Date(params.value[params.value.length - 1].date);
                  var res = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
                  return res
                }}
              />
              <Column
                dataField="residencyHistory"
                caption="Ghi chú"
                cssClass="header"
                cellRender={(params) => {
                  return params.value[params.value.length - 1].note
                }} 
              />
              <Export enabled={true} />
            </DataGrid>
          </Item>
          <Item title="Khai tử">
            <DataGrid
              id="gridContainer"
              dataSource={store.peopleList.filter(p => p.note === 3)}
              keyExpr="identity"
              onExporting={this.onExporting}
              onSelectionChanged={this.selectionChanged}
            >
              <SearchPanel visible={true} cssClass="search" />
              <FilterRow visible={true} />
              <Selection mode="single" />
              <Column
                caption="STT"
                cellRender={rowCount}
                cssClass="header"
                width={53}
              />
              <Column
                dataField="name"
                caption="Họ và tên"
                width={220}
                cssClass="header"
                cellRender={(params) => (
                  <Link to={`people/${params.data._id}`}>
                    {params.value}
                  </Link>
                )}
              />
              <Column
                dataField="deathReport.reportPerson.name"
                caption="Tên người khai tử"
                cssClass="header"
                cellRender={(params) => (
                  <Link to={`people/${params.data.deathReport.reportPerson._id}`}>
                    {params.value}
                  </Link>
                )}
              />
              <Column
                dataField="deathReport.deathReason"
                caption="Nguyên nhân tử vong"
                cssClass="header"
              />
              <Column
                dataField="deathReport.deathDay"
                caption="Ngày tử vong"
                cssClass="header"
                cellRender={(params) => {
                  const d = new Date(params.value);
                  var res = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
                  return <div>{res}</div>
                }}
              />
              <Column
                dataField="deathReport.deathPlace"
                caption="Nơi tử vong"
                cssClass="header"
              />
              <Export enabled={true} />
            </DataGrid>
          </Item>
        </TabPanel>
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
          'Danh sách nhân khẩu.xlsx'
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

export default observer(People);
