import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
} from 'reactstrap';
import APIS from '../../../services/common';
import { alertService } from '../../Alert/alert.service';
import style from '../../HouseholdDetail/top-comp.module.scss';

const Registration = ({ personId, setTopComp }) => {
  const [place, setPlace] = useState();
  const [note, setNote] = useState();
  const [date, setDate] = useState();

  const registrationPerson = async (e) => {
    e.preventDefault();
    if (!place || !date) {
      alertService.error('Cần điền đủ các trường cần thiết');
    } else
      try {
        const mess = await APIS.people.registerForTemporaryResidence(personId, {
          note: note,
          place: place,
          date: date,
        });
        alertService.success(mess.data);
        window.location.reload();
      } catch (error) {
        alertService.error(error?.response?.data.toString());
      }
  };

  return (
    <>
      <Form className={style['top-comp']}>
        <div className={style['top-comp_title']}>
          <span>Đăng ký tạm trú, tạm vắng</span>
          <IoCloseOutline
            size={26}
            className={style['top-comp_title--icon']}
            onClick={() => setTopComp(0)}
          />
        </div>
        <FormGroup row>
          <InputGroup>
            <Label
              sm={5}
              className={style['require']}
              style={{ marginBottom: '20px' }}
            >
              Nơi chuyển đến
            </Label>
            <Col sm={7}>
              <Input
                type="text"
                onChange={(e) => setPlace(e.target.value)}
              ></Input>
            </Col>

            <Label
              sm={5}
              className={style['require']}
              style={{ marginBottom: '20px' }}
            >
              Thời gian bắt đầu
            </Label>
            <Col sm={7}>
              <Input
                type="date"
                onChange={(e) => setDate(e.target.value)}
              ></Input>
            </Col>

            <Label sm={5}>Ghi chú</Label>
            <Col sm={7}>
              <Input
                type="text"
                onChange={(e) => setNote(e.target.value)}
              ></Input>
            </Col>
          </InputGroup>
        </FormGroup>
        <div
          className={style['top-comp_btn']}
          style={{ paddingTop: '10px', paddingBottom: '20px' }}
        >
          <Button
            className="btn-react"
            color="secondary"
            type="button"
            onClick={registrationPerson}
          >
            Đăng ký
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Registration;
