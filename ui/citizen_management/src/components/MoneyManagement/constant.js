export const directions = {
  auto: {
    icon: 'rowfield',
    shading: true,
    position: {
      of: '#grid',
      my: 'right bottom',
      at: 'right bottom',
      offset: '-16 -16',
    },
  },
  up: {
    icon: 'rowfield',
    shading: true,
    direction: 'up',
    position: {
      of: '#grid',
      my: 'right bottom',
      at: 'right bottom',
      offset: '-16 -16',
    },
  },
  down: {
    icon: 'rowfield',
    shading: true,
    direction: 'down',
    position: {
      of: '.dx-datagrid-rowsview',
      my: 'right top',
      at: 'right top',
      offset: '-16 16',
    },
  },
};

export const states = [
  {
    id: 0,
    name: 'Theo hộ khẩu',
  },
  {
    id: 1,
    name: 'Theo nhân khẩu',
  },
];

export const cycle = [
  {
    type: 'days',
    name: 'Ngày',
  },
  {
    type: 'weeks',
    name: 'Tuần',
  },
  {
    type: 'months',
    name: 'Tháng',
  },
  {
    type: 'years',
    name: 'Năm',
  },
];

export const valueMap = {
  moneyType: {
    0: 'Theo hộ khẩu',
    1: 'Theo nhân khẩu',
    2: 'Đóng góp',
  },
  cycle: {
    days: 'ngày',
    weeks: 'tuần',
    months: 'tháng',
    years: 'năm',
  },
};
