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
import style from '../../HouseholdDetail/top-comp.module.scss';

const EditPerson = ({ person, setTopComp }) => {
  const [name, setName] = useState(person.name);
  const [aliases, setAliases] = useState(person.aliases);
  const [gender, setGender] = useState(person.gender);
  const [dateOfBirth, setDateOfBirth] = useState(person.dateOfBirth);
  const [birthPlace, setBirthPlace] = useState(person.birthPlace);
  const [nation, setNation] = useState(person.nation);
  const [note, setNote] = useState(person.note);
  const [job, setJob] = useState(person.job);
  const [jobAddress, setJobAddress] = useState(person.jobAddress);
  const [relationship, setRelationship] = useState(person.relationship);
  const [numberIdentity, setNumberIdentity] = useState(
    person.identity.numberIdentity
  );
  const [dateOfIssue, setDateOfIssue] = useState(person.identity.dateOfIssue);
  const [placeOfIssue, setPlaceOfIssue] = useState(
    person.identity.placeOfIssue
  );

  const editPerson = async (e) => {
    e.preventDefault();
    if (!name || !dateOfBirth || !birthPlace) {
      alertService.error('Cần điền đủ các trường cần thiết');
    } else
      try {
        const mess = await APIS.people.editPerson(person._id, {
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

  const validDate = (date) => {
    const d = new Date(date);
    var res;
    if (d.getDate() > 9)
      res = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    else
      res = d.getFullYear() + '-' + (d.getMonth() + 1) + '-0' + d.getDate();
    return res.toString();
  };

  return (
    <>
      <Form className={style['top-comp']} style={{ width: '80%', left: '10%' }}>
        <div className={style['top-comp_title']}>
          <span>Chỉnh sửa thông tin</span>
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
            <Col
              sm={3}
            >
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></Input>
            </Col>

            <Col sm={1}></Col>
            <Label sm={1}>
              Biệt danh
            </Label>
            <Col sm={2}>
              <Input
                type="text"
                onChange={(e) => setAliases(e.target.value)}
                value={aliases}
              ></Input>
            </Col>
            
            <Col sm={1}></Col>
            <Label
              sm={1}
              className={style['require']}
            >
              Giới tính
            </Label>
            <Col sm={1}>
              <Input
                type="select"
                onChange={(e) => setGender(parseInt(e.target.value))}
                value={gender}
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
                value={relationship}
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
            <Label sm={1}></Label>
            <Label sm={1}>Dân tộc</Label>
            <Col sm={2}>
              <Input
                type="text"
                onChange={(e) => setNation(e.target.value)}
                value={nation}
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
                value={validDate(dateOfBirth)}
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
                value={birthPlace}
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
                value={job}
              ></Input>
            </Col>
            <Label sm={1}></Label>
            <Label sm={2}>Địa chỉ làm việc</Label>
            <Col sm={4}>
              <Input
                type="text"
                onChange={(e) => setJobAddress(e.target.value)}
                value={jobAddress}
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
                value={numberIdentity}
              ></Input>
            </Col>
            <Label sm={1} style={{ marginLeft: '20px' }}>
              Ngày cấp
            </Label>
            <Col sm={2}>
              <Input
                type="date"
                onChange={(e) => setDateOfIssue(e.target.value)}
                value={validDate(dateOfIssue)}
              ></Input>
            </Col>
            <Label sm={1} style={{ marginLeft: '20px' }}>
              Nơi cấp
            </Label>
            <Col sm={3}>
              <Input
                type="text"
                onChange={(e) => setPlaceOfIssue(e.target.value)}
                value={placeOfIssue}
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
            onClick={editPerson}
          >
            Chỉnh sửa nhân khẩu
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditPerson;
