import * as React from 'react';
import {Table} from 'baseui/table-semantic';


const SIZER = Array(5).fill(null);

const COLUMNS = ["Points Per Game", "Assist Per Game", "Rebounds Per Game", "Three Pointers Per Game", "Turn Over Per Game"]
const DATA = [[9.4, 10.9, 12, 13.7, 12.7, 14.6, 17.2, 15.8, 15.3, 20.5, 17.1, 21.1, 14.4, 16.2, 13.7, 14, 10.7, 11.9, 10.6],
[4.2, 4.3, 5.3, 6.5, 6.5, 6.1, 6, 5.4, 6.1, 6.3, 4.1, 6.4, 4.4, 6, 5.3, 5, 7.7, 6.7, 6.4],
[ 0.4,
    0.3,
    0.4,
    0.4,
    0.4,
    0.5,
    0.6,
    0.4,
    0.5,
    0.4,
    0,
    0.6,
    0.7,
    0.7,
    0.7,
    0.7,
    0.4,
    0.5,
    0.4],
[ 0.6,
    1.1,
    1,
    1,
    1,
    1.3,
    1.4,
    1.5,
    1.4,
    2.5,
    2,
    2.2,
    2,
    2.7,
    2.3,
    2.4,
    1.8,
    2,
    2.3],
[1.7, 1.7, 2.1, 2.2, 2, 2.4, 2.1, 2.2, 1.5, 2.3, 1.5, 1.9, 2, 1.9, 1.7, 1.2, 1.7, 1.5, 1.1]]

const overrides = {
  Root: {
    style: {
      maxHeight: '300px',
    },
  },
};

export default function Example({data}) {
  return (
    <Table overrides={overrides} columns={COLUMNS} data={DATA} />
  );
}