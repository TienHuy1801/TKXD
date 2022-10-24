import { useEffect, useState } from 'react';
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
import Loading from '../../Loading';

const Death = ({ person, setTopComp }) => {
  const [reportPersonId, setReportPersonId] = useState();
  const [deathReason, setDeathReason] = useState();
  const [deathPlace, setDeathPlace] = useState();
  const [deathDay, setDeathDay] = useState();

  const [household, setHousehold] = useState(null);
  const [headMember, setHeadMember] = useState(null);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHousehold = async () => {
      try {
        var data = await APIS.household.getHouseholdDetail(person.household._id);
        setHousehold(data.data);
      } catch (error) {
        setLoading(false);
        alertService.error(error?.response?.data);
      }
    };
    fetchHousehold();
  }, []);
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

  const deathPerson = async (e) => {
    e.preventDefault();
    if (!deathReason || !deathPlace || !deathDay || !reportPersonId) {
      alertService.error('Cần điền đủ các trường cần thiết');
    } else
      try {
        const data = await APIS.people.reportDeath(person._id, {
          reportPersonId: reportPersonId,
          deathReason: deathReason,
          deathPlace: deathPlace,
          deathDay: deathDay,
        });
        alertService.success('Khai tử thành công');
        window.location.reload();
      } catch (error) {
        alertService.error(error?.response?.data.toString());
      }
  };

  if (loading)
    return (
      <div className={style['top-comp']}>
        <Loading />
      </div>
    );
  else {
    return (
      <>
        <Form className={style['top-comp']}>
          <div className={style['top-comp_title']}>
            <span>Khai tử</span>
            <IoCloseOutline
              size={26}
              className={style['top-comp_title--icon']}
              onClick={() => setTopComp(0)}
            />
          </div>
          <FormGroup row>
            <InputGroup>
              <Label
                sm={4}
                className={style['require']}
                style={{ marginBottom: '20px' }}
              >
                Người khai báo
              </Label>
              <Col sm={8}>
                <Input
                  type="select"
                  value={reportPersonId}
                  onChange={(e) => setReportPersonId(e.target.value)}
                >
                  <option value={null}></option>
                  {headMember &&
                  headMember._id.toString() != person._id.toString() ? (
                    <option value={headMember?._id}>{headMember?.name}</option>
                  ) : (
                    <></>
                  )}
                  {members.map((mem) => {
                    if (mem._id.toString() != person._id.toString())
                      return (
                        <option key={mem._id} value={mem._id}>
                          {mem.name}
                        </option>
                      );
                    else return <></>;
                  })}
                </Input>
              </Col>
              <Label
                sm={4}
                className={style['require']}
                style={{ marginBottom: '20px' }}
              >
                Nguyên nhân mất
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  onChange={(e) => setDeathReason(e.target.value)}
                ></Input>
              </Col>

              <Label
                sm={4}
                className={style['require']}
                style={{ marginBottom: '20px' }}
              >
                Ngày mất
              </Label>
              <Col sm={8}>
                <Input
                  type="date"
                  onChange={(e) => setDeathDay(e.target.value)}
                ></Input>
              </Col>

              <Label sm={4} className={style['require']}>
                Địa điểm mất
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  onChange={(e) => setDeathPlace(e.target.value)}
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
              onClick={deathPerson}
            >
              Khai báo
            </Button>
          </div>
        </Form>
      </>
    );
  }
};

export default Death;
