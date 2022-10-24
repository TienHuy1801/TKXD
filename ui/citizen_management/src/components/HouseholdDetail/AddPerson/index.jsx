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
import { initData } from '../../../stores/constant';
import { alertService } from '../../Alert/alert.service';
import style from '../top-comp.module.scss';

const AddPerson = ({ setTopComp, householdId }) => {
  const [name, setName] = useState('');
  const [aliases, setAliases] = useState('');
  const [gender, setGender] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState();
  const [birthPlace, setBirthPlace] = useState('');
  const [nation, setNation] = useState('');
  const [job, setJob] = useState('');
  const [jobAddress, setJobAddress] = useState('');
  const [relationship, setRelationship] = useState(1);
  const [note, setNote] = useState(0);
  const [numberIdentity, setNumberIdentity] = useState('');
  const [dateOfIssue, setDateOfIssue] = useState();
  const [placeOfIssue, setPlaceOfIssue] = useState('');

  const addPerson = async (e) => {
    e.preventDefault();
    if (!name || !dateOfBirth || !birthPlace) {
      alertService.error('Cần điền đủ các trường cần thiết');
    } else
      try {
        const mess = await APIS.people.addPerson({
          householdId: householdId,
          name: name,
          aliases: aliases,
          gender: gender,
          dateOfBirth: dateOfBirth,
          birthPlace: birthPlace,
          nation: nation,
          job: job,
          note: note,
          jobAddress: jobAddress,
          relationship: relationship,
          numberIdentity: numberIdentity,
          dateOfIssue: dateOfIssue,
          placeOfIssue: placeOfIssue,
        });
        alertService.success(mess.data);
        window.location.reload();
      } catch (error) {
        alertService.error(error?.response?.data);
      }
  };

  return (
    <>
      <Form className={style['top-comp']} style={{ width: '80%', left: '10%' }}>
        <div className={style['top-comp_title']}>
          <span>Thêm nhân khẩu vào hộ</span>
          <IoCloseOutline
            size={26}
            className={style['top-comp_title--icon']}
            onClick={() => setTopComp(0)}
          />
        </div>
        <FormGroup row>
          <InputGroup>
            <Label sm={1} className={style['require']}>
              Họ và tên
            </Label>
            <Col sm={3}>
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></Input>
            </Col>
            <Col sm={1}></Col>
            <Label sm={1}>Biệt danh</Label>
            <Col sm={2}>
              <Input
                type="text"
                onChange={(e) => setAliases(e.target.value)}
              ></Input>
            </Col>
            <Col sm={1}></Col>
            <Label sm={1} className={style['require']}>
              Giới tính
            </Label>
            <Col sm={1}>
              <Input
                type="select"
                onChange={(e) => setGender(parseInt(e.target.value))}
              >
                {initData.genderPerson.map((gender, index) => {
                  return (
                    <option key={index} value={index}>
                      {gender}
                    </option>
                  );
                })}
              </Input>
            </Col>
          </InputGroup>
        </FormGroup>

        <FormGroup row>
          <InputGroup>
            <Label sm={2} className={style['require']}>
              Quan hệ với chủ hộ
            </Label>
            <Col sm={2}>
              <Input
                type="select"
                onChange={(e) => setRelationship(parseInt(e.target.value))}
              >
                {initData.relationPerson.map((rela, index) => {
                  if (index !== 0)
                    return (
                      <option key={index} value={index}>
                        {rela}
                      </option>
                    );
                  else return <></>;
                })}
              </Input>
            </Col>

            <Col sm={1}></Col>
            <Label sm={1}>Dân tộc</Label>
            <Col sm={2}>
              <Input
                type="text"
                onChange={(e) => setNation(e.target.value)}
              ></Input>
            </Col>

            <Col sm={1}></Col>
            <Label sm={1} className={style['require']}>
              Trạng thái
            </Label>
            <Col sm={1} style={{ width: '12.21%' }}>
              <Input type="select" onChange={(e) => setNote(e.target.value)}>
                {initData.notePerson.map((note, index) => {
                  if (index === 0 || index === 1)
                    return (
                      <option key={index} value={index}>
                        {note}
                      </option>
                    );
                  else return <></>;
                })}
              </Input>
            </Col>
          </InputGroup>
        </FormGroup>

        <FormGroup row style={{ marginTop: '30px' }}>
          <InputGroup>
            <Col sm={1}></Col>
            <Label sm={1} className={style['require']}>
              Ngày sinh
            </Label>
            <Col sm={2}>
              <Input
                type="date"
                onChange={(e) => setDateOfBirth(e.target.value)}
              ></Input>
            </Col>
            <Label sm={1}></Label>
            <Label sm={1} className={style['require']}>
              Nơi sinh
            </Label>
            <Col sm={5}>
              <Input
                type="text"
                onChange={(e) => setBirthPlace(e.target.value)}
              ></Input>
            </Col>
          </InputGroup>
        </FormGroup>

        <FormGroup row style={{ marginTop: '30px' }}>
          <InputGroup>
            <Col sm={1}></Col>
            <Label sm={1}>Công việc</Label>
            <Col sm={2}>
              <Input
                type="text"
                onChange={(e) => setJob(e.target.value)}
              ></Input>
            </Col>
            <Label sm={1}></Label>
            <Label sm={2}>Địa chỉ làm việc</Label>
            <Col sm={4}>
              <Input
                type="text"
                onChange={(e) => setJobAddress(e.target.value)}
              ></Input>
            </Col>
          </InputGroup>
        </FormGroup>

        <FormGroup row style={{ marginTop: '30px' }}>
          <InputGroup>
            <Label sm={2}>Số CMND/CCCD</Label>
            <Col sm={2}>
              <Input
                type="text"
                onChange={(e) => setNumberIdentity(e.target.value)}
              ></Input>
            </Col>
            <Label sm={1} style={{ marginLeft: '20px' }}>
              Ngày cấp
            </Label>
            <Col sm={2}>
              <Input
                type="date"
                onChange={(e) => setDateOfIssue(e.target.value)}
              ></Input>
            </Col>
            <Label sm={1} style={{ marginLeft: '20px' }}>
              Nơi cấp
            </Label>
            <Col sm={3}>
              <Input
                type="text"
                onChange={(e) => setPlaceOfIssue(e.target.value)}
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
            onClick={addPerson}
          >
            Thêm nhân khẩu
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddPerson;
