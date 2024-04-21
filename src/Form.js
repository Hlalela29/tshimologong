import React, { useState } from 'react';
import './App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';

function Form() {
    const navigate = useNavigate();
      const [surveyData, setSurveyData] = useState({
        age: '',
        contact: '',
        date: dayjs(),
        name: '',
        surname: '',
        pizza: "false",
        pasta: "false",
        other: "false",
      });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSurveyData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleNavigation = () => {
        navigate('/'); 
      };

      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSurveyData((prevState) => ({
          ...prevState,
          [name]: String(checked),
        }));
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('https://genuine-grackle-67.hasura.app/api/rest/wa', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(surveyData),
          });
    
          if (response.ok) {
            console.log('Survey data inserted successfully!');
            handleNavigation()
          } else {
            console.error('Failed to insert survey data');
          }
        } catch (error) {
          console.error('Error inserting survey data:', error);
        }
      };

  return (
    <div>
        <div style={{padding: 30}}>
        <h1 style={{paddingBottom: 20}}>Survey</h1>
        <Card sx={{ maxWidth: 500 }}>
      <CardContent>
      <Stack spacing={2}>
      <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={surveyData.name} onChange={handleInputChange}/>
      <TextField id="outlined-basic" label="Surname" variant="outlined" name="surname" value={surveyData.surname} onChange={handleInputChange}/>
      <TextField id="outlined-basic" label="Contact Number" variant="outlined"  name="contact" value={surveyData.contact} onChange={handleInputChange}/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
          label="Date"
          name="date" value={surveyData.date}  onChange={(newValue) =>  setSurveyData((prevState) => ({
            ...prevState,
            date: newValue.format('DD/MM/YYYY'),
          }))}
        />
    </LocalizationProvider>
      <TextField id="outlined-basic" label="Age" variant="outlined" name="age" value={surveyData.age} onChange={handleInputChange}/>
      <h5>Select the foods you like</h5>
      <FormGroup>
      <FormControlLabel control={<Checkbox  onChange={handleCheckboxChange} name="pizza" value={Boolean(surveyData.pizza)}/>} label="Pizza" />
      <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} name="pasta" value={Boolean(surveyData.pasta)}/>} label="Pasta" />
      <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} name="other" value={Boolean(surveyData.other)}/>} label="Other" />
    </FormGroup>
      </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSubmit}>Submit</Button>
      </CardActions>
    </Card>
        </div>
    </div>
  );
}

export default Form;
