import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function Result() {
  const calculateAverageAge = (surveys) => {
    if (!surveys || surveys.length === 0) {
      return 0;
    }

    const totalAge = surveys.reduce((accumulator, survey) => {
      return accumulator + parseInt(survey.age, 10);
    }, 0);

    const averageAge = totalAge / surveys.length;
    return averageAge;
  };

  const calculateMaxAge = (surveys) => {
    if (!surveys || surveys.length === 0) {
      return 0;
    }

    const ages = surveys.map((survey) => parseInt(survey.age, 10));
    const maxAge = Math.max(...ages);
    return maxAge;
  };

  const calculateMinAge = (surveys) => {
    if (!surveys || surveys.length === 0) {
      return 0;
    }

    const ages = surveys.map((survey) => parseInt(survey.age, 10));
    const minAge = Math.min(...ages);
    return minAge;
  };

  const calculatePastaPercentage = (surveys) => {
    if (!surveys || surveys.length === 0) {
      return 0;
    }

    const truePizzaCount = surveys.filter(
      (survey) => survey.pasta === "true"
    ).length;
    const totalSurveys = surveys.length;
    const pizzaPercentage = (truePizzaCount / totalSurveys) * 100;
    return pizzaPercentage.toFixed(2);
  };

  const calculateOtherPercentage = (surveys) => {
    if (!surveys || surveys.length === 0) {
      return 0;
    }

    const truePizzaCount = surveys.filter(
      (survey) => survey.other === "true"
    ).length;
    const totalSurveys = surveys.length;
    const pizzaPercentage = (truePizzaCount / totalSurveys) * 100;
    return pizzaPercentage.toFixed(2);
  };

  const calculatePizzaPercentage = (surveys) => {
    if (!surveys || surveys.length === 0) {
      return 0;
    }

    const truePizzaCount = surveys.filter(
      (survey) => survey.pizza === "true"
    ).length;
    const totalSurveys = surveys.length;
    const pizzaPercentage = (truePizzaCount / totalSurveys) * 100;
    return pizzaPercentage.toFixed(2); // Round to 2 decimal places
  };

  const [surveyData, setSurveyData] = useState({
    averageAge: "",
    minAge: "",
    maxAge: "",
    pizzaLovers: "",
    pastaLovers: "",
    otherLovers: "",
    totalSurveys: 0,
  });

  const onLoad = async () => {
    try {
      const response = await fetch(
        "https://genuine-grackle-67.hasura.app/api/rest/survey",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const res = await response.json();
        const data = res.Surveys;
        setSurveyData({
          minAge: String(calculateMinAge(data)),
          maxAge: String(calculateMaxAge(data)),
          averageAge: String(calculateAverageAge(data)),
          pizzaLovers: String(calculatePizzaPercentage(data)),
          pastaLovers: String(calculatePastaPercentage(data)),
          otherLovers: String(calculateOtherPercentage(data)),
          totalSurveys: String(data.length),
        });
        console.log("Survey data inserted successfully!");
      } else {
        console.error("Failed to insert survey data");
      }
    } catch (error) {
      console.error("Error inserting survey data:", error);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div>
      <div style={{ padding: 30 }}>
        <h1 style={{ paddingBottom: 20 }}>Results</h1>
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Stack spacing={2}>
              <h6>Total Surveys : {surveyData.totalSurveys}</h6>
              <h6>Max Age : {surveyData.maxAge}</h6>
              <h6>Min Age : {surveyData.minAge}</h6>
              <h6>Age Average : {surveyData.averageAge}</h6>

              <h6>pizza lovers : {surveyData.pizzaLovers}%</h6>
              <h6>pasta : {surveyData.pastaLovers}%</h6>
              <h6>other : {surveyData.otherLovers}%</h6>
            </Stack>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </div>
    </div>
  );
}

export default Result;
