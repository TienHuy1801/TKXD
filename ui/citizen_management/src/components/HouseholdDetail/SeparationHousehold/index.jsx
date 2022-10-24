import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from 'reactstrap';
import { initData } from '../../../stores/constant';
import style from '../top-comp.module.scss';
import { IoCloseOutline } from 'react-icons/all';
import householdStore from '../../Household/householdStore';
import { toJS } from 'mobx';
import { alertService } from '../../Alert/alert.service';
import APIS from '../../../services/common';

const SeparationHousehold = ({ members, setTopComp, householdId }) => {
  const store = householdStore;
  var households = toJS(store.householdList);

  useEffect(() => {
    if (!households) {
      householdStore.fetchResult();
      households = toJS(store.householdList);
    }
  }, [households]);

  const [apartmentNumber, setApartmentNumber] = useState();
  const [place, setPlace] = useState();
  const [newHouseholdId, setNewHouseholdId] = useState(null);
  const [status, setStatus] = useState('new');
  const [people, setPeople] = useState([]);
  useEffect(() => {
    if (people.length === 0)
      members.forEach((mem) => {
        var newElement = {
          check: false,
          id: mem._id,
          relationship: 1,
        };
        setPeople((old) => [...old, newElement]);
      });
  }, []);

  const changeCheck = (e, index) => {
    var newList = people;
    newList[index].check = e.target.checked;
    setPeople(newList);
  };
  const changeRela = (e, index) => {
    var newList = people;
    newList[index].relationship = parseInt(e.target.value);
    setPeople(newList);
  };
  const statusChange = (e) => {
    setStatus(e.target.value);
  };
  const separation = async () => {
    const peopleChecked = [];
    people.forEach((per) => {
      if (per.check) {
        peopleChecked.push({
          id: per.id,
          relationship: per.relationship,
        });
      }
    });
    if (!peopleChecked) {
      alertService.error('Chọn ít nhất một nhân khẩu');
    } else if (status === 'new') {
      if (!place || !apartmentNumber) {
        alertService.error('Địa chỉ và số hộ khẩu là bắt buộc');
      } else {
        try {
          const mess = await APIS.household.separationHousehold({
            people: peopleChecked,
            place: place,
            apartmentNumber: apartmentNumber,
          });
          alertService.success(mess.data);
          window.location.reload();
        } catch (error) {
          alertService.error(error?.response?.data);
        }
      }
    } else {
      if (!newHouseholdId) {
        alertService.error('Bạn phải chọn một hộ khẩu');
      } else {
        try {
          const mess = await APIS.household.separationHousehold({
            people: peopleChecked,
            householdId: newHouseholdId,
          });
          alertService.success(mess.data);
          window.location.reload();
        } catch (error) {
          alertService.error(error?.response?.data);
        }
      }
    }
  };

  return (
    <>
      <Form className={style['top-comp']}>
        <div className={style['top-comp_title']}>
          <span>Chọn nhân khẩu cần tách</span>
          <IoCloseOutline
            size={26}
            className={style['top-comp_title--icon']}
            onClick={() => setTopComp(0)}
          />
        </div>

        {members.map((mem, index) => {
          return (
            <div key={index}>
              <FormGroup check className={style['top-comp_person--name']}>
                <InputGroup>
                  <InputGroupText>
                    <Input
                      addon
                      type="checkbox"
                      onChange={(e) => changeCheck(e, index)}
                    />
                  </InputGroupText>
                  <Label style={{ width: '70%', margin: '5px 10px' }}>
                    {mem.name}
                  </Label>
                  <Input
                    type="select"
                    name="relation"
                    onChange={(e) => changeRela(e, index)}
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
                </InputGroup>
              </FormGroup>
            </div>
          );
        })}

        <FormGroup onChange={statusChange} className={style['input']}>
          <div>
            <Input type="radio" defaultChecked value="new" name="status" />
            <span className={style['input_span']}>Hộ khẩu mới</span>
          </div>
          <div>
            <Input type="radio" value="exist" name="status" />
            <span className={style['input_span']}>Thêm vào hộ khẩu có sẵn</span>
          </div>
        </FormGroup>
        {status === 'new' ? (
          <div className={style['input']}>
            <FormGroup style={{ width: '30%' }} row>
              <Label htmlFor="apartmentNumber" className={style['input_span']}>
                Số hộ khẩu
                <Input
                  type="number"
                  name="apartmentNumber"
                  id="apartmentNumber"
                  required
                  onChange={(e) => setApartmentNumber(e.target.value)}
                ></Input>
              </Label>
            </FormGroup>
            <FormGroup style={{ width: '70%' }}>
              <Label
                htmlFor="place"
                className={style['input_span']}
                style={{ width: '100%' }}
              >
                Địa chỉ
                <Input
                  type="text"
                  name="place"
                  id="place"
                  required
                  onChange={(e) => setPlace(e.target.value)}
                ></Input>
              </Label>
            </FormGroup>
          </div>
        ) : (
          <>
            <FormGroup>
              <Input
                type="select"
                name="household"
                id="household"
                onChange={(e) => setNewHouseholdId(e.target.value)}
              >
                <option value={null}></option>
                {households.map((household) => {
                  if (household._id.toString() != householdId.toString())
                    return (
                      <option key={household._id} value={household._id}>
                        {household.head} - {household.apartmentNumber} -{' '}
                        {household.place}
                      </option>
                    );
                  else return <></>;
                })}
              </Input>
            </FormGroup>
          </>
        )}
        <div className={style['top-comp_btn']}>
          <Button
            className="btn-react"
            color="secondary"
            type="button"
            onClick={separation}
          >
            Tách hộ khẩu
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SeparationHousehold;
