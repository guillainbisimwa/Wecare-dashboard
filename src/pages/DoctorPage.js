import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { DoctorListHead, DoctorListToolbar } from '../sections/@dashboard/doctor';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phoneNumber', label: 'Phone Number', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'designation', label: 'Designation', alignRight: false },
  { id: 'practiceNumber', label: 'Practice Number', alignRight: false },
  { id: '' },
];

const USERLIST = [
  {
      location: {
          type: "Point",
          coordinates: [
              78.3680644,
              17.4571169
          ]
      },
      _id: "63ef54f6742aad31831f40be",
      name: "doctor1",
      email: "doctor1@wecare.com",
      phoneNumber: "0000000000",
      createdAt: "2023-02-17T10:20:38.259Z",
      updatedAt: "2023-04-11T16:08:58.908Z",
      __v: 1,
      address: "abcd",
      designation: "GP",
      practiceNumber: "abcd",
      esign: "data:image/png;base64,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",
      id: "63ef54f6742aad31831f40be"
  },
  {
      location: {
          type: "Point",
          coordinates: [
              78.3680644,
              17.4571169
          ]
      },
      _id: "6422ff3e10b8de2298e29ef3",
      name: "Mohit Singh",
      email: "mohitsingh2004245@gmail.com",
      phoneNumber: "7225965651",
      designation: "GP",
      createdAt: "2023-03-28T14:52:46.741Z",
      updatedAt: "2023-03-28T14:52:46.741Z",
      __v: 0,
      id: "6422ff3e10b8de2298e29ef3"
  },
  {
      location: {
          type: "Point",
          coordinates: [
              0,
              0
          ]
      },
      _id: "643577bff8362e038eeb5ef8",
      name: "DrWecare",
      email: "dr1@wecare.com",
      phoneNumber: "9999999999",
      designation: "GP",
      createdAt: "2023-04-11T15:07:43.987Z",
      updatedAt: "2023-04-11T15:07:43.987Z",
      __v: 0,
      id: "643577bff8362e038eeb5ef8"
  },
  {
      location: {
          type: "Point",
          coordinates: [
              0,
              0
          ]
      },
      _id: "64357925f8362e038eeb5f25",
      name: "dr3",
      email: "dr3@wecare.com",
      phoneNumber: "9999977777",
      designation: "GP",
      createdAt: "2023-04-11T15:13:41.417Z",
      updatedAt: "2023-04-11T15:13:41.417Z",
      __v: 0,
      id: "64357925f8362e038eeb5f25"
  },
  {
      location: {
          type: "Point",
          coordinates: [
              0,
              0
          ]
      },
      _id: "64357d99f8362e038eeb5f33",
      name: "dr4",
      email: "dr4@wecare.com",
      phoneNumber: "6666655555",
      designation: "GP",
      createdAt: "2023-04-11T15:32:41.932Z",
      updatedAt: "2023-04-11T15:32:41.932Z",
      __v: 0,
      id: "64357d99f8362e038eeb5f33"
  },
  {
      location: {
          type: "Point",
          coordinates: [
              0,
              0
          ]
      },
      _id: "643707a4a667683965e13e80",
      name: "dr5",
      email: "dr5@wecare.com",
      phoneNumber: "7777777777",
      designation: "GP",
      createdAt: "2023-04-12T19:33:56.224Z",
      updatedAt: "2023-04-12T19:33:56.224Z",
      __v: 0,
      id: "643707a4a667683965e13e80"
  },
  {
      location: {
          type: "Point",
          coordinates: [
              0,
              0
          ]
      },
      _id: "64370cbda667683965e13fb3",
      name: "dr6@wecare.com",
      email: "dr6@wecare.com",
      phoneNumber: "6666656666",
      designation: "GP",
      createdAt: "2023-04-12T19:55:41.943Z",
      updatedAt: "2023-04-12T19:55:51.808Z",
      __v: 0,
      address: "test",
      practiceNumber: "13",
      id: "64370cbda667683965e13fb3"
  },
  {
      location: {
          type: "Point",
          coordinates: [
              0,
              0
          ]
      },
      _id: "64370e22a667683965e13fbd",
      name: "dr7",
      email: "dr7@wecare.con",
      phoneNumber: "4444455555",
      designation: "GP",
      createdAt: "2023-04-12T20:01:38.599Z",
      updatedAt: "2023-04-12T20:01:50.107Z",
      __v: 0,
      address: "test",
      practiceNumber: "11",
      id: "64370e22a667683965e13fbd"
  },
  {
      location: {
          type: "Point",
          coordinates: [
              0,
              0
          ]
      },
      _id: "643939024bdff3757980f030",
      name: "dr8",
      email: "dr8@wecare.com",
      phoneNumber: "4444444555",
      designation: "GP",
      createdAt: "2023-04-14T11:29:06.126Z",
      updatedAt: "2023-04-14T11:29:22.616Z",
      __v: 0,
      address: "test",
      practiceNumber: "11",
      id: "643939024bdff3757980f030"
  },
  {
      location: {
          type: "Point",
          coordinates: [
              0,
              0
          ]
      },
      _id: "643939e94bdff3757980f040",
      name: "dr9",
      email: "dr9@wecare.com",
      phoneNumber: "66666655555",
      designation: "GP",
      createdAt: "2023-04-14T11:32:57.388Z",
      updatedAt: "2023-04-14T11:33:09.004Z",
      __v: 0,
      address: "test",
      practiceNumber: "11",
      id: "643939e94bdff3757980f040"
  },
  {
      location: {
          type: "Point",
          coordinates: [
              0,
              0
          ]
      },
      _id: "64393b174bdff3757980f04c",
      name: "dr10",
      email: "dr10@wecare.com",
      phoneNumber: "5555544444",
      designation: "GP",
      createdAt: "2023-04-14T11:37:59.655Z",
      updatedAt: "2023-04-14T11:38:09.601Z",
      __v: 0,
      address: "tt",
      practiceNumber: "Tt",
      id: "64393b174bdff3757980f04c"
  }
];


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DoctorPage() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [currentDoctor, setCurrentDoctor ] = useState(null)

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setCurrentDoctor(id)
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Doctors | We Care </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Doctors
          </Typography>
        </Stack>

        <Card>
          <DoctorListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <DoctorListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, email, phoneNumber, address, designation, practiceNumber } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src='/assets/man.png'/>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                         <TableCell align="left">{email}</TableCell>

                         <TableCell align="left">{phoneNumber}</TableCell>

                         <TableCell align="left">{address}</TableCell>
                         <TableCell align="left">
                          <Label color={(designation === 'GP' && 'error') || 'success'}>{designation}</Label>
                        </TableCell> 
                         <TableCell align="center">{practiceNumber}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(e)=>{
                              handleOpenMenu(e, id);
                            }}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem  onClick={()=> {
          console.log(currentDoctor);
          navigate('/dashboard/doctor-profile', { replace: true }, {id: "ok"});
        }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          View profile
        </MenuItem>
      </Popover>
    </>
  );
}
