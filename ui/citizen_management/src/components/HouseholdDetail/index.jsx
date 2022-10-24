import React, { useEffect, useState } from 'react';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Button as DataGridBtn,
  Form,
  SearchPanel,
  FilterRow,
  Format,
  Selection,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import { Link } from 'react-router-dom';
import APIS from '../../services/common';
import { initData } from '../../stores/constant';
import { alertService } from '../Alert/alert.service';
import Loading from '../Loading';
import style from './household-detail.module.scss';
import { Button, Table } from 'reactstrap';
import EditHousehold from './EditHousehold';
import SeparationHousehold from './SeparationHousehold';
import PaidHistoryTable from './PaidHistoryTable';
import AddPerson from './AddPerson';
import userStore from '../../stores/userStore';

const HouseholdDetail = (all) => {
  const { householdId } = all.match.params;
  const [household, setHousehold] = useState(null);
  const [headMember, setHeadMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [focusedMoney, setFocusedMoney] = useState(null);
  const [loading, setLoading] = useState(true);

  const [topComp, setTopComp] = useState(0);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const fetchHousehold = async () => {
      try {
        var data = await APIS.household.getHouseholdDetail(householdId);
        setHousehold(data.data);
      } catch (error) {
        setLoading(false);
        alertService.error(error?.response?.data);
      }
    };
    fetchHousehold();
  }, [householdId]);
  useEffect(() => {
    if (household && loading) {
      const fetchPeople = async () => {
        try {
          if (household.headMember) {
            var data = await APIS.people.getPersonDetail(household.headMember);
            setHeadMember(data.data);
          }
          household.members.forEach(async (mem) => {
            var data = await APIS.people.getPersonDetail(mem._id);
            setMembers((oldMem) => [...oldMem, data.data]);
          });
          setLoading(false);
        } catch (error) {
          setLoading(false);
          alertService.error(error?.response?.data);
        }
      };
      fetchPeople();
    }
  }, [household]);

  const validDate = (date) => {
    const d = new Date(date);
    var res = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    return <>{res}</>;
  };

  const TopComp = () => {
    if (topComp === 0) return <></>;
    else
      return (
        <>
          <div
            className={style['background']}
            onClick={() => setTopComp(0)}
          ></div>
          {topComp === 1 ? (
            <AddPerson setTopComp={setTopComp} householdId={householdId} />
          ) : topComp === 2 ? (
            <EditHousehold
              setTopComp={setTopComp}
              household={household}
              headMember={headMember}
              members={members}
            />
          ) : topComp === 3 ? (
            <SeparationHousehold
              members={members}
              setTopComp={setTopComp}
              householdId={householdId}
            />
          ) : topComp === 4 ? (
            <PaidHistoryTable focusedMoney={focusedMoney} />
          ) : (
            <></>
          )}
        </>
      );
  };

  const deleteAPI = async () => {
    try {
      const mess = await APIS.household.deleteHousehold(householdId);
      alertService.success(mess.data);
      window.location.replace('/households');
    } catch (error) {
      alertService.success(error?.response?.data);
    }
  };
  const DeleteHousehold = () => {
    return (
      <>
        <div
          className={style['background']}
          onClick={() => setConfirm(false)}
        ></div>
        <div className={style['popup']}>
          <p className={style['popup_title']}>
            Bạn có chắc chắn muốn xóa không?
          </p>
          <div className={style['popup_btn']}>
            <Button
              className="btn-react"
              color="danger"
              onClick={() => setConfirm(false)}
            >
              Không
            </Button>
            <Button
              className="btn-react"
              color="success"
              onClick={() => deleteAPI()}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </>
    );
  };

  if (loading) return <Loading />;
  else {
    return (
      <>
        {topComp !== 0 ? <TopComp /> : <></>}
        {confirm ? <DeleteHousehold /> : <></>}
        {household ? (
          <>
            <div className={style['detail']}>
              <div className={style['detail_title']}>Thông tin hộ khẩu</div>
              {household.headMember ? (
                <></>
              ) : (
                <p className={style['detail_alert']}>Chưa có chủ hộ</p>
              )}
              <div className={style['detail_content']}>
                <p>Số hộ khẩu: {household.apartmentNumber}</p>
                <p>Địa chỉ: {household.place}</p>
                <Table striped>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Họ và tên</th>
                      <th>Quan hệ với chủ hộ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {headMember ? (
                      <tr>
                        <td>1</td>
                        <td>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/people/${headMember._id}`}
                          >
                            {headMember?.name}
                          </Link>
                        </td>
                        <td>Chủ hộ</td>
                      </tr>
                    ) : (
                      <></>
                    )}
                    {members.map((mem, index) => (
                      <tr key={index}>
                        {headMember ? (
                          <td>{index + 2}</td>
                        ) : (
                          <td>{index + 1}</td>
                        )}
                        <td>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/people/${mem._id}`}
                          >
                            {mem.name}
                          </Link>
                        </td>
                        <td>{initData.relationPerson[mem.relationship]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {userStore.userDetail.role < 2 && (
                  <div className={style['detail_btn']}>
                    <Button
                      className="btn-react"
                      color="secondary"
                      onClick={() => setTopComp(1)}
                    >
                      Thêm nhân khẩu mới
                    </Button>
                    <Button
                      className="btn-react"
                      color="secondary"
                      onClick={() => setTopComp(2)}
                    >
                      Chỉnh sửa hộ khẩu
                    </Button>
                    <Button
                      className="btn-react"
                      color="secondary"
                      onClick={() => setTopComp(3)}
                    >
                      Tách hộ khẩu
                    </Button>
                    <Button
                      className="btn-react"
                      color="danger"
                      onClick={() => setConfirm(true)}
                    >
                      Xóa hộ khẩu
                    </Button>
                  </div>
                )}
              </div>
              <div className={style['detail_revenue']}>
                <p className={style['detail_title']}>
                  Thông tin nộp các khoản tiền định kỳ
                </p>
                <DataGrid
                  dataSource={household.paidStatus.filter(
                    (item) => item.money.moneyType < 2
                  )}
                  keyExpr="money._id"
                >
                  <Selection mode="single" />
                  <SearchPanel visible={true} />
                  <FilterRow visible={true} />
                  <Editing mode="popup" allowUpdating={true}>
                    <Popup
                      title="Nộp tiền"
                      showTitle={true}
                      width={700}
                      height={300}
                    />
                    <Form>
                      <Item itemType="group" colCount={2} colSpan={2}>
                        <Item dataField="updateMoney" isRequired={true} />
                        <Item dataField="paidDate" isRequired={true} />
                      </Item>
                    </Form>
                  </Editing>
                  <Column
                    dataField="money.name"
                    caption="Tên khoản tiền"
                    cssClass="headerColumn"
                    cellRender={(params) => (
                      <Link to={`/money/${params.data.money._id}`}>
                        {params.value}
                      </Link>
                    )}
                  />
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
                      visible={true}
                      calculateCellValue={(rowData) => {
                        return rowData.totalRequiredMoney - rowData.paidMoney;
                      }}
                    >
                      <Format type="fixedPoint" />
                    </Column>
                  </Column>
                  <Column
                    dataField="paidDate"
                    dataType="date"
                    caption="Ngày vừa nộp"
                    visible={false}
                  />
                  <Column
                    dataField="updateMoney"
                    visible={false}
                    caption="Tiền nộp"
                  />
                  <Column type="buttons" visible={true} cssClass="header">
                    <DataGridBtn
                      icon="fas fa-history"
                      onClick={(e) => {
                        setFocusedMoney(e.row.data);
                        setTopComp(4);
                      }}
                    />
                  </Column>
                </DataGrid>
              </div>
              <div className={style['detail_revenue']}>
                <p className={style['detail_title']}>
                  Thông tin nộp các khoản tiền đóng góp
                </p>
                <DataGrid
                  dataSource={household.paidStatus.filter(
                    (item) => item.money.moneyType == 2
                  )}
                  keyExpr="money._id"
                >
                  <Selection mode="single" />
                  <SearchPanel visible={true} />
                  <FilterRow visible={true} />
                  <Editing mode="popup" allowUpdating={true}>
                    <Popup
                      title="Nộp tiền"
                      showTitle={true}
                      width={700}
                      height={300}
                    />
                    <Form>
                      <Item itemType="group" colCount={2} colSpan={2}>
                        <Item dataField="updateMoney" isRequired={true} />
                        <Item dataField="paidDate" isRequired={true} />
                      </Item>
                    </Form>
                  </Editing>
                  <Column
                    dataField="money.name"
                    caption="Tên khoản tiền"
                    cssClass="headerColumn"
                    cellRender={(params) => (
                      <Link to={`/money/${params.data.money._id}`}>
                        {params.value}
                      </Link>
                    )}
                  />
                  <Column
                    dataField="paidMoney"
                    caption="Đã nộp"
                    cssClass="headerColumn"
                  >
                    <Format type="fixedPoint" />
                  </Column>
                  <Column
                    dataField="paidDate"
                    dataType="date"
                    caption="Ngày vừa nộp"
                    visible={false}
                  />
                  <Column
                    dataField="updateMoney"
                    visible={false}
                    caption="Tiền nộp"
                  />
                  <Column type="buttons" visible={true} cssClass="header">
                    <DataGridBtn
                      icon="fas fa-history"
                      onClick={(e) => {
                        setFocusedMoney(e.row.data);
                        setTopComp(4);
                      }}
                    />
                  </Column>
                </DataGrid>
              </div>
              <div className={style['detail_history']}>
                <p className={style['detail_title']}>Lịch sử thay đổi</p>
                <Table striped>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Ngày</th>
                      <th>Nội dung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {household.change.map((change, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{validDate(change.date)}</td>
                        <td>{change.content}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </>
        ) : (
          <div className={style['none']}>Hộ khẩu không tồn tại</div>
        )}
      </>
    );
  }
};

export default HouseholdDetail;
