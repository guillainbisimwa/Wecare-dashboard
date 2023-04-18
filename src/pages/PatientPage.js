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
import { PatientListHead, PatientListToolbar } from '../sections/@dashboard/patient';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phoneNumber', label: 'Phone Number', alignRight: false },
  { id: 'age', label: 'Age', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'weight', label: 'Weight', alignRight: false },
  { id: '' },
];

const USERLIST = 
[ {
   _id:"63ee7558638f75180f35d492",
    name:"patient1",
    email:"patient1@wecare.com",
    phoneNumber:"0000000000",
    createdAt:"2023-02-16T18:26:32.727Z",
    updatedAt:"2023-04-11T10:20:56.049Z",
    __v:16,
    age:25,
    height:43,
    gender:"Male",
    weight:37,
    wallet:"6435348742fd34ad1f68ae88",
    id:"63ee7558638f75180f35d492"
},
{
    _id:"642172acb624445f83bdc9dc",
    name:"Krishna Singh",
    email:"krishnasingh200113@gmail.com",
    phoneNumber:"7225965651",
    createdAt:"2023-03-27T10:40:44.789Z",
    updatedAt:"2023-03-27T10:40:44.789Z",
    __v:0,
    age:25,
    height:43,
    gender:"Female",
    weight:37,
    id:"642172acb624445f83bdc9dc"
},
{
    _id:"6421c739fb238443910aa656",
    name:"Krishna Singh",
    email:"krishnasingh2003@gmail.com",
    phoneNumber:"7225965651",
    createdAt:"2023-03-27T16:41:29.100Z",
    updatedAt:"2023-03-27T16:41:29.100Z",
    __v:0,
    age:25,
    height:43,
    gender:"Male",
    weight:37,
    id:"6421c739fb238443910aa656"
},
{
    _id:"64346d28f42df3faf130d9b6",
    name:"test",
    email:"test@wecare.com",
    phoneNumber:"9999999999",
    createdAt:"2023-04-10T20:10:16.824Z",
    updatedAt:"2023-04-10T20:10:16.824Z",
    __v:0,
    age:25,
    height:43,
    gender:"Male",
    weight:37,
    id:"64346d28f42df3faf130d9b6"
},
{
    _id:"64346de1f42df3faf130d9bf",
    name:"test2",
    email:"test4@wecare.com",
    phoneNumber:"9977663355",
    createdAt:"2023-04-10T20:13:21.971Z",
    updatedAt:"2023-04-10T20:13:23.390Z",
    __v:0,
     age:28,
    height:152,
    gender:"Female",
    weight:80,
    id:"64346de1f42df3faf130d9bf"
},
{
    _id:"64352a06292409405615c1d1",
    name:"patient2",
    email:"patient2@wecare.com",
    phoneNumber:"0000000000",
    createdAt:"2023-04-11T09:36:06.795Z",
    updatedAt:"2023-04-11T09:36:06.795Z",
    __v:0,
     age:25,
    height:43,
    gender:"Male",
    weight:37,
    id:"64352a06292409405615c1d1"
}
]


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

export default function PatientPage() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [currentPatient, setCurrentPatient ] = useState(null)

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setCurrentPatient(id)
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
        <title> Patients | We Care </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Patients
          </Typography>
        </Stack>

        <Card>
          <PatientListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <PatientListHead
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
                    const { id, name, email, phoneNumber, age, gender, weight } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} >
                              {name.charAt(0)}
                            </Avatar>
                            
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                         <TableCell align="left">{email}</TableCell>

                         <TableCell align="left">{phoneNumber}</TableCell>

                         <TableCell align="left">{age}</TableCell>
                         <TableCell align="left">
                          <Label color={(gender === 'Male' && 'error') || 'success'}>{(gender === 'Male' && 'M') || 'F'}</Label>
                        </TableCell> 
                         <TableCell align="center">{weight}</TableCell>

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
          console.log(currentPatient);
          navigate('/dashboard/patient-profile', { replace: true }, {id: "ok"});
        }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          View profile
        </MenuItem>
      </Popover>
    </>
  );
}
