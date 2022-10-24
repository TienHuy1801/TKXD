import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import APIS from '../../../services/common';
import { initData } from '../../../stores/constant';
import { alertService } from '../../Alert/alert.service';
import style from '../top-comp.module.scss';
import { IoCloseOutline } from 'react-icons/all';

const EditHousehold = ({ setTopComp, household, headMember, members }) => {
  const [apartmentNumber, setApartmentNumber] = useState(
    household.apartmentNumber
  );
  const [place, setPlace] = useState(household.place);
  const [head, setHead] = useState(headMember?._id || members[0]._id);
  const [relation, setRelation] = useState(1);
  const editHousehold = async (e) => {
    e.preventDefault();
    if (!place || !apartmentNumber) {
      alertService.error('Số hộ khẩu và địa chỉ là bắt buộc');
    } else
      try {
        var data = await APIS.household.editHousehold(household._id, {
          apartmentNumber: apartmentNumber,
          place: place,
          headMember: head,
          newRole: relation,
        });
        alertService.success(data.data);
        window.location.reload();
      } catch (error) {
        alertService.error(error?.response?.data);
      }
  };
  return (
    <>
      <Form className={style['top-comp']}>
        <div className={style['top-comp_title']}>
          <span>Chỉnh sửa thông tin hộ khẩu</span>
          <IoCloseOutline size={26} className={style['top-comp_title--icon']} onClick={() => setTopComp(0)}/>
        </div>
        <FormGroup>
          <Label htmlFor="apartmentNumber" className={style['top-comp_label']}>
            Số hộ khẩu
          </Label>
          <Input
            type="number"
            name="apartmentNumber"
            id="apartmentNumber"
            required
            value={apartmentNumber}
            onChange={(e) => setApartmentNumber(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="place" className={style['top-comp_label']}>
            Địa chỉ
          </Label>
          <Input
            type="text"
            name="place"
            id="place"
            required
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="headMember" className={style['top-comp_label']}>
            Chủ hộ
          </Label>
          <Input
            type="select"
            name="headMember"
            id="headMember"
            value={head}
            onChange={(e) => setHead(e.target.value)}
          >
            {headMember ? (
              <option value={headMember?._id}>{headMember?.name}</option>
            ) : (
              <></>
            )}
            {members.map((mem) => {
              return (
                <option key={mem._id} value={mem._id}>
                  {mem.name}
                </option>
              );
            })}
          </Input>
        </FormGroup>
        {head !== headMember?._id && headMember ? (
          <FormGroup>
            <Label htmlFor="newRelation" className={style['top-comp_label']}>
              Chọn quan hệ mới cho chủ hộ cũ
            </Label>
            <Input
              type="select"
              name="newRelation"
              id="newRelation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            >
              {initData.relationPerson.map((relation, index) => {
                if (index !== 0)
                  return (
                    <option key={index} value={index}>
                      {relation}
                    </option>
                  );
                else return <></>;
              })}
            </Input>
          </FormGroup>
        ) : (
          <></>
        )}
        <div className={style['top-comp_btn']}>
          <Button
            className="btn-react"
            color="secondary"
            type="button"
            onClick={editHousehold}
          >
            Chỉnh sửa
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditHousehold;
