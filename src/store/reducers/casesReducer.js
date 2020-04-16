import * as actionTypes from "../actions/actionTypes";

const initialState = {
  totalCases: [],
  casesByTimeline: [],
  splicedData: [],
  countryList: [],
  worldMapData: [],
  loadingCases: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BY_TIMELINE_START:
       return {
        ...state,
        loadingCases: true
       }

    case actionTypes.FETCH_BY_TIMELINE_SUCCESS:
      const countryList = Object.keys(action.fetchedCasesData);
      const totalDays = action.fetchedCasesData[countryList[0]].length;
      const totalCountries = countryList.length;
      const finalData = [];
      for (let i = 0; i < totalDays; i++) {
        let date = action.fetchedCasesData[countryList[0]][i].date;
        let groupedObj = { date: date };
        let totalCases = 0;
        let totalRecovered = 0;
        let totalDeath = 0;
        for (let j = 0; j < totalCountries; j++) {
          totalCases += action.fetchedCasesData[countryList[j]][i].confirmed;
          totalRecovered +=
            action.fetchedCasesData[countryList[j]][i].recovered;
          totalDeath += action.fetchedCasesData[countryList[j]][i].deaths;
        }
        groupedObj["Total Cases"] = totalCases;
        groupedObj["Recovered"] = totalRecovered;
        groupedObj["Total Deaths"] = totalDeath;
        groupedObj["Active Cases"] = totalCases - (totalRecovered + totalDeath);
        finalData.push(groupedObj);
      }
      let updatedCases = [
        {
          heading: "Total Cases",
          casesCount: finalData.slice(-1)[0]["Total Cases"],
        },
        {
          heading: "Recovered",
          casesCount: finalData.slice(-1)[0]["Recovered"],
        },
        {
          heading: "Active Cases",
          casesCount: finalData.slice(-1)[0]["Active Cases"],
        },
        {
          heading: "Total Deaths",
          casesCount: finalData.slice(-1)[0]["Total Deaths"],
        },
      ];
      return {
        ...state,
        totalCases: updatedCases,
        casesByTimeline: finalData,
        splicedData: finalData.slice(-10),
        loadingCases: false
      };

    case actionTypes.FETCH_BY_COUNTRY_START:
      return{
        ...state,
        loadingCases: true
      }

    case actionTypes.FETCH_BY_COUNTRY_SUCCESS:
      const sortedCountryList = action.fetchedCountryData
        .filter((country) => country.cases > 10)
        .sort((a, b) => b.cases - a.cases);
      let worldMapArray = [];
      action.fetchedCountryData.map((country) => {
        if (country.countryInfo.iso2) {
          // eslint-disable-next-line
          let countryArray = new Array(
            country.countryInfo.iso2.toLowerCase(),
            country.cases
          );
          worldMapArray.push(countryArray);
        }
        return worldMapArray;
      });

      return {
        ...state,
        countryList: sortedCountryList,
        worldMapData: worldMapArray,
        loadingCases: false
      };

    default:
      return state;
  }
};

export default reducer;
