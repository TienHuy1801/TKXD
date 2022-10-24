import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'reactstrap';
import APIS from '../../services/common';
import { initData } from '../../stores/constant';
import { alertService } from '../Alert/alert.service';
import Loading from '../Loading';
import style from './person-detail.module.scss';
import styleTop from '../HouseholdDetail/household-detail.module.scss';
import EditPerson from './EditPerson';
import Registration from './Registration';
import Death from './Death';
import userStore from '../../stores/userStore';

const PersonDetail = (all) => {
  const { personId } = all.match.params;
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const [topComp, setTopComp] = useState(0);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const data = await APIS.people.getPersonDetail(personId);
        setPerson(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alertService.error(error?.response?.data);
      }
    };
    fetchPerson();
  }, [personId]);

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
            className={styleTop['background']}
            onClick={() => setTopComp(0)}
          ></div>
          {topComp === 1 ? (
            <EditPerson setTopComp={setTopComp} person={person} />
          ) : topComp === 2 ? (
            <Registration setTopComp={setTopComp} personId={personId} />
          ) : topComp === 3 ? (
            <Death setTopComp={setTopComp} person={person} />
          ) : (
            <></>
          )}
        </>
      );
  };

  const deleteAPI = async () => {
    try {
      const mess = await APIS.people.deletePerson(personId);
      alertService.success(mess.data);
      window.location.replace('/people');
    } catch (error) {
      alertService.success(error?.response?.data);
    }
  };
  const DeletePerson = () => {
    return (
      <>
        <div
          className={styleTop['background']}
          onClick={() => setConfirm(false)}
        ></div>
        <div className={styleTop['popup']}>
          <p className={styleTop['popup_title']}>
            Bạn có chắc chắn muốn xóa không?
          </p>
          <div className={styleTop['popup_btn']}>
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
  else
    return (
      <>
        {confirm ? <DeletePerson /> : <></>}
        <TopComp />
        {person ? (
          <>
            <div className={style['detail']}>
              <div className={style['detail_title']}>Thông tin cá nhân</div>
              <div className={style['detail_content']}>
                <div className={style['detail_content_name']}>
                  {person?.name}
                </div>
                <div className={style['detail_content_basic']}>
                  Biệt danh:{' '}
                  <span className={style['detail_content_column_infor']}>
                    {person?.aliases}
                  </span>
                </div>
                <div className={style['detail_content_basic']}>
                  Giới tính:{' '}
                  <span className={style['detail_content_column_infor']}>
                    {initData.genderPerson[person?.gender]}
                  </span>
                </div>
                <div className={style['detail_content_basic']}>
                  Trạng thái:{' '}
                  <span className={style['detail_content_column_infor']}>
                    {initData.notePerson[person?.note]}
                  </span>
                </div>
                <div className={style['detail_content_column']}>
                  Ngày sinh:{' '}
                  <span className={style['detail_content_column_infor']}>
                    {validDate(person?.dateOfBirth)}
                  </span>
                </div>
                <div className={style['detail_content_column']}>
                  Nơi sinh:{' '}
                  <span className={style['detail_content_column_infor']}>
                    {person?.birthPlace}
                  </span>
                </div>
                <div className={style['detail_content_column']}>
                  Dân tộc:{' '}
                  <span className={style['detail_content_column_infor']}>
                    {person?.nation}
                  </span>
                </div>
                <div className={style['detail_content_column']}>
                  CMND/CCCD:{' '}
                  <span className={style['detail_content_column_infor']}>
                    {person?.identity?.numberIdentity}
                  </span>
                </div>
                <div className={style['detail_content_column']}>
                  Nơi cấp:{' '}
                  <span className={style['detail_content_column_infor']}>
                    {person?.identity?.placeOfIssue}
                  </span>
                </div>
                <div className={style['detail_content_column']}>
                  Ngày cấp:{' '}
                  <span className={style['detail_content_column_infor']}>
                    {validDate(person?.identity?.dateOfIssue)}
                  </span>
                </div>
                <div className={style['detail_content_column']}>
                  Công việc:{' '}
                  <span className={style['detail_content_column_infor']}>
                    {person?.job}
                  </span>
                </div>
                <div className={style['detail_content_column']}>
                  Địa chỉ làm việc:{' '}
                  <span className={style['detail_content_column_infor']}>
                    {person?.jobAddress}
                  </span>
                </div>
                <div className={style['detail_content_resident']}>
                  <span style={{ fontSize: '20px', fontWeight: '700' }}>
                    Lịch sử thường trú:
                  </span>{' '}
                  <Table striped>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Địa chỉ</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {person?.residencyHistory?.map((his, id) => (
                        <tr key={id}>
                          <td>{id + 1}</td>
                          {his.place?.length > 20 ? (
                            <td>{his.place.slice(0, 20) + '...'}</td>
                          ) : (
                            <td>{his.place}</td>
                          )}
                          <td>{validDate(his.date)}</td>
                          {his.note?.length > 20 ? (
                            <td>{his.note.slice(0, 20) + '...'}</td>
                          ) : (
                            <td>{his.note}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
              {person?.note === 3 || userStore.userDetail.role > 1 ? (
                <></>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '20px 0',
                  }}
                >
                  <Button
                    className="btn-react"
                    color="secondary"
                    onClick={() => setTopComp(1)}
                  >
                    Chỉnh sửa nhân khẩu
                  </Button>
                  <Button
                    className="btn-react"
                    color="secondary"
                    onClick={() => setTopComp(2)}
                  >
                    Đăng ký tạm trú, tạm vắng
                  </Button>
                  <Button
                    className="btn-react"
                    color="secondary"
                    onClick={() => setTopComp(3)}
                  >
                    Khai tử
                  </Button>
                  <Button
                    className="btn-react"
                    color="danger"
                    onClick={() => setConfirm(true)}
                  >
                    Xóa nhân khẩu
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={style['none']}>Nhân khẩu không tồn tại</div>
        )}
      </>
    );
};

export default PersonDetail;
